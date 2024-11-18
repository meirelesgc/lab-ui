import { useMutation, useQueryClient } from "react-query";
import { createDocumentData } from '../services/documentDataClient'

const useCreateDocumentData = () => {
    const queryClient = useQueryClient()
    return useMutation(createDocumentData, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchDocument'])
            console.log('Sucesso ao extrair dados');
        },
        onError: (error) => {
            console.log('Erro ao extrair dados', error);
        }
    })
}
export default useCreateDocumentData