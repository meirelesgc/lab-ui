import { useQuery } from 'react-query';
import { fetchOpenAiJson } from '../services/openAiClient';

const useOpenAiJson = (document_id) => {
    return useQuery(['fetchOpenAiJson', document_id], () => fetchOpenAiJson(document_id), {
        enabled: !!document_id,
        onError: (error) => {
            console.error('Erro ao buscar dados do OpenAI:', error);
        }
    });
};

export default useOpenAiJson;
