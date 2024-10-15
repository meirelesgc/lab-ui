import { useMutation, useQueryClient } from 'react-query';
import { deleteDocument } from '../services/documentClient';

const useCreateDocument = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteDocument, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocuments'])
        },
        onError: (error) => {
            console.log('Erro ao deletar o arquivo', error);
        },
    });
};

export default useCreateDocument;