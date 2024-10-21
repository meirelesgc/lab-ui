import { useMutation, useQueryClient } from 'react-query';
import { createPatient } from '../services/patientClient';

const useCreatePatient = () => {
    const queryClient = useQueryClient()
    return useMutation(createPatient, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchPatients'])
        },
        onError: (error) => {
            console.log('Erro ao criar um paciente', error);
        },
    });
};

export default useCreatePatient;