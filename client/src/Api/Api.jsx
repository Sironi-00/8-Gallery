const BASE_URL = "http://localhost:3000";
// const BASE_URL = "";

const IMAGE_SERVER = "https://image-server.fanisndou.co.uk/"

export const fetchImages = async () => {
    let res = await fetch(`${BASE_URL}/api/images`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;
};

export const fetchSearch = async (searchString) => {
    let res = await fetch(`${BASE_URL}/api/images/search/?q=${searchString}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return [];
};

export const fetchImagesByAuthor = async (author) => {
    let res = await fetch(`${BASE_URL}/api/images/by/${author}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;
};

export const fetchImageById = async (id) => {
    let res = await fetch(`${BASE_URL}/api/images/id/${id}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        },
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;
};

export const fetchAuthors = async () => {
    let res = await fetch(`${BASE_URL}/api/user`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
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
    
    let res = await fetch(`${IMAGE_SERVER}/main.php`, {
        method: "POST",
        headers: {
            // 'content-type': 'multipart/form-data'
        }, body: formData
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
}

export const uploadImage = async (imageObject) => {
    // first upload to server then create DB entry
    const saveImaged = await saveImage(imageObject);

    if (!saveImaged) return false;
    if (saveImaged.status.code !== "201") {
        return saveImage.data;
    }

    let res = await fetch(`${BASE_URL}/api/images`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify({...imageObject, url: `${IMAGE_SERVER}/images/` + saveImaged.data.message})
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;
};

export const updateImage = async (imageObject) => {
    let res = await fetch(`${BASE_URL}/api/images/${imageObject.id}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify(imageObject)
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;
};


export const deleteImage = async ({id, artistId}) => {
    let res = await fetch(`${BASE_URL}/api/images/${id}?artistId=${artistId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return true;
    }
    return false;
};

export const userLogin = async (user) => {
    let res = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify(user)
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;    
}

export const userRegister = async (user) => {
    let res = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify(user)
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;    
}

export const userEmail = async (emailObject) => {
    let res = await fetch(`${BASE_URL}/api/user/email`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify(emailObject)
    });

    if (res.ok) {
        let data = await res.json();
        return data; 
    }
    return false;    
}

export const userName = async (artistId) => {
    let res = await fetch(`${BASE_URL}/api/user/name/id=${artistId}`, {
        method: "GET",
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
}

export const incrementView = async (id) => {
    let res = await fetch(`${BASE_URL}/api/images/views/${id}`, {
        method: "PATCH",
    });

    if (res.ok) {
        return true; 
    }
    return false;    
}

export const getImageUpvotes = async ({id, userId}) => {
    let res = await fetch(`${BASE_URL}/api/images/vote/${id}?userId=${userId}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        },
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return false;
};

export const upvoteImage = async ({id, userId}) => {
    let res = await fetch(`${BASE_URL}/api/images/vote/${id}?userId=${userId}`, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return false;
};
