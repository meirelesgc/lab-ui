import { Button, Space } from "antd";
const ActionButtons = ({ record, handleDeleteButtonClick }) => (
    <Space justify='center'>
        <Button type='link' onClick={() => handleDeleteButtonClick(record)}>
            Excluir
        </Button>
    </Space>
);

const tableConfig = (handleDeleteButtonClick) => [
    {
        dataIndex: 'status',
        key: 'status',
        width: '5%',
        align: 'center'
    },
    {
        title: 'Identificador',
        dataIndex: 'patient_id',
        key: 'patient_id',
        width: '20%',
        ellipsis: true
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
    },
    {
        key: "action",
        render: (text, record) => (
            <ActionButtons
                record={record}
                handleDeleteButtonClick={handleDeleteButtonClick}
            />
        ),
        width: '15%',
        align: 'center'
    }
];

export default tableConfig