import React, { useState } from "react";
import { Table, Button, Flex, Typography, Space, Tooltip } from "antd";
import { UploadOutlined, ClockCircleOutlined, SyncOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import useDocuments from "../../../hooks/useDocuments";
import useDeleteDocument from "../../../hooks/useDeleteDocument";
import DocumentSubmit from './DocumentSubmit';

const ActionButtons = ({ record, handleViewButtonClick, handleDeleteButtonClick }) => (
    <Space justify='center'>
        <Button type="link" disabled={record.status !== "STANDBY" && record.status !== "DONE"} onClick={() => handleViewButtonClick(record)}>
            Abrir
        </Button>
        <Button type='link' onClick={() => handleDeleteButtonClick(record)}>
            Excluir
        </Button>
    </Space>
);

const statusIconMap = {
    'STANDBY': { icon: <ClockCircleOutlined />, tooltip: "Aguardando" },
    'IN-PROCESS': { icon: <SyncOutlined spin />, tooltip: "Em Processo" },
    'FAILED': { icon: <ExclamationCircleOutlined />, tooltip: "Falha" },
    'DONE': { icon: <CheckCircleOutlined />, tooltip: "Concluído" }
};

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const getColumns = (handleViewButtonClick, handleDeleteButtonClick) => [
    {
        dataIndex: "status",
        key: "status",
        render: (status) => {
            const { icon, tooltip } = statusIconMap[status] || { icon: null, tooltip: "" };
            return (
                <Tooltip title={tooltip}>
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
        ellipsis: true,
    },
    {
        dataIndex: "name",
        key: "name",
        title: "Nome",
        width: '35%',
        ellipsis: true
    },
    {
        dataIndex: "created_at",
        key: "created_at",
        title: "Adicionado em",
        render: (created_at) => formatDate(created_at),
        width: '20%',
        ellipsis: true
    },
    {
        title: "Actions",
        key: "action",
        render: (text, record) => (
            <ActionButtons
                record={record}
                handleViewButtonClick={handleViewButtonClick}
                handleDeleteButtonClick={handleDeleteButtonClick}
            />
        ),
        width: '15%',
        align: 'center'
    }
];

const DocumentPanel = ({ setDocument }) => {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useDocuments();
    const { mutate } = useDeleteDocument();

    const handleSwitchModal = () => {
        setOpen(!open);
    };

    const handleDeleteButtonClick = record => {
        mutate(record["document_id"]);
    };

    const handleViewButtonClick = record => {
        setDocument(record['document_id']);
    };

    const columns = getColumns(handleViewButtonClick, handleDeleteButtonClick);

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                title={() => (
                    <Flex justify="space-between">
                        <Typography.Title strong level={5}>
                            Lista completa
                        </Typography.Title>
                        <Button icon={<UploadOutlined />} type="primary" onClick={handleSwitchModal}>Enviar</Button>
                    </Flex>
                )}
                rowKey="document_id"
                loading={isLoading}
                pagination={false}
            />
            <DocumentSubmit open={open} setOpen={handleSwitchModal} />
        </>
    );
};

export default DocumentPanel;
