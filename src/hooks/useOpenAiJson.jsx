import { useQuery } from 'react-query';
import { fetchOpenAiJson } from '../services/openAiClient';

const useParameters = () => {
    return useQuery('fetchOpenAiJson', fetchOpenAiJson);
};

export default useParameters;