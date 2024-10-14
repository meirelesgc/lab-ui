import React from "react";
import Banner from "./Banner";
import { Flex } from "antd";
import CustomTable from './tables/CustomTable'

const MainContent = ({ selectedItem }) => {
    return <div style={{ flex: 1 }}>
        <Flex vertical gap="2.3rem">
            <Banner selectedItem={selectedItem} />
            <CustomTable selectedItem={selectedItem} />
        </Flex>
    </div>;
}
export default MainContent;