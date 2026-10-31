
import api from "./api";

export const getContents = () => api.get("/contents");

export const createContent = (data) =>
    api.post("/contents", data);

export const updateContent = (id, data) =>
    api.put(`/contents/${id}`, data);

export const updateContentStatus = (id, data) =>
    api.put(`/contents/${id}/status`, data);

export const deleteContent = (id) =>
    api.delete(`/contents/${id}`);
