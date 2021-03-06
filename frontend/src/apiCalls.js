
const baseUrl = '/api/point';

const headers = {
    'Content-Type': 'application/json'
};

export function savePoint(point) {
    return baseRequest(baseUrl, {
        method: 'POST',
        body: JSON.stringify(point),
        headers,
    });
}

export function updatePoint(point) {
    console.log(point);
    return baseRequest(baseUrl, {
        method: 'PUT',
        body: JSON.stringify(point),
        headers,
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

export function getNeighbours(point, radius, count) {
    return baseRequest(`${baseUrl}/neighbours?x=${point.x}&y=${point.y}&m=${radius}&n=${count}`);
}

function baseRequest(url, init) {
    return fetch(url, init)
        .then(async r => {
            console.log(r);
            if(!r.ok)
                alert((await r.json()).error);
            return r.json();
        })
        .catch(alert);
}
