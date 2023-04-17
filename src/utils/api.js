const jsonRequest = (url, options = {}) => {
    return fetch('https://jsonplaceholder.typicode.com' + url, {
        headers: {'content-type': 'application/json'},
        ...options
    }).then((response) => response.json());
};

export const fetchUsers = (url) => {
    const options = {
        method: 'GET'
    };

    const request = jsonRequest(url, options);

    return request;
};
