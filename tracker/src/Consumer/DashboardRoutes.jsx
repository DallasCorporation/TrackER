import { Layout, Menu } from 'antd';
import React from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
// import "./Dashboard.less"
const { Header, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
    getItem('My buildings', 'buildings', <DesktopOutlined />),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Account', 'account', <FileOutlined />),
];

const DashboardRoute = () => {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    };
    let navigate = useNavigate();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Header className="header">
                <div className="logo" style={{ color: "white" }} >LOGO</div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={[]} />
            </Header>
            <Layout>
                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={(e) => { navigate(e.key, { replace: true }); }} />
                </Sider>
                <Layout className="site-layout">
                    <Routes>
                        <Route path="*" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/buildings" element={<Dashboard />} />
                        <Route path="/account" element={<Dashboard />} />
                    </Routes>
                </Layout>
            </Layout>

        </Layout>
    );
}

export default () => <DashboardRoute />;
