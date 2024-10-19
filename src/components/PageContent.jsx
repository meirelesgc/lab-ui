import React from "react";
import DocumentRouter from './content/document/DocumentRouter'

const contentRender = (selectedItem) => {
    switch (selectedItem) {
        case 'document_sider_key':
            return <DocumentRouter />;
        case 'parameters_sider_key':
            return <div>About Page</div>;
        case 'patients_sider_key':
            return <div>Contact Page</div>;
        default:
            console.log(selectedItem)
            return <div>Page Not Found</div>;
    }
};

const PageContent = ({ selectedItem }) => {
    return contentRender(selectedItem);
};

export default PageContent;
