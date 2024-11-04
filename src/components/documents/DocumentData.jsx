import React, { useState } from 'react';
import useOpenAiJson from '../../hooks/useOpenAiJson';
import { Pagination } from 'antd'; // Importa o componente Pagination do Ant Design
import './DocumentData.css'; // Importar um arquivo CSS para estilização

const DocumentData = ({ id: document_id }) => {
    const { data, isLoading } = useOpenAiJson(document_id);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Número de itens por página

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data || !data.document_json) {
        return <div>No data available</div>;
    }

    const documentEntries = Object.entries(data.document_json);
    const totalItems = documentEntries.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = documentEntries.slice(startIndex, endIndex);

    return (
        <div className="card-container">
            {currentItems.map(([key, value]) => (
                <div key={key} className="card">
                    <h3>{key}</h3>
                    <p>{value !== null ? value : 'N/A'}</p>
                </div>
            ))}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: '16px', textAlign: 'center' }} // Centraliza a paginação
            />
        </div>
    );
};

export default DocumentData;
