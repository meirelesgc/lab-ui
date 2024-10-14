import apiClient from './apiClient';

export const fetchArchives = async () => {
    const response = await apiClient.get('/file');
    return response.data;
};