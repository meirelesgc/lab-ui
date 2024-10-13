import React from "react";
import { Button, Card, Flex, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, HourglassOutlined } from "@ant-design/icons";

const ArchiveCard = () => (
    <>
        <Flex vertical gap="middle">
            <Typography.Title level={2} strong>
                Adicione e gerencie os documentos
            </Typography.Title>

            <Typography.Text type="secondary" strong>
                Acompanhe aqui os diferentes estágios do processamento
            </Typography.Text>

            <Flex wrap="nowrap" gap="large">
                <Flex>
                    <Card><HourglassOutlined /></Card>
                    <Card>STANDBY</Card>
                </Flex>
                <Flex>
                    <Card><CheckCircleOutlined /></Card>
                    <Card>DONE</Card>
                </Flex>
                <Flex>
                    <Card><CloseCircleOutlined /></Card>
                    <Card>FAILED</Card>
                </Flex>
                <Flex>
                    <Card><HourglassOutlined /></Card>
                    <Card>IN-PROCESS</Card>
                </Flex>
            </Flex>
        </Flex>
    </>
);

const AttributsCard = () => (
    <>
        <Typography.Title level={2} strong>
            Arquivo
        </Typography.Title>
        <Typography.Text type="secondary" strong>
            Texto do arquivo
        </Typography.Text>
    </>
);

const PatientsCard = () => (
    <>
        <Typography.Title level={2} strong>
            Arquivo
        </Typography.Title>
        <Typography.Text type="secondary" strong>
            Texto do arquivo
        </Typography.Text>
    </>
);

const Banner = ({ selectedItem }) => {
    const getTitle = () => {
        switch (selectedItem) {
            case 'archive_sider_key':
                return <ArchiveCard />;
            case 'attributs_sider_key':
                return <AttributsCard />;
            case 'patients_sider_key':
                return <PatientsCard />;
        }
    };

    return (
        <Card style={{ height: 260, padding: '20px' }}>
            <Flex vertical gap='30px'>
                <Flex vertical align="flex-start">
                    {getTitle()}
                </Flex>
            </Flex>
        </Card>
    );
};

export default Banner;
