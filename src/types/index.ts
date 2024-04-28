export interface Country {
    name: string;
    official_name: string;
    capital_city: string;
    region: string;
    sub_region: string;
    votes: number;
    weather?: string;
}

export interface TVotingForm {
    name: string;
    email: string;
    country: string;
}

export interface CountryContextValue {
    filteredOnlyCountries: string[];
    submitVotingForm: (form: TVotingForm) => void;
    voteSubmitted: boolean;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    searchText: string;
    allCountriesByFilter: Country[] | null;
}
