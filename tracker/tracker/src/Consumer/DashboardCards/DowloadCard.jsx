import { Button, Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import { CardTitle } from "../../Components/CustomComponents";
import { useNavigate } from "react-router-dom";
const DownloadCard = ({ ...props }) => {
    const navigate = useNavigate()
    return (
        <ProCard bordered style={{
            borderRadius: "10px",
            backgroundImage: 'url("http://yoda.hypeople.studio/yoda-admin-template/react/static/media/analytics-download-bg.e499d6fb.png")',
            backgroundSize: "cover",
            backgroundPosition: "right center",
            height: "194px"
        }}>
            <Row align="middle" justify="space-between">
                <Col>
                    <CardTitle style={{ color: "white", whiteSpace: "pre-wrap" }}>
                        {"Save and improve your Energy now!\nCheck our Organizations and\nBoost Your Energy"}
                    </CardTitle>
                    <Button onClick={() => navigate("/Organizations")} type="default" style={{ fontSize: 15, textTransform: "none", borderRadius: "6px", marginTop: "22px", marginLeft: "5px", color: "blue" }}>View</Button>
                </Col>
                <img
                    alt=""
                    style={{
                        height: "100%",
                        position: " absolute",
                        top: 0,
                        right: 0,
                        verticalAlign: "middle",
                    }}
                    src="http://yoda.hypeople.studio/yoda-admin-template/react/static/media/analytics-download-vector.614c5d22.svg" />
            </Row>
        </ProCard>
    )
};

export default DownloadCard

