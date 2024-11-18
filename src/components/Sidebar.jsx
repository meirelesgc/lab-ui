import { Flex, Menu } from "antd";
import { FilePdfFilled, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import logoImage from '../assets/Dan-Sem-Fundo-Azul.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    return (
        <>
            <Flex align="center" justify="center">
                <div className="logo">
                    <img src={logoImage} alt="Logo" style={{ width: '6rem' }} />
                </div>
            </Flex>

            <Menu
                mode="vertical"
                defaultSelectedKeys={['document']}
                className="menu-bar"
                onClick={handleMenuClick}
                items={[
                    { key: '/document', icon: <FilePdfFilled />, label: 'Arquivos' },
                    { key: '/param', icon: <EditOutlined />, label: 'Parâmetros' },
                    { key: '/patient', icon: <UserOutlined />, label: 'Pacientes' },
                ]}
            />
        </>
    );
};

export default Sidebar;
