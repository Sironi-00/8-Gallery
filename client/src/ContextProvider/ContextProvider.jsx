import { createContext, useState } from "react";
import useLocalStorage from "use-local-storage";

export const AppContext = createContext({
    name: null,
    id: null,
    email: null
});
export const SearchContext = createContext("");

export default function ContextProvider({ children }) {
    const [localUser, setLocalUser] = useLocalStorage("user", {});

    const [currentUser, setCurrentUser] = useState(localUser);
    const [searchString, setSearchString] = useState("");


    const updateCurrentUser = (user = null) => {
        if (!user) {
            setLocalUser(null);
            setCurrentUser(null);
            return
        }
        setCurrentUser(user);
        setLocalUser(user);
    }

    return (
        <>
            <SearchContext.Provider value={{ searchString, setSearchString }}>
                <AppContext.Provider
                    value={{
                        currentUser,
                        updateCurrentUser,
                    }}
                >
                    {children}
                </AppContext.Provider>
            </SearchContext.Provider>
        </>
    );
}
