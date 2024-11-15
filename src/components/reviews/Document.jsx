import React from 'react';
import { useParams } from 'react-router-dom';

const Document = () => {
    const { document_id } = useParams();

    return <iframe
        src={'http://localhost:8000/document/file/' + document_id}
        width="100%"
        height="800px"
        title="PDF" />;
};

export default Document;