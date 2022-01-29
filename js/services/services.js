const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
        //это те ошибки что попадают к нам в консоль
    }

    return await res.json();
};

const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }

    return await res.json();
};

export {
    getResourse
};
export {
    postData
};