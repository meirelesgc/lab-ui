import React from "react";
import { Table } from "antd";
import useParameters from "../../hooks/useParameters";

const ParametersTable = () => {
    const { data, isLoading } = useParameters();

    const columns = [
        {
            dataIndex: 'parameter_id',
            key: 'parameter_id',
        },
        {
            dataIndex: 'parameter',
            key: 'parameter',
        },
        {
            dataIndex: 'synonyms',
            key: 'synonyms',
        },
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            loading={isLoading}
            rowKey="parameter_id"
            bordered
        />
    );
};

export default ParametersTable;
