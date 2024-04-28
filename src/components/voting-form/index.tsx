import React, { useMemo, useState } from "react";
import { useCountryContext } from "../../contexts/CountryContext";
import { CustomInput } from "../common/CustomInput";
import { TVotingForm } from "../../types";

export const VotingForm = () => {
    const [formState, setFormState] = useState<TVotingForm>({
        name: "",
        email: "",
        country: "",
    });
    const { filteredOnlyCountries, submitVotingForm, voteSubmitted } =
        useCountryContext();

    const isValidEmail = useMemo(() => {
        if (!formState.email) return true;

        const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegExp.test(formState.email);
    }, [formState.email]);

    const isButtonDisabled =
        !formState.name ||
        !formState.email ||
        !formState.country ||
        voteSubmitted;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleCountryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormState({
            ...formState,
            country: event.target.value,
        });
    };

    const handleSubmit = (form: React.FormEvent<HTMLFormElement>) => {
        form.preventDefault();

        if (!formState.name || !formState.email || !formState.country) return;

        submitVotingForm(formState);
    };

    return (
        <div className="mt-10 p-4 rounded-2xl bg-primary-white">
            {voteSubmitted ? (
                <div className="flex gap-4 items-center">
                    <img src="src\assets\success-icon.svg" alt="success icon" />
                    <span className="font-bold text-base leading-4 text-primary-dark">
                        Your vote was succesfully submitted
                    </span>
                </div>
            ) : (
                <div>
                    <h1 className="font-bold text-sm leading-4 text-primary-dark">
                        Vote your Favourite Country
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-4 mb-6 flex gap-3">
                        <CustomInput
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleInputChange}
                            value={formState.name}
                        />
                        <CustomInput
                            onChange={handleInputChange}
                            value={formState.email}
                            type="email"
                            name="email"
                            placeholder="Email"
                            error={!isValidEmail}
                        />
                        <select
                            onChange={handleCountryChange}
                            value={formState.country}
                            style={{
                                color: !formState.country ? "#8A8C90" : "black",
                                fontWeight: !formState.country ? "600" : "400",
                            }}
                            className="py-2 px-4 w-full rounded-[10px] text-sm bg-secondary-grey border border-[#EFEFEF] text-gray-400">
                            <option disabled hidden value="">
                                Country
                            </option>
                            {filteredOnlyCountries &&
                                filteredOnlyCountries.map((country) => (
                                    <option
                                        key={country}
                                        value={country}
                                        className="font-normal text-black">
                                        {country}
                                    </option>
                                ))}
                        </select>
                        <button
                            disabled={isButtonDisabled}
                            className="rounded-lg py-2 px-4 w-full font-bold text-sm max-w-32 leading-5 text-primary-white bg-primary-dark disabled:text-[#8A8C90] disabled:bg-[#EDEDED] active:scale-95 disabled:active:scale-100"
                            type="submit">
                            Submit Vote
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
