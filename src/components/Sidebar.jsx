import React from "react";
import { Flex, Menu } from "antd";
import { ExperimentOutlined, FilePdfFilled, EditOutlined, UserOutlined } from '@ant-design/icons';

const Sidebar = ({ setSelectedItem }) => {
    const handleMenuClick = (e) => {
        setSelectedItem(e.key);
    };

    return <>
        <Flex align="center" justify="center">
            <div className="logo">
                <ExperimentOutlined />
            </div>
        </Flex>

        <Menu
            mode="vertical"
            defaultSelectedKeys={['document_sider_key']}
            className="menu-bar"
            onClick={handleMenuClick}
            items={[
                { key: 'document_sider_key', icon: <FilePdfFilled />, label: 'Arquivos' },
                { key: 'parameters_sider_key', icon: <EditOutlined />, label: 'Parâmetros' },
                { key: 'patients_sider_key', icon: <UserOutlined />, label: 'Pacientes' },
            ]} />
    </>;
};

export default Sidebar;
