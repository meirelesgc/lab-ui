import { Flex } from 'antd'
import MainContent from '../components/documents/MainContent'
import SideContent from '../components/documents/SideContent'

const DocumentPage = () => {
    return <Flex gap='large'>
        <MainContent />
        <SideContent />
    </Flex>
}
export default DocumentPage