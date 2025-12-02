import axios from 'axios';
const API_URL = "http://localhost:8080/users"; 

export const getAllViewers = () => {
    return axios.get(`${API_URL}/viewers`);
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/viewers/delete/${userId}`);
};

export const updateUser = (userId, userData) => {
    return axios.put(`${API_URL}/viewers/update/${userId}`, userData);
};