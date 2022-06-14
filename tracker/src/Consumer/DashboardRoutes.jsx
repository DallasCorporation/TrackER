import React from "react";
import {
    createFromIconfontCN,
    SmileOutlined,
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from './Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
import { ProLayout } from '@ant-design/pro-components';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_a38j8mygyq9.js',
});

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
                },
                {
                    path: '/Buildings',
                    name: 'Buildings',
                    icon: <SmileOutlined />,
                },
                {
                    path: '/Invoices',
                    name: 'Invoices',
                    icon: <SmileOutlined />,
                    routes: [
                        {
                            path: '/Invoices/week',
                            name: 'Weekly',
                        },
                        {
                            path: '/Invoices/month',
                            name: 'Monthly',
                        },
                        {
                            path: '/Invoices/year',
                            name: 'Yearly',
                        },
                    ],
                },
                {
                    path: '/Account',
                    name: 'Profile',
                    icon: <SmileOutlined />,
                    routes: [
                        {
                            path: '/Profile/Edit',
                            name: 'Personal Information',
                        },
                        {
                            path: '/Profile/Notification',
                            name: 'Notification',
                        },
                        {
                            path: '/Profile/Security',
                            name: 'Security Settings',
                        },
                        {
                            path: '/Profile/Password',
                            name: 'Change Password',
                        },
                    ],
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
            //logo={<p></p>}

            title="TrackER"
            {...defaultProps}
            location={{ pathname, }}
            navTheme="light"
            waterMarkProps={{
                content: 'TrackER',
            }}
            menuFooterRender={(props) => {
                return (
                    <a
                        style={{
                            lineHeight: '48px',
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
