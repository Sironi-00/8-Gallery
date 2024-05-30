import { useContext, useEffect, useState } from "react";
import { fetchImages, fetchImagesByArtist, fetchSearchImages } from "../../Api/Api";
import ImageItem from "../../Components/ImageItem/ImageItem";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { useParams } from "react-router-dom";
import { ImagesContext, SearchContext } from "../../ContextProvider/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
    const { imagesArray, setImagesArray } = useContext(ImagesContext);
    const { searchString } = useContext(SearchContext);

    const [loadingState, setLoadingState] = useState(false);

    const { artist } = useParams();

    useEffect(() => {
        (async () => {
            setLoadingState(true);
            let data;

            if (searchString && searchString.length > 2) {
                data = await fetchSearchImages(searchString);
            } else if (artist) {
                data = await fetchImagesByArtist(artist);
            } else {
                data = await fetchImages();
            }
            setImagesArray(data || []);
            setLoadingState(false);
        })();

        return setImagesArray([]);
    }, [artist, searchString]);

    return (
        <div className="h-100 overflow-auto">
            <ViewOptions location="Home" />
            <div className="d-flex flex-wrap gap-2 justify-content-evenly py-2 px-1">
                {imagesArray.map((item) => (
                    <ImageItem key={item.id} data={item} />
                ))}

                {imagesArray.length < 1 && !loadingState && (
                    <p>
                        No Content found{" "}
                        {searchString.length > 2 && (
                            <span className="fst-italic fw-bold">: Try a different search term</span>
                        )}
                    </p>
                )}
                {loadingState && (
                    <>
                        <CircularProgress />
                    </>
                )}
            </div>
        </div>
    );
}
