import apiClient from './apiClient';


export const fetchDocuments = async () => {
    const response = await apiClient.get('/file')
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};

export const createDocument = async (newDocument) => {
    const response = await apiClient.post('/file', newDocument, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data;
};

export const deleteDocument = async (document_id) => {
    const response = await apiClient.delete('/file/' + document_id);
    return response.data;
};