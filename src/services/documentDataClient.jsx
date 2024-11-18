import apiClient from "./apiClient";

export const createDocumentData = async (document_id) => {
    const response = await apiClient.post('/document/data/' + document_id)
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};

export const updateDocumentData = async (evaluatedData) => {
    console.log(evaluatedData)
    const response = await apiClient.put('/document/data', evaluatedData)
        .catch(function (error) {
            console.log(error)
        });
    return response.data;

};