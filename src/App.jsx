import React from "react";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";

import "./App.css";
import CustomDrawer from "./components/Drawer";

const { Sider, Header, Content, Footer } = Layout;

const App = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  const switchDrawer = () => {
    setDrawerCollapsed(!drawerCollapsed)
  }

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={siderCollapsed} className="sider">

        <CustomDrawer collapsed={drawerCollapsed} />
        <Sidebar />

        <Button
          type="text"
          icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setSiderCollapsed(!siderCollapsed)}
          className="triger-bnt" />

      </Sider>

      <Layout>
        <Header className="header">
          <CustomHeader switchDrawer={switchDrawer} />
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
