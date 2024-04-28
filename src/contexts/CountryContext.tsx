import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
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
    const [allCountriesByFilter, setAllCountriesByFilter] = useState<
        null | Country[]
    >(null);
    const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const filteredOnlyCountries = MOCK_COUNTRIES.map((country) => country.name);

    const fetchWeatherData = useCallback(async () => {
        if (MOCK_COUNTRIES) {
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
        }
    }, []);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    useEffect(() => {
        if (allCountriesWithWeather) {
            const finalCountries = allCountriesWithWeather.filter((country) => {
                const searchFields = [
                    country.name,
                    country.capital_city,
                    country.region,
                    country.sub_region,
                ];

                return searchFields.some((field) =>
                    field.toLowerCase().includes(searchText.toLowerCase())
                );
            });

            setAllCountriesByFilter(finalCountries);
        }
    }, [searchText, allCountriesWithWeather]);

    const submitVotingForm = (form: TVotingForm) => {
        if (allCountriesWithWeather) {
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
                filteredOnlyCountries,
                submitVotingForm,
                voteSubmitted,
                searchText,
                setSearchText,
                allCountriesByFilter,
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
