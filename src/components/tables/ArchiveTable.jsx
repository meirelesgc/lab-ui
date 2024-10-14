import React from "react";
import { Table, Button, Flex, Typography } from "antd";
import { PlusOutlined } from '@ant-design/icons'

const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Estado', dataIndex: 'status' },
    { title: 'Código', dataIndex: 'document_id' },
    { title: 'Data', dataIndex: 'created_at' }
];

const data = [
    {
        key: '1',
        name: 'Alice Silva',
        status: 'Aprovado',
        document_id: 'DOC12345',
        created_at: '2024-01-15',
    },
    {
        key: '2',
        name: 'Bruno Santos',
        status: 'Pendente',
        document_id: 'DOC67890',
        created_at: '2024-02-20',
    },
    {
        key: '3',
        name: 'Carla Almeida',
        status: 'Rejeitado',
        document_id: 'DOC11223',
        created_at: '2024-03-05',
    },
    {
        key: '4',
        name: 'Diego Ferreira',
        status: 'Aprovado',
        document_id: 'DOC33445',
        created_at: '2024-04-10',
    },
    {
        key: '5',
        name: 'Ester Ramos',
        status: 'Pendente',
        document_id: 'DOC55667',
        created_at: '2024-05-18',
    }
];

const ArchiveTable = () => {
    return <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => (
            <Flex justify="space-between" gap='middle' align="center">
                <Typography.Title strong level={5} >Lista</Typography.Title>
                <Button icon={<PlusOutlined />} type="primary" shape='circle' />
            </Flex>
        )}
    />;
}

export default ArchiveTable;
