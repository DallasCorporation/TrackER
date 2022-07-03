import React from "react";
import { GithubOutlined, } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from './Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';
import Header from "./Header/Header";
import { useSelector } from "react-redux";
import AddNewBuildings from "./Building/AddNewBuilding";
import { Avatar, Col, Row } from "antd";


const DashboardRoute = () => {
    let navigate = useNavigate();
    const user = useSelector((state) => state.user.user)
    let defaultProps = {
        route: {
            path: '/',
            routes: [
                {
                    path: '/Dashboard',
                    name: 'Dashboard',
                    icon: <span class="anticon iconfont">&#x100d9;</span>
                },
                {
                    path: '/Buildings',
                    name: 'Buildings',
                    icon: <span class="anticon iconfont" >&#x100dc;</span>
                },
                {
                    path: '/Building/New',
                    name: 'Add new Building',
                    icon: <span class="anticon iconfont" >&#x100da;</span>
                },
                {
                    path: '/Invoices',
                    name: 'Invoices',
                    icon: <span class="anticon iconfont" >&#x100e6;</span>,
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
                    icon: <span class="anticon iconfont" >&#x100e5;</span>,
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
                            path: '/Profile/Activity',
                            name: 'Activity Monitor',
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
    const [settings, setSetting] = useState({ fixSiderbar: true, });
    const [pathname, setPathname] = useState('/Dashboard');
    return (
        <ProLayout
            //logo={<p></p>}
            title="TrackER"
            {...defaultProps}
            location={{ pathname, }}
            navTheme="light"
            menu={{ defaultOpenAll: true }}
            waterMarkProps={{ content: 'TrackER', }}
            headerRender={() => <Header />}
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
                    <Row
                        align="middle"
                        type="flex"
                        justify="space-around"
                    >
                        <Col >
                            <Avatar />
                        </Col>
                        <Col >
                            <p>{user.name} {user.surname}</p>
                            <p>View Profile</p>
                        </Col>
                    </Row>

                );
            }}
            menuItemRender={(item, dom) => (
                <p
                    onClick={() => {
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
                <Route path="*" element={<Dashboard user={user} />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/buildings" element={<BuildingsTab user={user} />} />
                <Route path="/building/New" element={<AddNewBuildings user={user} />} />
                <Route path="/Profile/Edit" element={<Account user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Notification" element={<Account user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Activity" element={<Account user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Security" element={<Account user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Password" element={<Account user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
            </Routes>
        </ProLayout >
    );
}

export default () => <DashboardRoute />;
