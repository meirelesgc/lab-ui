import React, { useState } from "react";
import { Table, Button, Flex, Typography, message } from "antd";
import { PlusOutlined, ClockCircleOutlined, SyncOutlined, CloseCircleOutlined, CheckCircleOutlined, FileSearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useDocuments from "../../hooks/useDocuments";
import useDeleteDocument from "../../hooks/useDeleteDocument"
import CreateDocumentModal from "../modals/CreateDocumentModal";

const statusIconMap = {
    'STANDBY': <ClockCircleOutlined />,
    'IN-PROCESS': <SyncOutlined />,
    'FAILED': <CloseCircleOutlined />,
    'DONE': <CheckCircleOutlined />,
};

const DocumentTable = () => {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useDocuments();
    const { mutate } = useDeleteDocument()

    const switchModal = () => {
        setOpen(!open);
    };

    const handleButtonClick = (record) => {
        mutate(record['document_id'])
        message.success('Documento removido com sucesso!')
    };

    const columns = [
        { title: '', dataIndex: 'status', key: 'status', render: (status) => statusIconMap[status], width: '5%', align: 'center' },
        { title: 'Código', dataIndex: 'document_id', key: "document_id", width: '30%' },
        { title: 'Nome do arquivo', dataIndex: 'name', key: 'name', render: (text) => text.slice(0, -4) },
        { title: 'Hora', dataIndex: 'created_at', key: 'created_at', render: (text) => new Date(text).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), width: '5%', align: 'center' },
        {
            title: 'Opções',
            key: 'action',
            render: (record) => (
                <Flex align="center" justify="flex-end" gap='middle'>
                    <Button icon={<FileSearchOutlined />} type="primary" onClick={() => handleButtonClick(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleButtonClick(record)} />
                </Flex>
            ),
            width: '5%',
            align: 'center'
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                title={() => (
                    <Flex justify="space-between" gap='middle' align="center">
                        <Typography.Title strong level={5}>Lista</Typography.Title>
                        <Button icon={<PlusOutlined />} type="primary" shape='circle' onClick={switchModal} />
                    </Flex>
                )}
                rowKey='document_id'
                loading={isLoading}
            />
            <CreateDocumentModal
                open={open}
                switchModal={switchModal} />
        </>
    );
}

export default DocumentTable;
