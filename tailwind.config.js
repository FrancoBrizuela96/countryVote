/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-white": "#FFFFFF",
                "primary-dark": "#15172A",
                "secondary-grey": "#FDFDFD",
            },
            fontFamily: {
                inter: ["Inter"],
                workSans: ["Work Sans"],
            },
        },
    },
    plugins: [],
};
