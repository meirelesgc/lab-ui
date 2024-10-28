import { useMutation } from 'react-query';
import { createOpenAiJson } from '../services/openAiClient';

const useCreateOpenAiJson = () => {
    return useMutation(createOpenAiJson, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchOpenAiJson'])
        },
        onError: () => {
            console.log('Erro ao extrair os dados', error);
        }
    });
};

export default useCreateOpenAiJson;
