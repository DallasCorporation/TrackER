import React from "react";
import {
    createFromIconfontCN,
    GithubOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from './Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';
import { Row } from "antd";
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
                    path: '/Profile',
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
            menu={{ defaultOpenAll: true }}
            waterMarkProps={{
                content: 'TrackER',
            }}
            headerRender={() =>
                <Row justify="center" style={{ marginTop: "15px", }}>
                    <Row style={{ width: "95%", backgroundColor: "white", borderRadius: "10px", }} align="middle" justify="center">ß

                    </Row>
                </Row>
            }
            footerRender={() =>
                <DefaultFooter style={{ backgroundColor: "#f7fafd", }}
                    copyright="2022 by TrackER"
                    links={[
                        {
                            key: 'github',
                            title: <GithubOutlined />,
                            href: 'https://github.com/DallasCorporation/TrackER',
                            blankTarget: true,
                        },]}

                />
            }
            menuFooterRender={(props) => {
                return (
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
                );
            }}
            menuItemRender={(item, dom) => (
                <p onClick={() => {
                    setPathname(item.path || '/Dashboard');
                    navigate(item.path, { replace: true });
                }}
                >
                    {dom}
                </p>
            )}
            {...settings}
        >
            <Routes >
                <Route path="*" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/buildings" element={<BuildingsTab />} />
                <Route path="/Profile/Edit" element={<Account updateRoute={(val) => { setPathname(val); navigate(val) }}  />} />
                <Route path="/Profile/Notification" element={<Account updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Security" element={<Account updateRoute={(val) => { setPathname(val); navigate(val) }}  />} />
                <Route path="/Profile/Password" element={<Account updateRoute={(val) => { setPathname(val); navigate(val) }}  />} />
            </Routes>
        </ProLayout >
    );
}

export default () => <DashboardRoute />;
