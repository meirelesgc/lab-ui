import React, { useState } from "react";
import { Table, Space, Typography, Input, Button } from "antd";

import usePatient from '../../hooks/usePatients';
import useCreatePatient from '../../hooks/useCreatePatient';
import useDeletePatient from '../../hooks/useDeletePatient';

const ActionButtons = ({ record, handleDeleteButtonClick }) => (
    <Space justify='center'>
        <Button type='link' onClick={() => handleDeleteButtonClick(record)}>
            Excluir
        </Button>
    </Space>
);

const getColumns = (handleDeleteButtonClick) => [
    {
        title: 'Identificador',
        dataIndex: 'patient_id',
        key: 'patient_id',
        width: '20%',
        ellipsis: true
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "Ações",
        key: "action",
        render: (text, record) => (
            <ActionButtons
                record={record}
                handleDeleteButtonClick={handleDeleteButtonClick}
            />
        ),
        width: '15%',
        align: 'center'
    }
];

const PatientsTable = () => {
    const { mutate: createPatient } = useCreatePatient();
    const { mutate: deletePatient } = useDeletePatient();
    const { data, isLoading } = usePatient();
    const [newPatient, setNewPatient] = useState("");

    const handleInputChange = (e) => {
        setNewPatient(e.target.value);
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (!newPatient) return;
        createPatient(newPatient);
        setNewPatient("");
    };

    const handleDeleteButtonClick = (record) => {
        deletePatient(record['patient_id']);
    };

    const columns = getColumns(handleDeleteButtonClick);

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography.Title strong level={5}>
                        Lista de Pacientes
                    </Typography.Title>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Input
                            allowClear
                            value={newPatient}
                            onChange={handleInputChange}
                            onPressEnter={handleInputSubmit}
                            placeholder="Nome do paciente"
                        />
                        <Button type="primary" onClick={handleInputSubmit}>
                            Adicionar
                        </Button>
                    </div>
                </div>
            )}
            rowKey="patient_id"
            loading={isLoading}
            pagination={false}
        />
    );
};

export default PatientsTable;
