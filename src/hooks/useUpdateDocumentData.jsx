import { useMutation, useQueryClient } from 'react-query';
import { updateDocumentData } from '../services/documentDataClient';

const useUpdateDocumentData = () => {
    const queryClient = useQueryClient()
    return useMutation(updateDocumentData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocument'])
        },
        onError: (error) => {
            console.log('Erro ao atualizar os dados', error);
        },
    });
};

export default useUpdateDocumentData;