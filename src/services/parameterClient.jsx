import apiClient from './apiClient';


export const fetchParameters = async () => {
    const response = await apiClient.get('/parameter')
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};

export const createParameter = async (newParameter) => {
    const response = await apiClient.post('/parameter?parameter=' + newParameter);
    return response.data;
};

export const deleteParameter = async (parameter_id) => {
    const response = await apiClient.delete('/parameter/' + parameter_id);
    return response.data;
};