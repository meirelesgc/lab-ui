import React from "react";
import { openAiClient } from "../../hooks/useOpenAiJson"

const DocumentView = ({ document: document_id }) => {
    const { data, isLoading } = openAiClient()

    console.log(data)

    return (
        <div>123</div>
    );
};

export default DocumentView;