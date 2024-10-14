import { useQuery } from 'react-query';
import { fetchArchives } from '../services/archiveClient';

const useArchives = () => {
    return useQuery('users', fetchArchives);
};

export default useArchives;