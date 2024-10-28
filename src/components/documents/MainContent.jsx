import { Flex } from "antd";
import { useState } from "react";

import Banner from "../Banner"
import DocTable from "./Table";
import DocDrawer from './Drawer'


import { UploadOutlined, AuditOutlined } from '@ant-design/icons'

const MainContent = () => {
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const switchVisibleDrawer = () => {
        setVisibleDrawer(!visibleDrawer)
    }

    const sendDrawer = () => {
        return {
            label: "Anexar",
            icon: <UploadOutlined />,
            type: "primary",
            onClick: () => switchVisibleDrawer()
        }
    }

    const handleExtractData = () => {
        return {
            // Implementar carga completa dos documentos
            label: '<EM OBRAS>',
            icon: <AuditOutlined />,
            onclick: () => console.log('<EM OBRAS>')
        }
    }


    return <div style={{ flex: 1 }}>
        <Flex vertical gap='2.3rem'>
            <DocDrawer
                visibleDrawer={visibleDrawer}
                switchVisibleDrawer={switchVisibleDrawer} />
            <Banner
                title='Gerenciamento de Documentos'
                description='Aqui você pode ver a lista de documentos cadastrados e acompanhar o estado atual do processamento.'
                buttons={[sendDrawer(), handleExtractData()]} />
            <DocTable />
        </Flex>
    </div>
}
export default MainContent