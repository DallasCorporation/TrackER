import { Col, Row } from "antd";
import React, { useEffect } from "react";
const StatsCard = ({ chart, refresh, color = "#FFFFFF" }) => {
    useEffect(() => {
    }, [chart, refresh])
    return (
        <Col span={24} style={{ background: color, borderRadius: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
            <Row align="middle" justify="center" style={{ width: "100%", }} gutter={[12, 12]}>
                <Col span={24}>{chart}</Col>
            </Row>
        </Col>

    );
}

export default StatsCard