import { Flex } from 'antd'
import MainContent from '../components/documents/MainContent'
import SideContent from '../components/documents/SideContent'
import { useParams } from 'react-router-dom'

const DocumentPage = () => {
    const { id: document_id } = useParams();

    return <Flex gap='large'>
        <MainContent />
        {document_id && <SideContent id={document_id} />}
    </Flex>
}
export default DocumentPage
