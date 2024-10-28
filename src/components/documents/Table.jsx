import { Table, Typography } from "antd";
import { useNavigate } from 'react-router-dom';

import useDocuments from "../../hooks/useDocuments";
import useDeleteDocument from "../../hooks/useDeleteDocument";

import tableConfig from './TableConfig';

const DocTable = () => {
    const { data, isLoading } = useDocuments();
    const { mutate } = useDeleteDocument();

    const handleDeleteButton = record => {
        mutate(record["document_id"]);
    };

    const handleInspectButton = record => {
        useNavigate('/document/' + record.document_id);
    };

    return (
        <Table
            bordered
            columns={tableConfig(handleInspectButton, handleDeleteButton)}
            dataSource={data}
            title={() => <Typography.Text>Documentos</Typography.Text>}
            rowKey="document_id"
            loading={isLoading}
            pagination={false} />
    );
};

export default DocTable;