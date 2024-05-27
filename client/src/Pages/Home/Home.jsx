import { useContext, useEffect, useState } from "react";
import { fetchImages, fetchImagesByArtist, fetchSearchImages } from "../../Api/Api";
import ImageItem from "../../Components/ImageItem/ImageItem";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../ContextProvider/ContextProvider";

export default function Home() {
    const [itemsState, setItemsState] = useState([]);

    const { searchString } = useContext(SearchContext);

    const { artist } = useParams();

    useEffect(() => {
        (async () => {
            let data;

            if (searchString && searchString.length > 2) {
                data = await fetchSearchImages(searchString);
            } else if (artist) {
                data = await fetchImagesByArtist(artist);
            } else {
                data = await fetchImages();
            }
            setItemsState(data || []);
        })();

        return setItemsState([]);
    }, [artist, searchString]);

    const deleteItem = (id) => {
        setItemsState((prev) => prev.filter((item) => item.id !== id));
    };

    const upvoteItem = ({ id, likes, action }) => {
        setItemsState((prev) => prev.map((item) => (item.id === id ? { ...item, likes, action } : item)));
    };

    return (
        <div className="h-100 overflow-auto">
            <ViewOptions location="Home" />
            <div className="d-flex flex-wrap gap-2 justify-content-evenly py-2">
                {itemsState.map((item) => (
                    <ImageItem key={item.id} data={item} deleteItem={deleteItem} upvoteItem={upvoteItem} />
                ))}
                {itemsState.length < 1 && <p>No Content</p>}
            </div>
        </div>
    );
}
