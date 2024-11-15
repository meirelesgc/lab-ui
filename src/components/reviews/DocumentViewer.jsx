import { useState } from "react";
import { Button, Flex } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import AttributeDisplay from "./AttributeDisplay";

const DocumentViewer = ({ documentData, evaluatedDocumentData, updateEvaluatedData }) => {
    const [index, setIndex] = useState(0);

    const handleNext = (listLength) => {
        setIndex((prevIndex) => (prevIndex + 1) % listLength);
    };
    const handlePrevious = (listLength) => {
        setIndex((prevIndex) => (prevIndex - 1 + listLength) % listLength);
    };

    return (
        <Flex vertical gap="large">
            <AttributeDisplay
                documentData={documentData[index]}
                evaluatedDocumentData={evaluatedDocumentData[index]}
                onValuesChange={(newValues) => updateEvaluatedData(index, newValues)}
            />
            <Flex gap="middle" justify="flex-end">
                <Button
                    type="primary"
                    size="large"
                    onClick={() => handlePrevious(evaluatedDocumentData.length)}
                    icon={<LeftCircleOutlined />}
                />
                <Button
                    size="large"
                    onClick={() => handleNext(evaluatedDocumentData.length)}
                    icon={<RightCircleOutlined />}
                />
            </Flex>
        </Flex>
    );
};

export default DocumentViewer;
