import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { fetchImages, fetchImagesByAuthor, fetchSearch } from "../../Api/Api";
import ImageItem from "../../Components/ImageItem/ImageItem";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../ContextProvider/ContextProvider";

export default function Home() {
    const [itemsState, setItemsState] = useState([]);

    const { searchString, } = useContext(SearchContext);

    const { author } = useParams();

    useEffect(() => {
        const loadData = async () => {
            let data;

            if (searchString && searchString.length > 2) {
                data = await fetchSearch(searchString);
            } else if (author) {
                data = await fetchImagesByAuthor(author);
            } else {
                data = await fetchImages();
            }
            setItemsState(data);
        };
        loadData();

        return setItemsState([]);
    }, [author, searchString]);

    const deleteItem = (id) => {
        setItemsState(prev => prev.filter(item => item.id !== id))
    }

    const upvoteItem = ({id, likes, action}) => {
        setItemsState(prev => prev.map(item => (item.id === id) ? { ...item, likes, action }: item))
    }

    return (
        <div className="home-page">
            <ViewOptions location="Home" />
            <div className="images">
                {itemsState.map((item) => (
                    <ImageItem key={item.id} data={item} deleteItem={deleteItem} upvoteItem={upvoteItem} />
                ))}
                {
                    itemsState.length < 1 && <p>No Content</p>
                }
            </div>
        </div>
    );
}
