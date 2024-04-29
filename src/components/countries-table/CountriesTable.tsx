import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Country } from "../../types";
import { useCountryContext } from "../../contexts/CountryContext";

const TABLE_HEADERS = [
    "Country",
    "Capital City",
    "Region",
    "Sub Region",
    "Weather",
    "Votes",
];

export const CountriesTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageCountries, setCurrentPageCountries] = useState<
        null | Country[]
    >(null);
    const { allCountriesByFilter } = useCountryContext();
    const itemsPerPage: number = 10;
    const lastPage: number = allCountriesByFilter
        ? Math.ceil(allCountriesByFilter.length / itemsPerPage)
        : 1;

    useEffect(() => {
        if (allCountriesByFilter) {
            const indexOfLastCountryDisplaying = currentPage * itemsPerPage;

            const indexOfFirstCountryDisplaying =
                indexOfLastCountryDisplaying - itemsPerPage;

            const countriesToDisplay = allCountriesByFilter.slice(
                indexOfFirstCountryDisplaying,
                indexOfLastCountryDisplaying
            );

            setCurrentPageCountries(countriesToDisplay);
        }
    }, [currentPage, allCountriesByFilter]);

    return (
        <div className="flex flex-col p-4 bg-primary-white drop-shadow-sm rounded-2xl min-h-[480px]">
            <table className="text-left w-full h-full">
                <thead className="text-sm font-workSans">
                    <tr>
                        {TABLE_HEADERS.map((header) => (
                            <th key={header} className="pb-4">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="font-medium leading-5">
                    {currentPageCountries?.map((country) => (
                        <tr key={country.name}>
                            <td className="pb-4">{country.name}</td>
                            <td className="pb-4">{country.capital_city}</td>
                            <td className="pb-4">{country.region}</td>
                            <td className="pb-4">{country.sub_region}</td>
                            <td className="pb-4">{country?.weather}</td>
                            <td className="pb-4">{country.votes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="border-b-2 border-[#F4FAFF] mt-2 w-9/12 m-auto" />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                lastPage={lastPage}
            />
        </div>
    );
};
