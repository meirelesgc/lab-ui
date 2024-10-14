import React from "react";
import ArchiveTable from './ArchiveTable';
import AttributeTable from './AttributeTable';
import PatientTables from './PatientTables';

const CustomTable = ({ selectedItem }) => {
    const renderTableContent = () => {
        switch (selectedItem) {
            case 'archive_sider_key':
                return <ArchiveTable />;
            case 'attributs_sider_key':
                return <AttributeTable />;
            case 'patients_sider_key':
                return <PatientTables />;
            default:
                return <ArchiveTable />;
        }
    };

    return renderTableContent();
}

export default CustomTable;