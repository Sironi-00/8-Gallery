import { useEffect, useState } from "react";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { fetchArtists } from "../../Api/Api";
import ArtistItem from "../../Components/ArtistItem/ArtistItem";

export default function Artists() {
    const [artistState, setArtistState] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await fetchArtists();
            setArtistState(data);
        })();
        return setArtistState([]);
    }, []);

    return (
        <div>
            <ViewOptions location="Artists" />
            <div className="container-fluid list-group-flush">
                {artistState.map((item) => (
                    <ArtistItem key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}
