import React from "react";
import Banner from "./Banner";
import { Flex } from "antd";
import Body from "./Bory"

const MainContent = ({ selectedItem, setSelectedItem }) => {
    return <div style={{ flex: 1 }}>
        <Flex vertical gap="2.3rem">
            <Banner selectedItem={selectedItem} />
            <Body />
        </Flex>
    </div>;
}
export default MainContent;