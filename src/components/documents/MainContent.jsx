import { Flex } from "antd";
import { useState } from "react";

import Banner from "../Banner";
import DocTable from "./Table";
import CustomDrawer from './Drawer';

import { UploadOutlined } from '@ant-design/icons';

const MainContent = () => {
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    const switchVisibleDrawer = () => {
        setVisibleDrawer(!visibleDrawer);
    };

    const sendDrawer = () => {
        return {
            label: "Anexar",
            icon: <UploadOutlined />,
            type: "primary",
            onClick: () => switchVisibleDrawer()
        };
    };

    return <div style={{ flex: 1 }}>
        <Flex vertical gap='2.3rem'>
            <CustomDrawer
                title='Enviar novo documento'
                switchDrawer={switchVisibleDrawer}
                open={visibleDrawer} />
            <Banner
                title='Gerenciamento de Documentos'
                description='Aqui você pode ver a lista de documentos cadastrados e acompanhar o estado atual do processamento.'
                buttons={[sendDrawer()]} />
            <DocTable />
        </Flex>
    </div>;
};

export default MainContent;
