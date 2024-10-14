import React from "react";
import DocumentTable from './DocumentTable';
import AttributeTable from './AttributeTable';
import PatientTables from './PatientTables';

const CustomTable = ({ selectedItem }) => {
    const renderTableContent = () => {
        switch (selectedItem) {
            case 'document_sider_key':
                return <DocumentTable />;
            case 'attributs_sider_key':
                return <AttributeTable />;
            case 'patients_sider_key':
                return <PatientTables />;
            default:
                return <DocumentTable />;
        }
    };

    return renderTableContent();
}

export default CustomTable;