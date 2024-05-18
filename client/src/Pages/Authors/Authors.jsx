import { useEffect, useState } from "react";
import ViewOptions from "../../Components/ViewOptions/ViewOptions";
import { fetchAuthors } from "../../Api/Api";
import AuthorItem from "../../Components/AuthorItem/AuthorItem";

export default function Authors() {
    const [authorState, setAuthorState] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchAuthors();
            setAuthorState(data);
        };
        loadData();
    }, []);

    return (
        <div>
            <ViewOptions location="Authors" />
            <div className="container-fluid list-group-flush">
                {authorState.map((item) => (
                    <AuthorItem key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}
