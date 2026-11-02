import api from "./api";

export const createTask = (contentId, data) => {
    return api.post(`/contents/${contentId}/checklists`, data);
};

export const updateTaskStatus = (id) => {
    return api.patch(`/checklists/${id}/toggle`);
};