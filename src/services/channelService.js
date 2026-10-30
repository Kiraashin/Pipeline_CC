import api from './api';

export const getChannels = async (page = 1) => {
    return await api.get(`/channels?page=${page}`);
};

export const getChannelList = async () => {
    return await api.get('/channels/list');
};

export const createChannel = async (data) => {
    return await api.post('/channels', data);
};

export const deleteChannel = async (id) => {
    return await api.delete(`/channels/${id}`);
};