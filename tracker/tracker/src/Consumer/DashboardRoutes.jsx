import React, { useEffect } from "react";
import { GithubOutlined, } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import Account from '../Account/Account';
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';
import Header from "./Header/Header";
import { useDispatch, useSelector } from "react-redux";
import AddNewBuildings from "./Building/AddNewBuilding";
import { Avatar, Col, Row } from "antd";
import { userPreference } from "../reducers/preference";
import api from "../api";
import { LinkHover } from "../Components/CustomComponents";
import { setAllOrganization } from "../reducers/allOrganization";
import Organizations from "./Organizations/Organizations";


const DashboardRoute = () => {
    const user = useSelector((state) => state.user.user)
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const fetchPreference = async () => {
        await api.preference.fetchPreference(user._id).then(data => dispatch(userPreference(data)))
    }

    const fetchOrganization = async () => {
        await api.organization.fetch().then(res => {
            dispatch(setAllOrganization(res))
        })
    }
    useEffect(() => {
        fetchOrganization()
        fetchPreference()
    }, [user])
    const check = useSelector((state) => state.preference)
    if (check === null)
        fetchPreference()
    const userAvatar = useSelector((state) => state.preference.preference.avatar)
    const allOrganization = useSelector((state) => state.allOrganization.organization)
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
                    path: '/Organizations',
                    name: 'Organizations',
                    icon: <span class="anticon iconfont" >&#x100de;</span>
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
    const settings = { fixSiderbar: true, };
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
            headerRender={() => <Header avatar={userAvatar} />}
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
                        justify="center"
                        style={{ marginBottom: 20 }}
                        gutter={[16, 16]}
                    >
                        <Col style={{ alignSelf: "center" }}>
                            <Avatar size={40} src={userAvatar} />
                        </Col>
                        {!props.collapsed &&
                            <Col style={{ alignSelf: "center", }}>
                                <div>{user.name} {user.surname} <br></br>
                                    <LinkHover to="/Profile/Edit" >View Profile</LinkHover>
                                </div>
                            </Col>
                        }
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
                <Route path="/buildings" element={<BuildingsTab updateRoute={() => { setPathname("/building/New"); navigate("/building/New") }} />} />
                <Route path="/building/New" element={<AddNewBuildings user={user} />} />
                <Route path="/Organizations" element={<Organizations user={user} allOrganization={allOrganization} />} />
                <Route path="/Profile/Edit" element={<Account avatar={userAvatar} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Notification" element={<Account avatar={userAvatar} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Activity" element={<Account avatar={userAvatar} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Security" element={<Account avatar={userAvatar} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                <Route path="/Profile/Password" element={<Account avatar={userAvatar} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
            </Routes>
        </ProLayout >
    );
}

export default () => <DashboardRoute />;
