import { Col, Row, Space } from "antd";
import React from "react";

const Header = ({ avatar, socket }) => {

    return (
        <Row justify="center" style={{ marginTop: "15px", }}>
            <Row style={{ fontWeight: 500, width: "95%", backgroundColor: "white", borderRadius: "10px", paddingRight: 30, paddingLeft: 30, height: 50 }} align="middle" justify="space-between">
                <Row align="middle">
                    <Col style={{ borderRadius: 10, height: 40, width: 40, background: "#ebfafa", textAlign: "center", marginRight: 5 }}>
                        <span class="anticon iconfont" style={{ color: "blue", verticalAlign: "baseline" }} >&#x100e8;</span>
                    </Col>
                    <Col>
                        <p style={{ height: "32px" }}> Do you know the latest update of our 2022? 🎉  </p>
                    </Col>
                    <Col>
                        <p style={{ color: "#fea5b1", height: "32px", marginLeft: 5 }}>Check our program for 2022.</p>
                    </Col>
                </Row>
                <Space>
                </Space>
            </Row>
        </Row>
    )
}

export default Header