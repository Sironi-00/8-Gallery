import { useContext, useEffect, useState } from "react";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { fetchArtists, fetchSearchArtists } from "../../Api/Api";
import ArtistItem from "../../Components/ArtistItem/ArtistItem";
import { SearchContext } from "../../ContextProvider/ContextProvider";

import CircularProgress from "@mui/material/CircularProgress";

export default function Artists() {
    const [artistState, setArtistState] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    const { searchString } = useContext(SearchContext);

    useEffect(() => {
        (async () => {
            setLoadingState(true);
            let data;

            if (searchString && searchString.length > 2) {
                data = await fetchSearchArtists(searchString);
            } else {
                data = await fetchArtists();
            }
            setArtistState(data || []);
            setLoadingState(false);
        })();
        return setArtistState([]);
    }, [searchString]);

    return (
        <div>
            <ViewOptions location="Artists" />
            <div className="container-fluid text-center">
                {artistState.map((item) => (
                    <ArtistItem key={item.id} data={item} />
                ))}
                {artistState.length < 1 && !loadingState && (
                    <p>
                        No Content found{" "}
                        {searchString.length > 2 && (
                            <span className="fst-italic fw-bold">: Try a different search term</span>
                        )}
                    </p>
                )}
                {loadingState && <CircularProgress className="m-5" />}
            </div>
        </div>
    );
}
