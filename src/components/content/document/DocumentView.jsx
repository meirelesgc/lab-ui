import React from "react";
import { Flex } from "antd";

const DocumentView = ({ document: document_id }) => {
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