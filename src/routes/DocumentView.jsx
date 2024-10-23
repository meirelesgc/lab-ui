import React from "react";
import { useParams } from "react-router-dom";
import { Flex } from "antd";

const DocumentView = () => {
    const { document_id } = useParams();

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

export default DocumentView;
