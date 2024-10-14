import apiClient from './apiClient';

export const fetchDocuments = async () => {
    const response = await apiClient.get('/file');
    return response.data;
};

export const createDocuments = async (newDocument) => {
    const response = await apiClient.post('/file', newDocument);
    return response.data;
};