import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: React.HTMLInputTypeAttribute | undefined;
    placeholder: string;
    name?: string;
    className?: string;
    error?: boolean;
    icon?: JSX.Element;
}

export const CustomInput = ({
    onChange,
    value,
    type,
    name,
    className,
    placeholder,
    error,
    icon,
}: Props) => {
    return (
        <div className="flex flex-col w-full relative">
            <div
                className={twMerge(
                    "flex w-full rounded-[10px] text-sm border bg-secondary-grey border-[#EFEFEF]",
                    className,
                    error && "border-[#FF5245]"
                )}>
                {icon && icon}
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                    className="w-full py-2 px-2 bg-transparent rounded-[10px] outline-none placeholder:font-medium placeholder:text-[#8A8C90]"
                />
                {error && (
                    <img
                        src="src\assets\error-icon.svg"
                        alt="error icon"
                        className="p-1 pr-2"
                    />
                )}
            </div>
            {error && (
                <span className="absolute top-11 font-bold text-sm text-[#FF5245]">
                    Invalid email
                </span>
            )}
        </div>
    );
};
