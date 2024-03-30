import { createContext, useState } from "react";

export const AppContext = createContext({
        name: null,
        id: null
    }
);

export default function ContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    return <>
    <AppContext.Provider value={{
        currentUser, setCurrentUser
    }}>
        {
            children
        }
    </AppContext.Provider>
    </>
}
