import { Flex, Typography, List, Button, Select } from "antd";
import { useState, useEffect } from "react";

const AttributeDisplay = ({ documentData, evaluatedDocumentData, onValuesChange }) => {
    const [selectValue, setSelectValue] = useState([]);
    const [combinedValues, setCombinedValues] = useState([]);

    useEffect(() => {
        const combined = Array.from(new Set([...documentData.values, ...evaluatedDocumentData.values]));
        setCombinedValues(combined);
        setSelectValue(evaluatedDocumentData.values);
    }, [documentData.values, evaluatedDocumentData.values]);

    const handleSelectChange = (value) => {
        setSelectValue(value);
        onValuesChange(value);
    };

    return (
        <Flex vertical gap="small">
            <Typography.Title level={2} strong>{documentData.attribute}</Typography.Title>
            <Flex vertical justify="space-between" gap="0.5rem" style={{ display: "flex", width: "100%" }}>
                <Typography.Text type="secondary" strong>Valores encontrados</Typography.Text>
                <List
                    grid={{ gutter: 16 }}
                    dataSource={documentData.values}
                    renderItem={(item, idx) => (
                        <List.Item key={idx}>
                            <Button size="large" onClick={() => handleSelectChange([item])}>
                                {item}
                            </Button>
                        </List.Item>)} />

                <Typography.Text type="secondary" strong>Valor revisado</Typography.Text>
                <Select
                    size="large"
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Selecione um valor"
                    value={selectValue}
                    onChange={handleSelectChange} >
                    {combinedValues.map((value, idx) => (
                        <Select.Option key={idx} value={value}>
                            {value}
                        </Select.Option>))}
                </Select>
            </Flex>
        </Flex>
    );
};

export default AttributeDisplay;