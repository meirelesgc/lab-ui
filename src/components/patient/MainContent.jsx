import React from "react";
import { Flex } from "antd";
import Banner from "../Banner"
import PatientTable from './Table'

const MainContent = () => {
    return <div style={{ flex: 1 }}>
        <Flex vertical gap='2.3rem'>
            <Banner
                title='Gerenciamento de Pacientes'
                description='Aqui você pode gerenciar os pacientes cadastrados, com opções de edição, exclusão e configuração.'
                buttons={[]} />
            <PatientTable />
        </Flex>
    </div>
}

export default MainContent