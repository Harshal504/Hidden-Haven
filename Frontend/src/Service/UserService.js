import axios from 'axios';
import { getAuthHeader } from "./TokenService";
const API_URL = "http://localhost:8080/users"; 

export const getAllViewers = () => {
    return axios.get(`${API_URL}/viewers`, getAuthHeader());
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/viewers/delete/${userId}`, getAuthHeader());
};

export const updateUser = (userId, userData) => {
    return axios.put(`${API_URL}/viewers/update/${userId}`, userData, getAuthHeader());
};