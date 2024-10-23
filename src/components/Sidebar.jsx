import { Flex, Menu } from "antd";
import { ExperimentOutlined, FilePdfFilled, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate()
    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    return <>
        <Flex align="center" justify="center">
            <div className="logo">
                <ExperimentOutlined />
            </div>
        </Flex>

        <Menu
            mode="vertical"
            defaultSelectedKeys={['document']}
            className="menu-bar"
            onClick={handleMenuClick}
            items={[
                { key: '/document', icon: <FilePdfFilled />, label: 'Arquivos' },
                { key: '/parameter', icon: <EditOutlined />, label: 'Parâmetros' },
                { key: '/patient', icon: <UserOutlined />, label: 'Pacientes' },
            ]} />
    </>;
};

export default Sidebar;
