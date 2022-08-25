import { Button, Card, Col, Descriptions, Row, Statistic } from "antd"
import { useState } from "react";

const TypeCard = ({ title, data }) => {
    const [load, setLoad] = useState(true)
    setTimeout(() => {
        setLoad(false)
    }, 1000);
    return (
        <Card style={{
            borderRadius: 20,
            boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)"
        }}>

            <Row gutter={[32, 16]}>
                <Col span={24}>
                    <p style={{
                        overflow: "hidden",
                        color: "rgba(0, 0, 0, 0.85)",
                        fontWeight: "bold",
                        fontSize: "20px",
                        lineHeight: 1.5715,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: 0
                    }}>{title}</p>
                </Col>
                <Col span={12}>
                    <Statistic suffix="€" title={data[0].name} value={data[0].price} loading={load} />
                </Col>
                <Col span={12}>
                    <Statistic suffix="€" title={data[1].name} value={data[1].price} loading={load} />
                </Col>
                <Col span={12}>
                    <Statistic suffix="€" title={data[2].name} value={data[2].price} loading={load} />
                </Col>
                <Col span={12}>
                    <Statistic suffix="€" title={data[3].name} value={data[3].price} loading={load} />
                </Col>
            </Row>
        </Card>
    )
}
export default TypeCard