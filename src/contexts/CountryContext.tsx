import React, { createContext, useContext, useEffect, useState } from "react";
import { Country, CountryContextValue, TVotingForm } from "../types";
import { MOCK_COUNTRIES } from "../api/mocks";
import { getRegionWeather } from "../api/getRegionWeather";

const CountryContext = createContext<CountryContextValue | undefined>(
    undefined
);

interface CountryContextProviderProps {
    children: React.ReactNode;
}

export const CountryContextProvider: React.FC<CountryContextProviderProps> = ({
    children,
}: CountryContextProviderProps) => {
    const [allCountriesWithWeather, setAllCountriesWithWeather] = useState<
        null | Country[]
    >(null);
    const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
    const mock_countries = MOCK_COUNTRIES;
    const filteredOnlyCountries = MOCK_COUNTRIES.map((country) => country.name);

    useEffect(() => {
        if (MOCK_COUNTRIES) {
            const fetchData = async () => {
                const countryWeatherPromises = MOCK_COUNTRIES.map(
                    async (country) => {
                        const weather = await getRegionWeather({
                            region: country.name,
                        });
                        return { ...country, weather };
                    }
                );

                const countriesWithWeather = await Promise.all(
                    countryWeatherPromises
                );

                const sortedCountriesByFavourite = countriesWithWeather.sort(
                    (country1, country2) => country2.votes - country1.votes
                );

                setAllCountriesWithWeather(sortedCountriesByFavourite);
            };

            fetchData();
        }
    }, []);

    const submitVotingForm = (form: TVotingForm) => {
        if (allCountriesWithWeather) {
            console.log(allCountriesWithWeather);
            const newCountriesUpdated = allCountriesWithWeather.map(
                (country) => {
                    if (country.name === form.country) {
                        return {
                            ...country,
                            votes: country.votes + 1,
                        };
                    }

                    return country;
                }
            );

            setAllCountriesWithWeather(newCountriesUpdated);
            setVoteSubmitted(true);
        }
    };

    return (
        <CountryContext.Provider
            value={{
                mock_countries,
                filteredOnlyCountries,
                allCountriesWithWeather,
                submitVotingForm,
                voteSubmitted,
            }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountryContext = () => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error(
            "useCountryContext must be used within a CountryContextProvider"
        );
    }
    return context;
};
