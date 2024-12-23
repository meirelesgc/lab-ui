import { Button, Select, Space } from 'antd';

const tableConfig = (handleEvalChange) => [
    {
        title: 'Parâmetro',
        dataIndex: 'param',
        key: 'param',
        ellipsis: true
    },
    {
        title: 'Dado extraído',
        dataIndex: 'rawData',
        key: 'rawData',
        render: (rawData, record) => (
            <Space>
                {rawData.map((item, index) => (
                    <Button key={record.param + index} type="primary"
                        onClick={() => { handleEvalChange(record.param, [item]) }}>
                        {item}
                    </Button>))}
            </Space>)
    },
    {
        title: 'Dado revisado',
        dataIndex: 'evalData',
        key: 'evalData',
        render: (evalData, record) => (
            <Select
                mode="tags"
                style={{ width: '100%' }}
                value={evalData} // Use o valor atual do estado
                onChange={(newValues) => handleEvalChange(record.param, newValues)} // Atualize o estado ao alterar
                options={record.rawData.map((item) => ({ value: item, label: item }))}
            />
        )
    }
];

export default tableConfig;

