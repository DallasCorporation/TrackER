import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
const StatsCard = ({ chart, value, title, color }) => (

    <ProCard bordered style={{ borderRadius: "10px" }}>
        <Row justify="space-between" align="middle" >
            <Col span={24} style={{ background: color, borderRadius: 10 }}>
                <Row align="middle" justify="center">{chart}</Row>
                <Row align="center">
                    <h3>{value}</h3>
                    <p>{title}</p>
                </Row>
            </Col>
        </Row>
    </ProCard>
);

export default StatsCard