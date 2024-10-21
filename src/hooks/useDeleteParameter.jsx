import { useMutation, useQueryClient } from 'react-query';
import { deleteParameter } from '../services/parameterClient';

const useDeleteParameter = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteParameter, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchParameters'])
        },
        onError: (error) => {
            console.log('Erro ao deletar um parâmetro', error);
        },
    });
};

export default useDeleteParameter;