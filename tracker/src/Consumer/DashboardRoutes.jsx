import { Affix, Avatar, Button, Descriptions, Layout, Menu, Result, Row, Space, Statistic } from 'antd';
import React from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    UserOutlined,
    RightOutlined,
    LeftOutlined,
    SettingOutlined,
    createFromIconfontCN,
    LikeOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from './Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
import { PageContainer, ProLayout } from '@ant-design/pro-components';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_a38j8mygyq9.js',
});

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined style={{ fontSize: "20px" }} />),
    getItem('Buildings', 'buildings', <DesktopOutlined style={{ fontSize: "20px" }} />),
    getItem('Account', 'account', <UserOutlined style={{ fontSize: "20px" }} />),
    getItem('Market', 'market', <IconFont type='i-a-EnergyResources' style={{ fontSize: "38px", textAlign: "center", marginLeft: "-10px" }} />)
];
const items2 = [
    getItem('Settings', 'settings', <SettingOutlined style={{ fontSize: "20px" }} />),
];

const DashboardRoute = () => {
    let navigate = useNavigate();
    let defaultProps = {
        route: {
            path: '/',
            routes: [
                {
                    path: '/Dashboard',
                    name: 'Dashboard',
                    icon: <SmileOutlined />,
                    component: './Dashboard',
                },
                {
                    path: '/Account',
                    name: 'Account',
                    icon: <SmileOutlined />,
                    component: './Dashboard',
                },
            ],
        },
        location: {
            pathname: '/',
        },
    };
    const [settings, setSetting] = useState({ fixSiderbar: true });
    const [pathname, setPathname] = useState('/Dashboard');
    return (
        <ProLayout
            // logo={<p></p>}
            title="TrackER"
            {...defaultProps}
            location={{
                pathname,
            }}
            navTheme="light"
            waterMarkProps={{
                content: 'TrackER',
            }}
            menuFooterRender={(props) => {
                return (
                    <a
                        style={{
                            lineHeight: '48rpx',
                            display: 'flex',
                            height: 48,
                            color: 'rgba(255, 255, 255, 0.65)',
                            alignItems: 'center',
                        }}
                        href="https://preview.pro.ant.design/dashboard/analysis"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            alt="pro-logo"
                            src="https://procomponents.ant.design/favicon.ico"
                            style={{
                                width: 16,
                                height: 16,
                                margin: '0 16px',
                                marginRight: 10,
                            }}
                        />
                        {!props?.collapsed && 'Preview Pro'}
                    </a>
                );
            }}
            menuItemRender={(item, dom) => (
                <a
                    onClick={() => {
                        setPathname(item.path || '/Dashboard');
                        navigate(item.path, { replace: true });
                    }}
                >
                    {dom}
                </a>
            )}
            rightContentRender={() => (
                <div>

                    <Avatar shape="square" size="small" icon={<UserOutlined />} />
                </div>
            )}
            {...settings}
        >
            <Routes>
                <Route path="*" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/buildings" element={<BuildingsTab />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </ProLayout>
    );
}

export default () => <DashboardRoute />;
