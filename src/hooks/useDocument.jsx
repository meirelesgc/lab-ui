import { useQuery } from 'react-query';
import { fetchDocument } from '../services/documentClient';

const useDocument = (document_id) => {
    return useQuery(['fetchDocument', document_id], () => fetchDocument(document_id), {
        enabled: !!document_id,
    });
};


export default useDocument;