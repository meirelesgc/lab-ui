import { Flex } from "antd"
import Banner from '../components/Banner'
import { Outlet } from "react-router-dom"
import SideContent from '../components/SideContent'


const Document = () => {
    return <Flex gap={'large'}>
        <div style={{ flex: 1 }}>
            <Flex vertical gap="2.3rem">
                <Banner selectedItem={'document_sider_key'} />
                <Outlet />
            </Flex>
        </div>
        <SideContent />
    </Flex>
}

export default Document