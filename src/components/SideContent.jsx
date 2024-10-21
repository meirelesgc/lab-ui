import { Flex } from "antd";
import React from "react";
import ContentSidebar from "./ContentSidebar";
import SideContentRouter from './SideContentRouter'

const SideContent = (selectedItem, setSelectedItem) => {
    return (
        <Flex vertical gap="2.3rem" style={{ width: 350 }}>
            <ContentSidebar />
            <SideContentRouter selectedItem={selectedItem} />
        </Flex>
    )
}
export default SideContent;