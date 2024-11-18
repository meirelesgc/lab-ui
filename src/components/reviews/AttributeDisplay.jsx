import { Flex, Typography, Tooltip, List, Button, Select } from "antd";
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
    console.log(documentData)
    return (
        <Flex vertical gap="small">
            <Typography.Title level={2} strong>{documentData.attribute}</Typography.Title>
            <Flex vertical justify="space-between" gap="0.5rem" style={{ display: "flex", width: "100%" }}>
                <Typography.Text type="secondary" strong>Valores encontrados</Typography.Text>
                {documentData.values.length > 0 ? (
                    <List
                        grid={{ gutter: 16 }}
                        dataSource={documentData.values}
                        split
                        renderItem={(item, idx) => (
                            <List.Item key={idx}>
                                <Tooltip title={item}>
                                    <Button size="large" onClick={() => handleSelectChange([item])} style={{ overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-word", display: "block", maxWidth: "370px" }} >
                                        {item}
                                    </Button>
                                </Tooltip>
                            </List.Item>
                        )} />) : (<Typography.Text type="secondary" strong>Não encontramos esse dado...</Typography.Text>)}

                <Typography.Text type="secondary" strong>Valor revisado</Typography.Text>
                <Select
                    size="large"
                    mode="tags"
                    style={{ width: "100%", maxWidth: "370px" }}
                    placeholder="Selecione um valor"
                    value={selectValue}
                    onChange={handleSelectChange} >
                    {combinedValues.map((value, idx) => (
                        <Select.Option key={idx} value={value} >
                            {value}
                        </Select.Option>))}
                </Select>
            </Flex>
        </Flex>
    );
};

export default AttributeDisplay;