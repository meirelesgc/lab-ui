import React from "react";
import Banner from "./Banner";
import { Flex } from "antd";
import ResourcesPanel from './tables/ResourcesPanel'

const MainContent = ({ selectedItem, setSelectedItem }) => {
    return <div style={{ flex: 1 }}>
        <Flex vertical gap="2.3rem">
            <Banner selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <ResourcesPanel selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </Flex>
    </div>;
}
export default MainContent;