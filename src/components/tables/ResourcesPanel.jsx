import React from "react";
import DocumentPanel from './DocumentPanel';
import AttributeTable from './AttributeTable';
import PatientTables from './PatientTables';

const ResourcesPanel = ({ selectedItem, setSelectedItem }) => {
    const renderTableContent = () => {
        switch (selectedItem) {
            case 'document_sider_key':
                return <DocumentPanel selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
            case 'attributs_sider_key':
                return <AttributeTable selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
            case 'patients_sider_key':
                return <PatientTables selectedItem={selectedItem} setSelectedItem={setSelectedItem} />;
        }
    };

    return renderTableContent();
}

export default ResourcesPanel;