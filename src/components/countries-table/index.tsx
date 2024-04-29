import React from "react";
import { CountriesTable } from "./CountriesTable";
import { CustomInput } from "../common/CustomInput";
import { useCountryContext } from "../../contexts/CountryContext";
import searchIcon from "../../assets/search.svg";

export const CountriesTableContainer = () => {
    const { searchText, setSearchText, allCountriesByFilter } =
        useCountryContext();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setSearchText(event.target.value);
    };

    return (
        <div className="mt-10 flex flex-col gap-6">
            <h2 className="text-3xl font-bold leading-6">Countries table</h2>
            <CustomInput
                icon={
                    <img src={searchIcon} alt="search icon" className="pl-4" />
                }
                type="text"
                placeholder="Search Country, Capital City, Region or Subregion"
                onChange={handleInputChange}
                value={searchText}
                className="max-w-96 text-sm"
            />
            {allCountriesByFilter && <CountriesTable />}
        </div>
    );
};
