import React from "react";
import tableConfig from './TableConfig'
import { Table, Typography } from "antd";

import useParameters from '../../hooks/useParameters'
import useDeleteParameter from '../../hooks/useDeleteParameter'

const ParamTable = () => {
    const { mutate: deleteParameter } = useDeleteParameter();
    const { data, isLoading } = useParameters();

    const handleDeleteButtonClick = (record) => {
        deleteParameter(record.parameter_id);
    };

    const columns = tableConfig(handleDeleteButtonClick);

    return <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => <Typography.Text>Paramêtros</Typography.Text>}
        rowKey="parameter_id"
        loading={isLoading}
        pagination={false} />
};

export default ParamTable;