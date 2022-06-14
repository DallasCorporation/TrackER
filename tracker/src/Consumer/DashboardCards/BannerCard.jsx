import { Button, Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";

const BannerCard = ({name="default"}) => (
    <ProCard colSpan={12} bordered style={{ borderRadius: "10px" }}>
        <Row justify="space-between" align="middle" >
            <Col>
                <h4>{name}</h4>
                <div>by upgrading your plan to premium</div>
            </Col>
            <Col >
                <Button>test</Button>
            </Col>
        </Row>
    </ProCard>
);

export default BannerCard