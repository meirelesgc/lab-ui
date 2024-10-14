import { Button, Flex, Typography } from "antd";
import React from "react";

const PatientTable = () => {
    return <>
        <Flex align="center" justify="space-between">
            <Typography.Title level={3} strong className="primary--color">
                Patient
            </Typography.Title>
            <Button type='link' className="gray--color"></Button>
        </Flex>
    </>;
}

export default PatientTable