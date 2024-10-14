import React, { useState } from "react";
import { Table, Button, Flex, Typography, Alert, Modal } from "antd";
import { PlusOutlined, ClockCircleOutlined, SyncOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import useArchives from "../../hooks/useArchives";

const statusIconMap = {
    'STANDBY': <ClockCircleOutlined />,
    'IN-PROCESS': <SyncOutlined />,
    'FAILED': <CloseCircleOutlined />,
    'DONE': <CheckCircleOutlined />,
};

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => text.slice(0, -4) },
    { title: 'Estado', dataIndex: 'status', key: 'status', render: (status) => statusIconMap[status] || status },
    { title: 'Código', dataIndex: 'document_id', key: "document_id" },
    { title: 'Hora', dataIndex: 'created_at', key: 'created_at', render: (text) => new Date(text).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
];
const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const ArchiveTable = () => {

    const [open, setOpen] = useState(false);
    const { data, error, isLoading } = useArchives();

    const switchModal = () => {
        setOpen(!open);
    };

    if (error) {
        return <Alert
            message="Erro ao carregar os dados"
            description={error.message}
            type="error"
            showIcon />;
    }

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
            <Modal
                title="Anexe os documentos abaixo"
                open={open}
                onOk={switchModal}
                onCancel={switchModal}
            >

            </Modal>
        </>

    );
}

export default ArchiveTable;
