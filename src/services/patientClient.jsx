import apiClient from './apiClient';

export const fetchPatients = async () => {
    const response = await apiClient.get('/patient')
        .catch(function (error) {
            if (error.response.status === 404) {
                return [];
            }
        });
    return response.data;
};

export const createPatient = async (newPatient) => {
    const response = await apiClient.post('/patient?name=' + newPatient);
    return response.data;
};

export const deletePatient = async (patient_id) => {
    const response = await apiClient.delete('/patient/' + patient_id);
    return response.data;
};