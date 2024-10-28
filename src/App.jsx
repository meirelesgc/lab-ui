import React from "react";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";

import "./App.css";

const { Sider, Header, Content, Footer } = Layout;

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
          <Outlet />
        </Content>

        <Footer className="footer">
          {'<EM OBRAS>'}
        </Footer>


      </Layout>
    </Layout>
  );
}

export default App;
