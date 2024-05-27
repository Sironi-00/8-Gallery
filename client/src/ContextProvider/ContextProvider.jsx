import { createContext, useState } from "react";
import useLocalStorage from "use-local-storage";

export const AppContext = createContext({
    name: null,
    id: null,
    email: null,
});
export const SearchContext = createContext("");
export const ThemeContext = createContext("dark");

export default function ContextProvider({ children }) {
    const [localUser, setLocalUser] = useLocalStorage("user", {});
    const [theme, setTheme] = useLocalStorage("theme", "dark");
    const toggleTheme = () => {
        setTheme((prev) => (prev == "dark" ? "light" : "dark"));
    };

    const [currentUser, setCurrentUser] = useState(localUser);
    const updateCurrentUser = (user = null) => {
        if (!user) {
            setLocalUser(null);
            setCurrentUser(null);
            return;
        }
        setCurrentUser(user);
        setLocalUser(user);
    };
    const [searchString, setSearchString] = useState("");
    const updateSearchString = (txt) => {
        if (txt.length > 2 && (txt.trim())) {
            setSearchString(txt);
        } else {
            setSearchString("");
        }
    }

    return (
        <>
            <AppContext.Provider
                value={{
                    currentUser,
                    updateCurrentUser,
                }}
            >
                <ThemeContext.Provider value={{ theme, toggleTheme }}>
                    <SearchContext.Provider value={{ searchString, updateSearchString }}>
                        {children}
                    </SearchContext.Provider>
                </ThemeContext.Provider>
            </AppContext.Provider>
        </>
    );
}
