import axios from "axios";

export const placesConfig = axios.create({
    baseURL: "http://localhost:8000/api/v1/places",
});

export const placeConfig = axios.create({
    baseURL: "https://traveller.talrop.works/api/v1/places/view",
});

export const loginConfig = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth/token/",
});

export const registerConfig = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth/create/",
});

export const placeProtectedConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/places/protected/',
});

export const commentConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/places/comment/add',
});

export const commentListConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/places/comment/list',
});

export const likeConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/places/like/update',
});
