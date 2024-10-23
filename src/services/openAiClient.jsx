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

// export const deleteDocument = async (document_id) => {
//     const response = await apiClient.delete('/file/' + document_id);
//     return response.data;
// };