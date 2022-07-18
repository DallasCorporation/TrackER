import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter, ProLayout } from "@ant-design/pro-components";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LinkHover } from "../Components/CustomComponents";
import Account from "../Consumer/Account/Account";
import "./Vendor.less"
import Header from "../Home/Nav";
import Dashboard from "./Dashboard";
import api from "../api";
import { userPreference } from "../reducers/preference";
import { fetchOrganization } from "../reducers/organization";
import CompleteOrganization from "./CompleteOrganization";


const DashboardRoute = () => {
    let navigate = useNavigate();
    const user = useSelector((state) => state.user.user)
    const organization = useSelector((state) => state.organization.organization)
    const edited = organization.type.length
    const icon = ""
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchPreference = async () => {
            api.preference.fetchPreference(user._id).then(data => dispatch(userPreference(data)))
        }
        const getOrganization = async () => {
            api.organization.getByUserId(user._id).then(data => dispatch(fetchOrganization(data)))
        }
        fetchPreference()
        getOrganization()
    }, [])


    let defaultProps = {
        route: {
            path: '/',
            routes: [
                {
                    path: '/Dashboard',
                    name: 'Dashboard',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#x100d9;</span>
                },
                {
                    path: '/Profile',
                    name: 'Profile',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont" >&#x100e5;</span>,
                    routes: [
                        {
                            path: '/Profile/Edit',
                            name: 'Personal Information',
                            disabled: edited === 0
                        },
                        {
                            path: '/Profile/Notification',
                            name: 'Notification',
                            disabled: edited === 0
                        },
                        {
                            path: '/Profile/Activity',
                            name: 'Activity Monitor',
                            disabled: edited === 0
                        },
                        {
                            path: '/Profile/Security',
                            name: 'Security Settings',
                            disabled: edited === 0
                        },
                        {
                            path: '/Profile/Password',
                            name: 'Change Password',
                            disabled: edited === 0
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
            menu={{ defaultOpenAll: edited !== 0 }}
            waterMarkProps={{ content: 'TrackER', }}

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
            {organization.type.length === 0 ? <CompleteOrganization />
                :
                <Routes >
                    <Route path="*" element={<Dashboard user={user} />} />
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/Profile/Edit" element={<Account avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Notification" element={<Account avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Activity" element={<Account avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Security" element={<Account avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Password" element={<Account avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                </Routes>
            }
        </ProLayout >
    );
}

export default () => <DashboardRoute />;
