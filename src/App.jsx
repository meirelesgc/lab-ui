import { Button, Flex, Layout } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React from "react";
import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";
import MainContent from "./components/MainContent";
import SideContent from "./components/SideContent";
import './App.css'

const { Sider, Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('document_sider_key');

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">

        <Sidebar setSelectedItem={setSelectedItem} />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="triger-bnt" />

      </Sider>
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>

        <Content className="content">
          <Flex gap='large'>
            <MainContent
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem} />
            <SideContent
              selectedItem={selectedItem} />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
