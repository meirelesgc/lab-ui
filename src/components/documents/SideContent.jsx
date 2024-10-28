import React, { useState } from 'react';
import { Flex, Card, Typography, List, Button } from 'antd';
import { useParams } from 'react-router-dom';
import useCreateOpenAiJson from '../../hooks/useCreateOpenAiJson';
import useOpenAiJson from '../../hooks/useOpenAiJson';

const SideContent = () => {
    const { id: document_id } = useParams();
    const { data, isLoading } = useOpenAiJson(document_id);

    const renderValue = (value) => {
        if (typeof value === 'object' && value !== null)
            return <List
                size="small"
                bordered
                dataSource={Object.entries(value)}
                renderItem={([nestedKey, nestedValue]) => (
                    <List.Item>
                        <strong>{nestedKey}:</strong> {renderValue(nestedValue)}
                    </List.Item>
                )} />
        return String(value);
    };

    const renderJson = () => {
        if (data)
            return <Flex vertical gap='middle'>
                <List
                    header={<div>Dados encontrados</div>}
                    bordered
                    dataSource={Object.entries(data['document_json'])}
                    renderItem={([key, value]) => (
                        <List.Item>
                            <strong>{key}:</strong> {renderValue(value)}
                        </List.Item>
                    )}
                    loading={isLoading} />
                <Flex justify='flex-end' gap='middle'>
                    <Button
                        type='primary'
                        onClick={handleRefill} >
                        Refazer
                    </Button>
                    <Button>
                        Concluir
                    </Button>
                </Flex>
            </Flex>
    };

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
            {renderJson()}
        </Flex>
    );
};

export default SideContent;
