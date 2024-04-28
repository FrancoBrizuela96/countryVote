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
    mock_countries: Country[];
    filteredOnlyCountries: string[];
    allCountriesWithWeather: Country[] | null;
    submitVotingForm: (form: TVotingForm) => void;
    voteSubmitted: boolean;
}
