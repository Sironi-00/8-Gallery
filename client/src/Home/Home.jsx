import { useEffect, useState } from "react";
import { fetchData } from "../Api/Api";
import ImageItem from "../ImageItem/ImageItem";

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
            <h2>Home {itemsState.length}</h2>
            <div className="images">
                {
                    itemsState.map((item) => <ImageItem key={item.id} data={item} />)
                }
            </div>
        </div>
    );
}
