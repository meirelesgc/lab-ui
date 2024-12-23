import { Space, Tooltip, Button } from 'antd';
import { ClockCircleOutlined, SyncOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const ActionButtons = ({ record, onView, onDelete }) => (
    <Space justify="center">
        <Button
            variant="link"
            disabled={record.status !== "STANDBY" && record.status !== "DONE"}
            onClick={() => onView(record)}>
            Abrir
        </Button>
        <Button
            variant="link"
            onClick={() => onDelete(record)} >
            Excluir
        </Button>
    </Space>
);

const statusIcon = {
    STANDBY: { icon: <ClockCircleOutlined />, tooltip: "Aguardando" },
    "IN-PROCESS": { icon: <SyncOutlined spin />, tooltip: "Em Processo" },
    FAILED: { icon: <ExclamationCircleOutlined />, tooltip: "Falha" },
    DONE: { icon: <CheckCircleOutlined />, tooltip: "Concluído" }
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR',
    { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
);

const tableConfig = (onView, onDelete) => [
    {
        dataIndex: "status",
        key: "status",
        render: (status) => {
            const { icon, tooltip } = statusIcon[status] || {};
            return (
                <Tooltip title={tooltip || ""}>
                    {icon}
                </Tooltip>
            );
        },
        width: '5%',
        align: 'center'
    },
    {
        dataIndex: "document_id",
        key: "document_id",
        title: "Identificador",
        width: '20%',
        ellipsis: true
    },
    {
        dataIndex: "name",
        key: "name",
        title: "Nome",
        width: '40%',
        ellipsis: true
    },
    {
        dataIndex: "created_at",
        key: "created_at",
        title: "Adicionado em",
        render: formatDate,
        width: '20%',
        ellipsis: true
    },
    {
        key: "action",
        render: (_, record) => (
            <ActionButtons
                record={record}
                onView={onView}
                onDelete={onDelete} />
        ),
        width: '15%',
        align: 'center'
    }
];

export default tableConfig;