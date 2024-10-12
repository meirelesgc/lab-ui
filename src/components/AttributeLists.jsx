import { Button, Flex, Typography } from "antd";
import React from "react";

const AttributeLists = () => {
    return <>
        <Flex align="center" justify="space-between">
            <Typography.Title level={3} strong className="primary--color">
                My List
            </Typography.Title>
            <Button type='link' className="gray--color"></Button>
        </Flex>
        <Flex align="center" gap="large">
            {/* logica para listar os parametros */}
        </Flex>
    </>;
}

export default AttributeLists