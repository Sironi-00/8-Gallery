import "./Home.css";
import { useEffect, useState } from "react";
import { fetchData, fetchDataByAuthor } from "../Api/Api";
import ImageItem from "../ImageItem/ImageItem";
import ViewOptions from "../ViewOptions/ViewOptions";
import { useParams } from "react-router-dom";

export default function Home() {
    const [itemsState, setItemsState] = useState([]);

    const { author } = useParams();

    useEffect(() => {
        const loadData = async () => {
            let data;

            if (author) {
                console.log(author)
                data = await fetchDataByAuthor(author);
            } else {
                data = await fetchData();
            }
            setItemsState(data);
        };
        loadData();

        return setItemsState([]);
    }, [author]);

    return (
        <div className="home-page">
            <ViewOptions location="Home" />
            <div className="images">
                {itemsState.map((item) => (
                    <ImageItem key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}
