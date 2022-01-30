
export default async function apiCall ({
    url,
    method = "GET",
    body,
    headers,  
}) {
    return fetch(url, {
        method,
        body,
        headers, 
    })
    .then(response => response)
    .catch(error => error) 
}