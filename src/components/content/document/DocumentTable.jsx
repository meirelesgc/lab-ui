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
        title: "",
        dataIndex: "status",
        key: "status",
        render: status => statusIconMap[status],
        width: "5%",
        align: "center"
    },
    {
        title: "Código",
        dataIndex: "document_id",
        key: "document_id",
        width: "30%"
    },
    {
        title: "Nome do arquivo",
        dataIndex: "name",
        key: "name",
        render: text => text.slice(0, -4)
    },
    {
        title: "Data e Hora",
        dataIndex: "created_at",
        key: "created_at",
        render: text => {
            const date = new Date(text);
            const formattedDate = date.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
            const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            return `${formattedDate} ${formattedTime}`;
        },
        width: "15%",
        align: "center"
    }
    ,
    {
        title: "Opções",
        key: "action",
        render: record => (
            <ActionButtons
                record={record}
                handleViewButtonClick={handleViewButtonClick}
                handleDeleteButtonClick={handleDeleteButtonClick}
            />
        ),
        width: "5%",
        align: "center"
    }
];

const DocumentPanel = ({ setSelectedItem }) => {
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
        console.log(record);
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
