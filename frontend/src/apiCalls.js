
const baseUrl = '/api/point';
const headers = {
    'Content-Type': 'application/json'
};

export function savePoint(point) {
    return baseRequest(baseUrl, {
        method: 'POST',
        body: point,
        headers: headers,
    });
}

export function updatePoint(point) {
    return baseRequest(baseUrl, {
        method: 'PUT',
        body: point,
        headers: headers,
    });
}

export function deletePoint(id) {
    return baseRequest(baseUrl + '/' + id, {
        method: 'DELETE'
    });
}

export function listPoints(page, count) {
    return baseRequest(`${baseUrl}?page=${page}&count=${count}`);
}

export function getNeighbours(point) {
    return baseRequest(`${baseUrl}/neighbours?x=${point.x}&y=${point.y}`);
}

function baseRequest(url, init) {
    return fetch(url, init)
        .then(async r => {
            if(!r.ok)
                alert((await r.json()).error)
            return r.json();
        })
        .catch(alert);
}
