import { Avatar, Col, Image, Layout, Row, } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector((state) => state.user.user)
    return (
        <Layout
            style={{
                paddingRight: 24,
                paddingLeft: 24,
                minHeight: 280,
                marginTop: "32px"
            }}
        >
            <h1 style={{ fontSize: "24px", }}>Welcome back, {user.name} 👋</h1>
            <p style={{ color: "#636e72", fontSize: "14px", lineHeight: "21px" }}>Your current status and analytics are here</p>


        </Layout>
    );
}
export default () => <Dashboard />
