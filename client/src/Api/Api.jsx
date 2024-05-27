let BASE_URL = "";
if (import.meta.env.MODE !== "production") {
    // API server url
    BASE_URL = "http://localhost:3000";
}

const IMAGE_SERVER = "https://image-server.fanisndou.co.uk";
// const IMAGE_SERVER = "http://localhost:3001";

export const fetchImages = async () => {
    const res = await fetch(`${BASE_URL}/api/images`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const fetchSearchImages = async (searchString) => {
    const res = await fetch(`${BASE_URL}/api/images/search/?q=${searchString}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const fetchImagesByArtist = async (artist) => {
    const res = await fetch(`${BASE_URL}/api/images/by/${artist}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const fetchImageById = async (id) => {
    const res = await fetch(`${BASE_URL}/api/images/id/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const fetchArtists = async () => {
    const res = await fetch(`${BASE_URL}/api/user`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const fetchSearchArtists = async (searchString) => {
    const res = await fetch(`${BASE_URL}/api/user/search/?q=${searchString}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const saveImage = async (imageObject) => {
    const formData = new FormData();
    formData.append("artistId", imageObject.artistId);
    formData.append("file", imageObject.file);

    const res = await fetch(`${IMAGE_SERVER}/main.php`, {
        method: "POST",
        headers: {
            // 'content-type': 'multipart/form-data'
        },
        body: formData,
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const uploadImage = async (imageObject) => {
    // first upload to server then create DB entry
    const saveImaged = await saveImage(imageObject);

    if (!saveImaged) return false;
    if (saveImaged.status.code !== "201") {
        return saveImage.data;
    }

    const res = await fetch(`${BASE_URL}/api/images`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ ...imageObject, url: saveImaged.data }),
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const updateImage = async (imageObject) => {
    const res = await fetch(`${BASE_URL}/api/images/${imageObject.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(imageObject),
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const deleteImage = async ({ id, artistId }) => {
    const res = await fetch(`${BASE_URL}/api/images/${id}?artistId=${artistId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return false;
};

export const userLogin = async (user) => {
    const res = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const userRegister = async (user) => {
    const res = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    } else {
        let data = await res.json();
        return data
    }
};

export const userDelete = async (id) => {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return true;
    }
    return false;
};

export const userUpdate = async (user) => {
    const res = await fetch(`${BASE_URL}/api/user/${user.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const userEmail = async (emailObject) => {
    const res = await fetch(`${BASE_URL}/api/user/email`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(emailObject),
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const userName = async (artistId) => {
    const res = await fetch(`${BASE_URL}/api/user/name/${artistId}`, {
        method: "GET",
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
};

export const getImageUpvotes = async ({ id, userId }) => {
    const res = await fetch(`${BASE_URL}/api/images/vote/${id}?userId=${userId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return false;
};

export const upvoteImage = async ({ id, userId }) => {
    const res = await fetch(`${BASE_URL}/api/images/vote/${id}?userId=${userId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return false;
};
