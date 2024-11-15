import apiClient from "./apiClient";

export const createDocumentData = async (document_id) => {
    const response = await apiClient.post('/ollama/' + document_id)
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};