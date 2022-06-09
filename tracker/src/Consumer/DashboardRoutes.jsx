import { Affix, Button, Layout, Menu, Row } from 'antd';
import React from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    RightOutlined,
    LeftOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from './Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined  style={{fontSize:"20px"}}/>),
    getItem('Buildings', 'buildings', <DesktopOutlined    style={{fontSize:"20px"}}/>),
    getItem('Account', 'account', <UserOutlined   style={{fontSize:"20px"}}/>),
];
const items2 = [
    getItem('Settings', 'settings',  <SettingOutlined   style={{fontSize:"20px"}}/>),
];

const DashboardRoute = () => {
    const [collapsed, setCollapsed] = useState(true)
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    };
    let navigate = useNavigate();
    return (
        <div>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Affix style={{ position: "absolute", top: 150, left: collapsed? 80:140, zIndex: 2}}>
                    <Button size='small' shape='circle' icon={collapsed ? <RightOutlined style={{ fontSize: "10px" }} /> : <LeftOutlined style={{ fontSize: "10px" }} />}
                        onClick={()=>onCollapse(!collapsed)}
                    />
                </Affix>
                <Layout hasSider style={{ margin: "10px 0px 10px 10px", }}>
                    <Sider theme="light" trigger={null} collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "1px 1px 5px 2px rgba(111,106,249,0.25)", verticalAlign: "middle", backgroundColor: "#6f6af9", }} width={145}>
                        <p>Icon</p>
                        <Row style={{ minHeight: "80vh", justifyContent: 'center', alignItems: 'center', backgroundColor: "#6f6af9" }} >
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={(e) => { navigate(e.key, { replace: true }); }} style={{ backgroundColor: "#6f6af9" }} />
                        </Row>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items2} onSelect={(e) => { navigate(e.key, { replace: true }); }} style={{ backgroundColor: "#6f6af9" }} />
                    </Sider>
                    <Layout className="site-layout" style={{ padding: 10 }}>
                        <Routes>
                            <Route path="*" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/buildings" element={<BuildingsTab />} />
                            <Route path="/account" element={<Account />} />
                        </Routes>
                    </Layout>
                </Layout>
            </Layout >
        </div>
    );
}

export default () => <DashboardRoute />;
