import { useMutation, useQueryClient } from 'react-query';
import { updateOpenAiJson } from '../services/openAiClient'; // ajuste o caminho conforme necessário

const useUpdateOpenAiJson = () => {
    const queryClient = useQueryClient();

    return useMutation(updateOpenAiJson, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocuments']); // Substitua por uma query relevante se necessário
        },
        onError: (error) => {
            console.log('Erro ao atualizar o JSON:', error);
        },
    });
};

export default useUpdateOpenAiJson;
