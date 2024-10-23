import React, { useState } from "react";
import DocumentTable from './DocumentTable'
import DocumentView from './DocumentView'

const renderContent = ({ document, setDocument }) => {
    if (document) {
        return <DocumentView document={document} />
    } else {
        return <DocumentTable setDocument={setDocument} />
    }
};

const DocumentContent = () => {
    const [document, setDocument] = useState(null);

    return renderContent({ document, setDocument });
};

export default DocumentContent;
