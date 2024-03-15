import "./Home.css";
import { useEffect, useState } from "react";
import { fetchData } from "../Api/Api";
import ImageItem from "../ImageItem/ImageItem";
import ViewOptions from "../ViewOptions/ViewOptions";

export default function Home() {
    const [itemsState, setItemsState] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchData();
            setItemsState(data);
        };
        loadData();
    }, [itemsState.length]);

    return (
        <div className="home-page">
            <ViewOptions location="Home" />
            <div className="images">
                {
                    itemsState.map((item) => <ImageItem key={item.id} data={item} />)
                }
            </div>
        </div>
    );
}
