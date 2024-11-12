import { useMutation, useQueryClient } from 'react-query';
import { createDocument } from '../services/documentClient';

const useCreateDocument = () => {
    const queryClient = useQueryClient()

    return useMutation(createDocument, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocuments'])
        },
        onError: (error) => {
            console.log('Erro ao criar arquivo', error);
        },
    });
};

export default useCreateDocument;