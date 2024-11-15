import { useMutation } from "react-query";
import { createDocumentData } from '../services/documentDataClient'

const useCreateDocumentData = () => {
    return useMutation(createDocumentData, {
        onSuccess: () => {
            console.log('Sucesso ao extrair dados');
        },
        onError: (error) => {
            console.log('Erro ao extrair dados', error);
        }
    })
}
export default useCreateDocumentData