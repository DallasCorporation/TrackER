import React, { useEffect } from "react";
import { GithubOutlined, } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard'
import BuildingsTab from './Building/BuildingsTab';
import "./Dashboard.less"
import { DefaultFooter, ProLayout } from '@ant-design/pro-components';
import { useDispatch } from "react-redux";
import api from "../api";
import Invoices from "./Invoices/Invoices";
import { fetchBuildings } from "../reducers/buildings";
import { updateUser } from "../reducers/user.js"

const user = {
    email: "emanuele@dernetsoft.com",
    name: "Emanuele",
    password: "$2a$10$rUmw/c7v3NGhGqawkNLC.uq94V.gUqnkQr3fQzV0MVWDetrUJwLBS",
    surname: "Dall'Ara",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmVlOTgxZTYzZjA5M2M4MTNiOGEwMiIsImlhdCI6MTY2Mjk3MTEwNSwiZXhwIjoxNjY1NTYzMTA1fQ.6Z9UkWwy1KR9xxSnf9v2Fo8HTy9lwsXD7w4HhtHgYIs",
    type: "Building",
    _id: "62bee981e63f093c813b8a02"
}

let defaultProps = {
    route: {
        path: '/',
        routes: [
            {
                path: '/Dashboard',
                name: 'Dashboard',
                icon: <span className="anticon iconfont">&#x100d9;</span>,

            },
            {
                path: '/Buildings',
                name: 'Buildings',
                icon: <span className="anticon iconfont" >&#x100dc;</span>
            },
            {
                path: '/Invoices',
                name: 'Invoices',
                icon: <span className="anticon iconfont" >&#x100e6;</span>,
                routes: [
                    {
                        path: '/Invoices/Weekly',
                        name: 'Weekly',

                    },
                    {
                        path: '/Invoices/Monthly',
                        name: 'Monthly',

                    },
                    {
                        path: '/Invoices/Yearly',
                        name: 'Yearly',

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
const DashboardRoute = () => {
    const dispatch = useDispatch()

    const fetch = async () => {
        await api.buildings.fetchBuildings(user._id).then(data =>
            dispatch(fetchBuildings(data)))
    }

    useEffect(() => {
        dispatch(updateUser(user))
        fetch()
    }, [])


    let navigate = useNavigate();

    const [pathname, setPathname] = useState('/Dashboard');

    const url = window.location.pathname
    useEffect(() => {
        setPathname(url)
    }, [url])
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

    return (
        <ProLayout
            logo={<img onClick={() => navigate("/Dashboard")} src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg" alt="Tracker Logo" />}
            title="TrackER"
            {...defaultProps}
            location={{ pathname, }}
            navTheme="light"
            menu={{ defaultOpenAll: true }}
            waterMarkProps={{ content: 'TrackER', }}
            headerRender={
                < ProLayout
                    logo={<img onClick={() => navigate("/Dashboard")} src="https://res.cloudinary.com/dgfnyulqh/image/upload/v1658845429/nbnkxykkyymhethjdiek.jpg" alt="Tracker Logo" />}
                    title="TrackER"
                    {...defaultProps}
                    location={{ pathname, }}
                    navTheme="light"
                    menu={{ defaultOpenAll: true }}
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
                        <Route path="/Invoices/Weekly" element={<Invoices user={user} />} />
                        <Route path="/Invoices/Monthly" element={<Invoices user={user} />} />
                        <Route path="/Invoices/Yearly" element={<Invoices user={user} />} />
                    </Routes>
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
                <Route path="/Invoices/Weekly" element={<Invoices user={user} />} />
                <Route path="/Invoices/Monthly" element={<Invoices user={user} />} />
                <Route path="/Invoices/Yearly" element={<Invoices user={user} />} />
            </Routes>
        </ProLayout >
    );
}

export default () => <DashboardRoute />;
