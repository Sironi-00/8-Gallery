export const fetchImages = async () => {
    let res = await fetch("http://localhost:3000/api/images", {
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

export const fetchImagesByAuthor = async (author) => {
    let res = await fetch(`http://localhost:3000/api/images/by/${author}`, {
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
    let res = await fetch(`http://localhost:3000/api/images/id/${id}`, {
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
    let res = await fetch("http://localhost:3000/api/user", {
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
    formData.append("author", imageObject.author)
    formData.append("description", imageObject.description)
    formData.append("file", imageObject.file)
    
    let res = await fetch("http://localhost:3000/api/upload", {
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
};

export const updateImage = async (imageObject) => {
    let res = await fetch(`http://localhost:3000/api/images/${imageObject.id}`, {
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
    let res = await fetch(`http://localhost:3000/api/images/${id}?artistId=${artistId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return true;
    }
    return false;
};

export const userLogin = async (user) => {
    let res = await fetch(`http://localhost:3000/api/user/login`, {
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
    let res = await fetch(`http://localhost:3000/api/user/register`, {
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

export const fetchSearch = async (searchString) => {
    let res = await fetch(`http://localhost:3000/api/images/search/?q=${searchString}`, {
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
}

export const userEmail = async (emailObject) => {
    let res = await fetch(`http://localhost:3000/api/user/email`, {
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
    let res = await fetch(`http://localhost:3000/api/user/name?id=${artistId}`, {
        method: "GET",
    });

    if (res.ok) {
        let data = await res.json();
        return data;
    }
    return false;
}