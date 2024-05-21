import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../ContextProvider/ContextProvider";

export default function SearchBar() {
    const { setSearchString } = useContext(SearchContext);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (searchText.length > 2) {
            setSearchString(searchText);
        } else if (searchText.length <= 2) {
            setSearchString("");
        }
    }, [searchText, setSearchString]);

    return (
        <input
            type="search"
            className="form-control me-2 rounded"
            placeholder="Search"
            value={searchText}
            onChange={({ target }) => setSearchText(target.value)}
        />
    );
}
