import React from "react";
import { Flex } from "antd";
import Banner from "../Banner"
import PatientTable from './Table'
import { useState } from "react";
import { PlusCircleOutlined } from '@ant-design/icons'
import CustomDrawer from "./Drawer";

const MainContent = () => {
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const switchVisibleDrawer = () => {
        setVisibleDrawer(!visibleDrawer)
    }

    const sendDrawer = () => {
        return {
            label: "Adicionar paciente",
            icon: <PlusCircleOutlined />,
            type: "primary",
            onClick: () => switchVisibleDrawer()
        }
    }

    return <div style={{ flex: 1 }}>
        <Flex vertical gap='2.3rem'>
            <CustomDrawer
                title='Adicionar paciente'
                switchDrawer={switchVisibleDrawer}
                open={visibleDrawer}
            />
            <Banner
                title='Gerenciamento de Pacientes'
                description='Aqui você pode gerenciar os pacientes cadastrados, com opções de edição, exclusão e configuração.'
                buttons={[sendDrawer()]} />
            <PatientTable />
        </Flex>
    </div>
}

export default MainContent