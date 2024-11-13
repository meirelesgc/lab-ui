import React from "react";
import { Flex } from "antd";
import { useParams } from "react-router-dom";

const InspectDocument = () => {
    const { id: document_id } = useParams();

    return (
        <Flex style={{ height: '100vh' }} vertical>
            <iframe
                src={'http://127.0.0.1:8000/file/' + document_id}
                title="PDF exibido"
                allowFullScreen
                loading="lazy"
                className="iframe"
            />
        </Flex>
    );
};

export default InspectDocument;
