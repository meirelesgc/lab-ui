import { Button, Card, Flex, Typography } from "antd";
import React from "react";

// <Typography.Title level={2} strong>
//     {getTitle()} 
// </Typography.Title>
// <Typography.Text type="secondary" strong>
//     texto referente a {selectedItem}
// </Typography.Text>

const ArchiveCard = () => (
    <>
        <Typography.Title level={2} strong>
            Arquivo
        </Typography.Title>
        <Typography.Text type="secondary" strong>
            Texto do arquivo
        </Typography.Text>
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
                <Flex gap='large'>
                    <Button type="primary" size="large">botão 9763</Button>
                    <Button size="large">botão 5980</Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default Banner;
