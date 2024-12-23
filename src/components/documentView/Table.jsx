import { Table, Typography } from 'antd';
import { useState } from 'react';
import tableConfig from './TableConfig';

const CustomTable = ({ rawData, setEvalData, evalData }) => {
    const handleEvalChange = (param, newValues) => {
        const updatedEvalData = {
            ...evalData,
            [param]: newValues,
        };
        setEvalData(updatedEvalData);
    };

    const documentData = Object.keys(rawData.document_data.document_data).map(key => ({
        param: key,
        rawData: rawData.document_data.document_data[key],
        evalData: evalData[key] || [],
    }));

    const columns = tableConfig(handleEvalChange);

    return (
        <Table
            dataSource={documentData}
            columns={columns}
            bordered
            title={() => <Typography.Text>Altere como achar apropriado</Typography.Text>}
            rowKey="param"
            pagination={false}
        />
    );
};

export default CustomTable;
