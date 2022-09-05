import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter, ProLayout } from "@ant-design/pro-components";
import { Avatar, Button, Col, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LinkHover } from "../Components/CustomComponents";
import Account from "../Account/Account";
import "./Vendor.less"
import Dashboard from "./Dashboard";
import api from "../api";
import { userPreference } from "../reducers/preference";
import { fetchOrganization } from "../reducers/organization";
import CompleteOrganization from "./CompleteOrganization";
import Header from "../Consumer/Header/Header";
import Customers from "./Customers/Customers";
import EditPlan from "./Edit/EditPlan";
import Electric from "./Pages/Electric";
import Gas from "./Pages/Gas";
import Water from "./Pages/Water";
import Resources from "./Pages/Resources";
import { setAllBuildings } from "../reducers/allOrganization";
import { io } from "socket.io-client"


const DashboardRoute = () => {
    const [socket, setSocket] = useState(null)
    let navigate = useNavigate();
    const user = useSelector((state) => state.user.user)
    const allUser = useSelector((state) => state.allUser.user)
    const organization = useSelector((state) => state.organization.organization)
    const edited = organization !== null ? organization.type.length : 0
    const icon = organization !== null ? organization.icon : ""
    const [bills, setBills] = useState([])



    useEffect(() => {
        setSocket(io("http://localhost:3002"))
    }, []);

    useEffect(() => {
        if (socket === null || organization === null) return
        socket.emit("newUser", organization._id);
    }, [socket, user, organization]);

    const getName = (id, msg) => {
        let user = allUser.find(el => el._id === id)
        return (
            <Row>
                <Col span={24}>
                    <p><b>{user.name + " " + user.surname}</b> {msg}</p>
                </Col>
            </Row>
        )
    }

    useEffect(() => {
        socket?.on("getNotification", (data) => {
            const key = `open${Date.now()}`
            data.type === "New" &&
                notification.open({
                    key,
                    duration: 0,
                    icon: <div style={{ paddingTop: 10 }}>
                        <span class="anticon iconfontMedium2" style={{ marginTop: 32, color: "blue", verticalAlign: "baseline" }} >&#x100e4;</span>
                    </div>,
                    message: "A New Building has added to your Organization!",
                    description: getName(data.sender, data.msg),
                    className: 'custom-class',
                    btn: <Button type="primary" style={{ borderRadius: 20 }} onClick={() => notification.close(key)}>Got it</Button>,
                    style: {
                        width: 500,
                        height: 150,
                        borderRadius: 20,
                    },
                });

            data.type === "Renewable" &&
                notification.open({
                    key,
                    duration: 0,
                    icon: <div style={{ paddingTop: 10 }}>
                        <span class="anticon iconfontMedium2" style={{ marginTop: 32, color: "blue", verticalAlign: "baseline" }} >&#xe927;</span>
                    </div>,
                    message: "A Building has mounted an Energy Device!",
                    description: getName(data.sender, data.msg),
                    className: 'custom-class',
                    btn: <Button type="primary" style={{ borderRadius: 20 }} onClick={() => notification.close(key)}>Got it</Button>,
                    style: {
                        width: 500,
                        height: 150,
                        borderRadius: 20,
                    },
                });

        });
    }, [socket]);


    const dispatch = useDispatch()
    const fetchPreference = async () => {
        await api.preference.fetchPreference(user._id).then(data => dispatch(userPreference(data)))
    }
    const getOrganization = async () => {
        await api.organization.getByUserId(user._id).then(data => dispatch(fetchOrganization(data)))
    }
    const getBills = async () => {
        await api.bills.getBillsByOrganizationIdAggregated(organization._id).then(res => setBills(res))
    }

    const getBuildings = async () => {
        await api.buildings.getBuildingsByOrganizationId(organization._id).then((res) => dispatch(setAllBuildings(res))).catch(err => dispatch(setAllBuildings([])))
    }

    useEffect(() => {
        if (organization === null || organization === undefined)
            return
        fetchPreference()
        getOrganization()
        getBills()
        getBuildings()
    }, [user])




    const url = window.location.pathname
    useEffect(() => {
        setPathname(url)
    }, [url])

    if (organization === null) {
        fetchPreference()
        getOrganization()
    }

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
                organization !== null && organization.type.includes("Electric") && {
                    path: '/Electric',
                    name: 'Electric Supplier',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#xe61d;</span>
                },
                organization !== null && organization.type.includes("Water") && {
                    path: '/Water',
                    name: 'Water Supplier',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#xe730;</span>
                },
                organization !== null && organization.type.includes("Gas") && {
                    path: '/Gas',
                    name: 'Gas Supplier',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#xe657;</span>
                },
                organization !== null && organization.type.includes("Distributed") && {
                    path: '/Resources',
                    name: 'Energy Resources',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#xe927;</span>
                },
                {
                    path: '/Customers',
                    name: 'Customers',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#x100e5;</span>
                },
                {
                    path: '/Edit',
                    name: 'Edit Plan',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont">&#x100e9;</span>
                },
                {
                    path: '/Profile',
                    name: 'Organization',
                    disabled: edited === 0,
                    icon: <span class="anticon iconfont" >&#x100da;</span>,
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
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const settings = { fixSiderbar: true, };
    const [pathname, setPathname] = useState('/Dashboard');
    return (
        <ProLayout
            logo={<img onClick={() => navigate("/Dashboard")} src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg" alt="Tracker Logo" />}
            title="TrackER"
            {...defaultProps}
            location={{ pathname, }}
            navTheme="light"
            menu={{ defaultOpenAll: edited !== 0 }}
            waterMarkProps={{ content: 'TrackER', }}
            headerRender={() => width >= 768 ? <Header socket={socket} avatar={icon} /> :
                <ProLayout
                    logo={<img onClick={() => navigate("/Dashboard")} src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg" alt="Tracker Logo" />}
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
                                <Col style={{ alignSelf: "center" }}>
                                    <Avatar size={40} src={icon} />
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
                    {organization !== null && organization.type.length === 0 ? <CompleteOrganization />
                        : organization !== null &&
                        <Routes >
                            <Route path="*" element={<Dashboard user={user} />} />
                            <Route path="/Dashboard" element={<Dashboard user={user} />} />
                            <Route path="/Electric" element={<Electric user={user} bills={bills} cost={organization.details.electric} />} />
                            <Route path="/Gas" element={<Gas user={user} bills={bills} cost={organization.details.gas} />} />
                            <Route path="/Water" element={<Water user={user} bills={bills} cost={organization.details.water} />} />
                            <Route path="/Resources" element={<Resources user={user} bills={bills} />} />
                            <Route path="/Customers" element={<Customers organization={organization} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Edit" element={<EditPlan organization={organization} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Edit" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Notification" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Activity" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Security" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                            <Route path="/Profile/Password" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                        </Routes>
                    }
                </ProLayout >


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
                    <Row
                        justify="center"
                        style={{ marginBottom: 20 }}
                        gutter={[16, 16]}
                    >
                        <Col style={{ alignSelf: "center" }}>
                            <Avatar size={40} src={icon} />
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
            {organization !== null && organization.type.length === 0 ? <CompleteOrganization />
                : organization !== null &&
                <Routes >
                    <Route path="*" element={<Dashboard user={user} />} />
                    <Route path="/Dashboard" element={<Dashboard user={user} />} />
                    <Route path="/Electric" element={<Electric user={user} bills={bills} cost={organization.details.electric} />} />
                    <Route path="/Gas" element={<Gas user={user} bills={bills} cost={organization.details.gas} />} />
                    <Route path="/Water" element={<Water user={user} bills={bills} cost={organization.details.water} />} />
                    <Route path="/Resources" element={<Resources user={user} bills={bills} />} />
                    <Route path="/Customers" element={<Customers organization={organization} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Edit" element={<EditPlan organization={organization} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Edit" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Notification" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Activity" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Security" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                    <Route path="/Profile/Password" element={<Account socket={socket} avatar={icon} user={user} updateRoute={(val) => { setPathname(val); navigate(val) }} />} />
                </Routes>
            }
        </ProLayout >
    );
}

export default () => <DashboardRoute />;
