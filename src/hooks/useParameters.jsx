import { useQuery } from 'react-query';
import { fetchParameters } from '../services/parameterClient';

const useParameters = () => {
    return useQuery('fetchParameters', fetchParameters);
};

export default useParameters;