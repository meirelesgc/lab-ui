import React from "react";
import DocumentRouter from './content/document/DocumentRouter'
import ParametersTable from "./content/ParametersTable";
import PatientsTable from "./content/PatientsTable";

const contentRender = ({ selectedItem }) => {
    switch (selectedItem) {
        case 'document_sider_key':
            return <DocumentRouter />;
        case 'parameters_sider_key':
            return <ParametersTable />;
        case 'patients_sider_key':
            return <PatientsTable />;
        default:
            return <div>Page Not Found</div>;
    }
};

const PageContent = ({ selectedItem }) => {
    return contentRender(selectedItem);
};

export default PageContent;
