import { Flex, Button } from 'antd';
import ContentSidebar from "./ContentSidebar";
import { useParams } from "react-router-dom";
import useOpenAiJson from '../hooks/useOpenAiJson';
import { List } from 'antd';

const SideContent = () => {
    const { document_id } = useParams();
    const { data, isLoading } = useOpenAiJson(document_id);

    const renderValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return <List
                size="small"
                bordered
                dataSource={Object.entries(value)}
                renderItem={([nestedKey, nestedValue]) => (
                    <List.Item>
                        <strong>{nestedKey}:</strong> {String(nestedValue)}
                    </List.Item>
                )} />

        }
        return String(value);
    };

    const renderJson = () => {
        if (data) {
            return <Flex vertical gap='middle'>
                <List
                    header={<div>Dados encontrados</div>}
                    bordered
                    dataSource={Object.entries(data['document_json'])}
                    renderItem={([key, value]) => (
                        <List.Item>
                            <strong>{key}:</strong> {renderValue(value)}
                        </List.Item>)}
                    loading={isLoading} />
                <Flex justify='flex-end' gap='middle'>
                    <Button type='primary'>Refazer</Button>
                    <Button >Concluir</Button>
                </Flex>
            </Flex >
        }
    };

    return (
        <Flex vertical gap="2.3rem" style={{ width: 350 }}>
            <ContentSidebar />
            {renderJson()}
        </Flex>
    );
};

export default SideContent;
