import { Navbar } from "./components/Navbar";
import { VotingForm } from "./components/voting-form";
import { CountriesTableContainer } from "./components/countries-table";
import { CountryContextProvider } from "./contexts/CountryContext";

function App() {
    return (
        <CountryContextProvider>
            <div className="bg-[#F8F8F8] h-screen font-inter">
                <Navbar />
                <div className="px-10 2xl:px-48">
                    <VotingForm />
                    <CountriesTableContainer />
                </div>
            </div>
        </CountryContextProvider>
    );
}

export default App;
