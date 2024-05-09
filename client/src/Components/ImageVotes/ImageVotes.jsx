import { useContext, useEffect, useState } from "react";

import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import { AppContext } from "../../ContextProvider/ContextProvider";
import { getImageUpvotes, upvoteImage } from "../../Api/Api";

export default function ImageVotes({id}) {
    const { currentUser } = useContext(AppContext);

    const [votesCount, setVotesCount] = useState({likes: 0, liked: false});

    const handleUpvote = async () => {
        const res = await upvoteImage ({ id, userId: currentUser?.id });
        if (res) {
            setVotesCount(res);
        } else {
            console.log("Error: could not vote image");
        }
    };

    useEffect(() => {
        if (!id || !currentUser?.id) return;

        (async () => {
            let res = await getImageUpvotes({id, userId: currentUser?.id});
            if (res) {
                setVotesCount(res);
            } else {
                console.log("Failed to get votes")
            }
        })()
    }, [id, votesCount.id, currentUser?.id,])

    return (
        <div>
            {currentUser?.id ? (
                <>
                    <button className={`btn btn-${votesCount.liked?"success": "primary"}`} onClick={handleUpvote}>
                        <ThumbUpAltRoundedIcon /> {votesCount.likes}
                    </button>
                </>
            ) : (
                <>
                    <div className="">
                        <ThumbUpAltRoundedIcon /> {votesCount.likes}
                    </div>
                </>
            )}
        </div>
    );
}
