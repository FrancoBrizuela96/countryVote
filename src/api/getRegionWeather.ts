interface Props {
    region: string;
}

export const getRegionWeather = async ({ region }: Props) => {
    try {
        const res = await fetch(`https://en.wttr.in/${region}?format=%C %t`);
        const data = await res.text();

        const responseWithoutPlusIcon = data.replace("+", "");

        return responseWithoutPlusIcon;
    } catch (error) {
        console.log(error);
    }
};
