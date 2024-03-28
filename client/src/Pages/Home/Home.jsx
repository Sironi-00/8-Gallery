import "./Home.css";
import { useEffect, useState } from "react";
import { fetchData, fetchDataByAuthor } from "../../Api/Api";
import ImageItem from "../../Components/ImageItem/ImageItem";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { useParams } from "react-router-dom";

export default function Home() {
    const [itemsState, setItemsState] = useState([]);

    const { author } = useParams();

    useEffect(() => {
        const loadData = async () => {
            let data;

            if (author) {
                data = await fetchDataByAuthor(author);
            } else {
                data = await fetchData();
            }
            setItemsState(data);
        };
        loadData();

        return setItemsState([]);
    }, [author]);

    const deleteItem = (id) => {
        setItemsState(prev => prev.filter(item => item.id !== id))
    }

    return (
        <div className="home-page">
            <ViewOptions location="Home" />
            <div className="images">
                {itemsState.map((item) => (
                    <ImageItem key={item.id} data={item} deleteItem={deleteItem} />
                ))}
            </div>
        </div>
    );
}
