import apiClient from './apiClient';


export const fetchOpenAiJson = async (document_id) => {
    const response = await apiClient.get('/open-ai/document/' + document_id)
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};

export const createOpenAiJson = async (document_id) => {
    const response = await apiClient.post('/open-ai/document/' + document_id);
    return response.data;
};

export const updateOpenAiJson = async (newJsonDocument) => {
    const response = await apiClient.put('/open-ai/document', newJsonDocument);
    return response.data;
};
