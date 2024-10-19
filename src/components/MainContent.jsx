import React from "react";
import Banner from "./Banner";
import { Flex } from "antd";
import PageContent from "./PageContent"

const MainContent = ({ selectedItem, setSelectedItem }) => {
    return <div style={{ flex: 1 }}>
        <Flex vertical gap="2.3rem">
            <Banner selectedItem={selectedItem} />
            <PageContent selectedItem={selectedItem} />
        </Flex>
    </div>;
}
export default MainContent;