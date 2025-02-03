import apiClient from './apiClient';


export const fetchDocuments = async () => {
    const response = await apiClient.get('/document')
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};

export const createDocument = async (newDocument, flag) => {
    const response = await apiClient.post(`/document/${flag}`, newDocument, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const deleteDocument = async (document_id) => {
    const response = await apiClient.delete('/document/' + document_id);
    return response.data;
};

export const fetchDocument = async (document_id) => {
    const response = await apiClient.get('/document/' + document_id)
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
}