import { useContext, useEffect, useState } from "react";
import "./SearchBar.css";
import { SearchContext } from "../../ContextProvider/ContextProvider";

export default function SearchBar() {
    const { setSearchString } = useContext(SearchContext);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (searchText.length > 2) {
            setSearchString(searchText);
        } else if (searchText.length <= 2) {
            setSearchString("")
        }
    }, [searchText, setSearchString])

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" value={searchText} onChange={({target}) => setSearchText(target.value)} />
        </div>
    );
}
