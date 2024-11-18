import { MessageOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import React from "react";

const CustomHeader = () => {
    return <Flex align="center" justify="space-between">
        <Typography.Title level={3} type="secondary">
            IaDocs, Apoio ao DAM
        </Typography.Title>

        <Flex align="center" gap="3rem">
            {/* Implementar busca dentro de documentos, pacientes e parametros */}
            <Search placeholder="<EM OBRAS>" allowClear />

            <Flex align="center" gap="10px">
                <MessageOutlined className="header-icon" />
                <NotificationOutlined className="header-icon" />
                <Avatar icon={<UserOutlined />} className="header-icon" />
            </Flex>
        </Flex>
    </Flex>;
}
export default CustomHeader