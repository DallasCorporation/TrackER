import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
const StatsCard = ({ chart, value, title, color }) => (
    <Col span={24} style={{ background: color, borderRadius: 10 }}>
        <Row align="middle" justify="center" style={{ width: "100%", }} gutter={[12,12]}>
            <Col span={24}>
                {chart}
            </Col>
        </Row>
    </Col>
);

export default StatsCard