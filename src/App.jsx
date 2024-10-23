import { Button, Flex, Layout } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React from "react";
import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";
import './App.css'
import { Outlet } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">

        <Sidebar />
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
            <Outlet />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
