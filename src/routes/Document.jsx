import { Flex } from 'antd'
import MainContent from '../components/documents/MainContent'
import { useParams } from 'react-router-dom'

const DocumentPage = () => {
    const { id: document_id } = useParams();

    return <Flex gap='large'>
        <MainContent />
    </Flex>
}
export default DocumentPage
