import React from "react";


const sideContentRender = (selectedItem) => {
    switch (selectedItem) {
        case 'document_sider_key':
            return <DocumentRouter />;
        default:
            return <div>Page Not Found</div>;
    }
};

const PageContent = ({ selectedItem }) => {
    return sideContentRender(selectedItem);
};

export default PageContent;
