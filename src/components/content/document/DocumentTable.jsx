import React, { useState } from "react";
import { Table, Button, Flex, Typography, message } from "antd";
import {
    PlusOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    FileSearchOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import useDocuments from "../../../hooks/useDocuments";
import useDeleteDocument from "../../../hooks/useDeleteDocument"
import DocumentSubmit from './DocumentSubmit'

const statusIconMap = {
    STANDBY: <ClockCircleOutlined />,
    "IN-PROCESS": <SyncOutlined />,
    FAILED: <CloseCircleOutlined />,
    DONE: <CheckCircleOutlined />
};

const ActionButtons = ({ record, handleViewButtonClick, handleDeleteButtonClick }) => (
    <Flex align="center" justify="flex-end" gap="middle">
        <Button
            icon={<FileSearchOutlined />}
            type="primary"
            disabled={record.status !== "STANDBY" && record.status !== "DONE"}
            onClick={() => handleViewButtonClick(record)}
        />
        <Button icon={<DeleteOutlined />} onClick={() => handleDeleteButtonClick(record)} />
    </Flex>
);

const getColumns = (handleViewButtonClick, handleDeleteButtonClick) => [
    {
        dataIndex: "status",
        key: "status",
    },
    {
        dataIndex: "document_id",
        key: "document_id",
    },
    {
        dataIndex: "name",
        key: "name",
    },
    {
        dataIndex: "created_at",
        key: "created_at",
    }
    ,
    {
        key: "action",
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
        message.success("Documento removido com sucesso!");
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
                    <Flex justify="space-between" gap="middle" align="center">
                        <Typography.Title strong level={5}>
                            Lista completa
                        </Typography.Title>
                        <Button icon={<PlusOutlined />} type="primary" shape="circle" onClick={handleSwitchModal} />
                    </Flex>
                )}
                rowKey="document_id"
                loading={isLoading}
            />
            <DocumentSubmit open={open} setOpen={handleSwitchModal} />
        </>
    );
};

export default DocumentPanel;
