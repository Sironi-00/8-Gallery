import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../ContextProvider/ContextProvider";

export default function SearchBar() {
    const { updateSearchString } = useContext(SearchContext);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        updateSearchString(searchText);
    }, [searchText, updateSearchString]);

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
