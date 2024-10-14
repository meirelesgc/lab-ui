import { useQuery } from 'react-query';
import { fetchDocuments } from '../services/documentClient';

const useDocuments = () => {
    return useQuery('fetchDocuments', fetchDocuments);
};

export default useDocuments;