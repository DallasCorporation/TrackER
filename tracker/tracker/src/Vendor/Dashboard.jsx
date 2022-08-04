import { Avatar, Button, Card, Col, Image, Layout, Row, } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountSubTitle, AccountTitle } from "../Components/CustomComponents";
import api from "../api"
import { useState } from "react";

const Dashboard = () => {
    const user = useSelector((state) => state.user.user)
    let navigate = useNavigate()
   
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
            <Row gutter={[12, 12]}>
                <Col span={12}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <p>Subscriptions</p>
                        <Row justify="center">
                            <Button onClick={() => navigate("/Electric")} type="primary" size="middle" style={{ borderRadius: 10 }}>See details</Button>
                        </Row>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>

                    </Card>
                </Col>
            </Row>

        </Layout>
    );
}
export default () => <Dashboard />
