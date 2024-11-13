import React, { useState } from "react";
import { Flex } from "antd";
import Banner from "../Banner"
import ParamTable from './Table'
import { AppstoreAddOutlined } from '@ant-design/icons'
import CustomDrawer from "./Drawer";

const MainContent = () => {
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const switchVisibleDrawer = () => {
        setVisibleDrawer(!visibleDrawer)
    }

    const sendDrawer = () => {
        return {
            label: "Novo paramêtro",
            icon: <AppstoreAddOutlined />,
            type: "primary",
            onClick: () => switchVisibleDrawer()
        }
    }

    return <div style={{ flex: 1 }}>
        <Flex vertical gap='2.3rem'>
            <CustomDrawer
                title='Enviar paramêtro'
                switchDrawer={switchVisibleDrawer}
                open={visibleDrawer} />
            <Banner
                title='Gerenciamento de Parâmetros'
                description='Aqui você pode ver os dados cadastrados para extração, bem como editar seus sinônimos.'
                buttons={[sendDrawer()]} />
            <ParamTable />
        </Flex>
    </div>
}

export default MainContent