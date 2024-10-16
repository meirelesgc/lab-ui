import React from "react";
import { Card, Flex, Typography } from "antd";

const CustomCard = ({ title, description }) => (
    <Flex vertical gap="middle">
        <Typography.Title level={2} strong>
            {title}
        </Typography.Title>

        <Typography.Text type="secondary" strong>
            {description}
        </Typography.Text>
    </Flex>
);


const Banner = ({ selectedItem, setSelectedItem }) => {

    return (
        <Card style={{ height: 180, padding: '20px' }}>
            <Flex vertical gap='30px'>
                <Flex vertical align="flex-start">
                    <CustomCard title="Adicione e gerencie os documentos" description="Acompanhe aqui os diferentes estágios do processamento" />
                </Flex>
            </Flex>
        </Card>
    );
};

export default Banner;
