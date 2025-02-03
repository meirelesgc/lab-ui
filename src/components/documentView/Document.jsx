import React from 'react';

const Document = ({ document_id }) => {
    return <iframe src={'http://150.164.52.61:5173/api/document/file/' + document_id} width="100%" height="100%" title="PDF"
        style={{ border: 'none', margin: 0, padding: 0, overflow: 'hidden' }}
    />;
};

export default Document;
