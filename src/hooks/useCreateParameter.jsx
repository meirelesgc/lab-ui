import { useMutation, useQueryClient } from 'react-query';
import { createParameter } from '../services/parameterClient';

const useCreateParameter = () => {
    const queryClient = useQueryClient()
    return useMutation(createParameter, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchParameters'])
        },
        onError: (error) => {
            console.log('Erro ao criar um novo parâmetros', error);
        },
    });
};

export default useCreateParameter;