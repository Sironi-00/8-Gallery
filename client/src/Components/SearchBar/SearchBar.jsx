import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../ContextProvider/ContextProvider";
import BackspaceIcon from "@mui/icons-material/Backspace";

export default function SearchBar() {
    const { updateSearchString } = useContext(SearchContext);
    const [searchText, setSearchText] = useState("");

    const handleSearchClear = (e) => {
        e.preventDefault();
        setSearchText("");
    };

    useEffect(() => {
        updateSearchString(searchText);
    }, [searchText, updateSearchString]);

    return (
        <div className="input-group">
            <input
                type="search"
                className="form-control"
                placeholder="Search"
                value={searchText}
                onChange={({ target }) => setSearchText(target.value)}
            />
            <span className="input-group-text p-0">
                <button type="" className="btn m-0 " onClick={handleSearchClear}>
                    <BackspaceIcon />
                </button>
            </span>
        </div>
    );
}
