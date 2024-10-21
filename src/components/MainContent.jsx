import React from "react";
import Banner from "./Banner";
import { Flex } from "antd";
import ContentRouter from "./ContentRouter"

const MainContent = (selectedItem) => {
    return <div style={{ flex: 1 }}>
        <Flex vertical gap="2.3rem">
            <Banner selectedItem={selectedItem} />
            <ContentRouter selectedItem={selectedItem} />
        </Flex>
    </div>;
}
export default MainContent;