import React from 'react';
import { Flex, Card, Typography } from 'antd';

const SideContent = () => {

    return (
        <Flex vertical gap='2.3rem' style={{ width: 350 }}>
            <Card className='card'>
                <Typography.Title level={3}>
                    {'<Titulo>'}
                </Typography.Title>

                <Typography.Text>
                    {'<Texto>'}
                </Typography.Text>
            </Card>
        </Flex>
    );
};

export default SideContent;
