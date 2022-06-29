import { Button, Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";

const BannerCard = ({name="default"}) => (
    <ProCard colSpan={12} bordered style={{ borderRadius: "10px", backgroundImage:'url("http://yoda.hypeople.studio/yoda-admin-template/react/static/media/analytics-payment-bg.55fb02f6.svg")',backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat' }}>
        <Row justify="space-between" align="middle" >
            <Col>
                <h4 style={{fontSize:"20px", fontWeight:500, color:"#2d3436"}}>{name}</h4>
                <div>by upgrading your plan to premium</div>
            </Col>
            <Col >
                <Button>test</Button>
            </Col>
        </Row>
    </ProCard>
);

export default BannerCard