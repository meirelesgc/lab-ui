import { Button, Flex, Typography } from "antd";
import React from "react";

const AttributeTable = () => {
    return <>
        <Flex align="center" justify="space-between">
            <Typography.Title level={3} strong className="primary--color">
                Attribute
            </Typography.Title>
            <Button type='link' className="gray--color"></Button>
        </Flex>
    </>;
}

export default AttributeTable