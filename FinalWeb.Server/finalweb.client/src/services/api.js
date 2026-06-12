import axios from "axios";

const API = axios.create({
    baseURL: "/api"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth
export const login = async (data) => API.post("/Auth/login", data);
export const register = async (data) => API.post("/Auth/register", data);

// Tables
export const getTables = async () => API.get("/Tables");
export const getTableById = async (id) => API.get(`/Tables/${id}`);
export const createTable = async (data) => API.post("/Tables", data);
export const updateTable = async (id, data) => API.put(`/Tables/${id}`, data);
export const deleteTable = async (id) => API.delete(`/Tables/${id}`);

// Reservations
export const getReservations = async () => API.get("/Reservations");
export const getMyReservations = async () => API.get("/Reservations/mine");
export const createReservation = async (data) => API.post("/Reservations", data);
export const updateReservation = async (id, data) => API.put(`/Reservations/${id}`, data);
export const deleteReservation = async (id) => API.delete(`/Reservations/${id}`);

// Menu Items
export const getMenuItems = async () => API.get("/MenuItems");
export const createMenuItem = async (data) => API.post("/MenuItems", data);
export const updateMenuItem = async (id, data) => API.put(`/MenuItems/${id}`, data);
export const deleteMenuItem = async (id) => API.delete(`/MenuItems/${id}`);