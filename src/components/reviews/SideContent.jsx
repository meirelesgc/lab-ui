import { Flex } from 'antd';
import Banner from '../Banner'
import { RedoOutlined, CheckOutlined } from '@ant-design/icons'
import useDocument from '../../hooks/useDocument'
import { useParams } from "react-router-dom"

const SideContent = () => {
    const { document_id } = useParams()
    const { data, isLoading } = useDocument(document_id)

    const handleSubmit = () => {
        return {
            label: "Enviar",
            icon: <CheckOutlined />,
            type: "primary",
            onClick: () => console.log('Enviei')
        }
    }

    const handleExtract = () => {
        return {
            label: "Refazer extração",
            icon: <RedoOutlined />,
            type: "primary",
            onClick: () => console.log('Refiz')
        }
    }

    const create_at = new Date(data.created_at).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
    });

    return <Flex vertical gap='3.2rem' style={{ width: 650 }}>
        <Banner
            title={data.name.slice(0, -4)}
            description={'Adicionado em ' + create_at}
            buttons={[handleSubmit(), handleExtract()]} />
    </Flex>;
};

export default SideContent;
