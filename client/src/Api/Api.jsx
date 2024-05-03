const BASE_URL = "http://localhost:3000";
// const BASE_URL = "";

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

export const uploadImage = async (imageObject) => {
    const formData = new FormData();
    formData.append("name", imageObject.name)
    formData.append("artistId", imageObject.artistId)
    formData.append("description", imageObject.description)
    formData.append("file", imageObject.file)
    
    let resUpload = await fetch(`http://localhost:3001/main.php`, {
        method: "POST",
        headers: {
            // 'content-type': 'multipart/form-data'
        }, body: formData
    });

    if (!resUpload.ok) {
        return false;
    }

    let data = await resUpload.json();
    console.log(data)
    if (data.status.code !== "201") {
        return data;
    }

    console.log("2nd fetch")

    let resCreate = await fetch(`${BASE_URL}/api/images`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify({...imageObject, url: "http://localhost:3001/images/" + data.data.message})
    });

    if (resCreate.ok) {
        let dataCreate = await resCreate.json();
        return dataCreate; 
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