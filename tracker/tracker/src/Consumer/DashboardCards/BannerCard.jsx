import { Button, Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import { useNavigate } from "react-router-dom";

const BannerCard = ({ name = "default" }) => {
    let navigate= useNavigate()
    return (
        <ProCard colSpan={12} bordered style={{
            borderRadius: "10px", backgroundImage: 'url("http://yoda.hypeople.studio/yoda-admin-template/react/static/media/analytics-payment-bg.55fb02f6.svg")', backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <Row justify="space-between" align="middle" >
                <Col>
                    <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>{name}</h4>
                    <div>Check all Organization</div>
                </Col>
                <Col >
                    <Button onClick={()=>navigate("/Organizations")} type="default" style={{ fontSize: 15, textTransform: "none", borderRadius: 10, color: "blue" }}>See now</Button>
                </Col>
            </Row>
        </ProCard>
    );
}

export default BannerCard