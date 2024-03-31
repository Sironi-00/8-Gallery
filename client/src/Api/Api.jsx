export const fetchData = async () => {
    let res = await fetch("http://localhost:3000/api", {
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

export const fetchDataByAuthor = async (author) => {
    let res = await fetch(`http://localhost:3000/api/${author}`, {
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

export const deleteImage = async ({id, artistId}) => {
    let res = await fetch(`http://localhost:3000/api/${id}?artistId=${artistId}`, {
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

export const fetchSearch = async (searchString) => {
    let res = await fetch(`http://localhost:3000/api/search/?q=${searchString}`, {
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