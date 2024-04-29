import React from "react";
import arrowRight from "../../assets/right-arrow.svg";
import arrowLeft from "../../assets/left-arrow.svg";

interface Props {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    lastPage: number;
}

export const Pagination = ({
    currentPage,
    setCurrentPage,
    lastPage,
}: Props) => {
    const handlePageChange = (num: number) => {
        const newPage = currentPage + num;

        if (newPage < 1 || newPage > lastPage) return;

        setCurrentPage(newPage);
    };

    return (
        <div className="flex justify-between pr-6 text-sm mt-auto h-full">
            <span className="font-light text-[#393A42]">
                {currentPage} items from {lastPage}
            </span>
            <div className="flex gap-6">
                <button
                    onClick={() => handlePageChange(-1)}
                    className="select-none">
                    <img src={arrowLeft} alt="arrow left" />
                </button>
                <span className="font-semibold text-[#8A8C90] cursor-default select-none">
                    {currentPage}
                </span>
                <button
                    onClick={() => handlePageChange(1)}
                    className="select-none">
                    <img src={arrowRight} alt="arrow right" />
                </button>
            </div>
        </div>
    );
};
