import { useMutation, useQueryClient } from 'react-query';
import { deletePatient } from '../services/patientClient';

const useDeletePatient = () => {
    const queryClient = useQueryClient()
    return useMutation(deletePatient, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchPatients'])
        },
        onError: (error) => {
            console.log('Erro ao deletar um parâmetro', error);
        },
    });
};

export default useDeletePatient;