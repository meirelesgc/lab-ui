import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Table, Space, Typography, Input, Button, Flex } from "antd";

import useParameters from "../../hooks/useParameters";
import useCreateParameter from "../../hooks/useCreateParameter";
import useDeleteParameter from "../../hooks/useDeleteParameter";

const ActionButtons = ({ record, handleDeleteButtonClick }) => (
    <Space justify='center'>
        <Button type='link' onClick={() => handleDeleteButtonClick(record)}>
            Excluir
        </Button>
    </Space>
);

const getColumns = (handleDeleteButtonClick) => [
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

const ParametersTable = () => {
    const { mutate: createParameter } = useCreateParameter();
    const { mutate: deleteParameter } = useDeleteParameter();
    const { data, isLoading } = useParameters();
    const [newParameter, setNewParameter] = useState("");

    const handleInputChange = (e) => {
        setNewParameter(e.target.value);
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (!newParameter) return;
        createParameter(newParameter);
        setNewParameter("");
    };

    const handleDeleteButtonClick = (record) => {
        deleteParameter(record['parameter_id']);
    };

    const columns = getColumns(handleDeleteButtonClick);

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => (
                <Flex justify="space-between">
                    <Typography.Title strong level={5}>
                        Lista completa
                    </Typography.Title>
                    <Flex align="center" gap="1rem">
                        <Input
                            allowClear
                            value={newParameter}
                            onChange={handleInputChange}
                            onPressEnter={handleInputSubmit}
                        />
                        <Button icon={<PlusOutlined />} type="primary" onClick={handleInputSubmit}>
                            Enviar
                        </Button>
                    </Flex>
                </Flex>
            )}
            rowKey="parameter_id"
            loading={isLoading}
            pagination={false}
        />
    );
};

export default ParametersTable;
