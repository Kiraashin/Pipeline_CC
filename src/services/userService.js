import api from "./api";

export const getUsers = (page = 1) =>
    api.get(`/users?page=${page}`);

export const deleteUser = (id) =>
    api.delete(`/users/${id}`);