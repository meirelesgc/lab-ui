import React, { useState } from 'react';
import { Card, Spin, Collapse, Button, Input } from 'antd';
import useOpenAiJson from '../../hooks/useOpenAiJson';

const { Panel } = Collapse;

const renderJsonInCards = (json, setJson, path = []) => {
    return Object.entries(json).map(([key, value]) => {
        const currentPath = [...path, key];

        const handleChange = (newValue) => {
            const updatedJson = { ...json };
            let obj = updatedJson;
            currentPath.slice(0, -1).forEach((p) => {
                obj = obj[p];
            });
            obj[currentPath[currentPath.length - 1]] = newValue;
            setJson(updatedJson);
        };

        if (typeof value === 'object' && value !== null) {
            return (
                <Collapse key={key} style={{ marginBottom: '8px' }}>
                    <Panel header={key} key={key}>
                        {renderJsonInCards(value, setJson, currentPath)}
                    </Panel>
                </Collapse>
            );
        }
        return (
            <Card key={key} style={{ marginBottom: '8px' }}>
                <strong>{key}:</strong>
                <Input
                    defaultValue={value !== null ? value.toString() : ''}
                    onChange={(e) => handleChange(e.target.value)}
                    style={{ marginTop: '8px' }}
                />
            </Card>
        );
    });
};

const paginateJson = (json, entriesPerPage, page) => {
    const entries = Object.entries(json);
    const start = (page - 1) * entriesPerPage;
    const paginatedEntries = entries.slice(start, start + entriesPerPage);
    return Object.fromEntries(paginatedEntries);
};

const DocumentData = ({ id: document_id }) => {
    const { data, isLoading } = useOpenAiJson(document_id);
    const entriesPerPage = 10;
    const [page, setPage] = useState(1);
    const [jsonData, setJsonData] = useState(data?.document_json || {});

    if (isLoading) {
        return <Spin />;
    }

    if (!data || !data.document_json) {
        return <p>Nenhum dado disponível</p>;
    }

    const paginatedJson = paginateJson(jsonData, entriesPerPage, page);

    return (
        <Card title="Documento JSON" style={{ width: '100%' }}>
            {renderJsonInCards(paginatedJson, setJsonData)}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Anterior
                </Button>
                <span>Página {page}</span>
                <Button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={Object.keys(paginatedJson).length < entriesPerPage}>
                    Próxima
                </Button>
            </div>
            <Button style={{ marginTop: '16px' }} onClick={() => console.log(jsonData)}>
                Enviar
            </Button>
        </Card>
    );
};

export default DocumentData;
