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
    let res = await fetch("http://localhost:3000/api/authors", {
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