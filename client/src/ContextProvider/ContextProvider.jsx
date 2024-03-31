import { createContext, useState } from "react";

export const AppContext = createContext({
    name: null,
    id: null,
});
export const SearchContext = createContext("");

export default function ContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [searchString, setSearchString] = useState("");
    return (
        <>
            <SearchContext.Provider value={{ searchString, setSearchString }}>
                <AppContext.Provider
                    value={{
                        currentUser,
                        setCurrentUser,
                    }}
                >
                    {children}
                </AppContext.Provider>
            </SearchContext.Provider>
        </>
    );
}
