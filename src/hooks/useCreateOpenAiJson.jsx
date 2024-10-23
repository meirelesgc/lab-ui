import { useQuery } from 'react-query';
import { createOpenAiJson } from '../services/openAiClient';

const useCreateOpenAiJson = (document_id) => {
    return useQuery(['createOpenAiJson', document_id], () => createOpenAiJson(document_id), {
        enabled: !!document_id,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchOpenAiJson'])
        },
        onError: (error) => {
            console.error('Erro ao buscar dados do OpenAI:', error);
        }
    });
};

export default useCreateOpenAiJson;
