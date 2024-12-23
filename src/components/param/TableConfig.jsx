import { Space, Button } from "antd";

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
        dataIndex: 'parameter_id',
        key: 'parameter_id',
        width: '20%',
        ellipsis: true,
    },
    {
        title: 'Parâmetro',
        dataIndex: 'parameter',
        key: 'parameter',
        width: '40%',
    },
    {
        title: 'Sinônimos',
        dataIndex: 'synonyms',
        key: 'synonyms',
        render: (synonyms) => (synonyms.length > 0 ? synonyms.join(', ') : 'Nenhum sinônimo'),
        width: '20%',
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

export default tableConfig;