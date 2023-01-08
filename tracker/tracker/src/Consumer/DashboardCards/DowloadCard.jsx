import { Avatar, Breadcrumb, Button, Card, Col, Divider, Layout, Modal, PageHeader, Row, Slider, Space, Statistic, Tag, Tooltip } from "antd";
import { ProCard, ProList } from "@ant-design/pro-components";
import React, { useEffect } from "react";
import { CardTitle } from "../../Components/CustomComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api";
import OrganizationModal from "./OrganizationModal";



const DownloadCard = ({ ...props }) => {
    const [visible, setVisible] = useState()

    return (
        <ProCard bordered style={{
            borderRadius: "10px",
            backgroundImage: 'url("http://yoda.hypeople.studio/yoda-admin-template/react/static/media/analytics-download-bg.e499d6fb.png")',
            backgroundSize: "cover",
            backgroundPosition: "right center",
            height: "194px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}>
            <Row align="middle" justify="space-between">
                <Col>
                    <CardTitle style={{ color: "white", whiteSpace: "pre-wrap" }}>
                        {"Save and improve your Energy now!\nCheck our Organizations and\nBoost Your Energy"}
                    </CardTitle>
                    <Button onClick={() => setVisible(true)} type="default" style={{ fontSize: 15, textTransform: "none", borderRadius: "6px", marginTop: "22px", marginLeft: "5px", color: "blue" }}>Learn More</Button>
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
            <OrganizationModal visible={visible} setVisible={setVisible} />
        </ProCard >
    )
};

export default DownloadCard

