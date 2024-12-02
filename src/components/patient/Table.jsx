import React from "react";
import { Table, Typography } from "antd";
import tableConfig from "./TableConfig";

import usePatient from '../../hooks/usePatients';
import useDeletePatient from '../../hooks/useDeletePatient';

const PatientTable = () => {
    const { mutate } = useDeletePatient();
    const { data, isLoading } = usePatient();


    const handleDeleteButtonClick = (record) => {
        mutate(record.patient_id);
    };

    const columns = tableConfig(handleDeleteButtonClick);

    return <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => <Typography.Text>Pacientes</Typography.Text>}
        rowKey="patient_id"
        loading={isLoading}
        pagination={false}
    />
};

export default PatientTable;