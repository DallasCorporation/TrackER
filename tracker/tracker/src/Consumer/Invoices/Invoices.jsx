import { Breadcrumb, Button, Card, Col, Layout, Row, Space, Tag } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import api from "../../api";
import { InfoCircleOutlined } from '@ant-design/icons';
import InvoicesModal from "./InvoicesModal";

const Invoices = () => {
    const filter = useLocation().pathname.split("/")[2]
    const buildings = useSelector(state => state.buildings.buildings)
    const organizations = useSelector(state => state.allOrganization.organization)
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const user = useSelector((state) => state.user.user)
    const [bills, setBills] = useState({})
    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false)

    const getBillsAggregated = async () => {
        await api.bills.getBillsAggregated(user._id).then(res => setBills(res.all))
    }
    useEffect(() => {
        getBillsAggregated(user._id)
        console.log(bills.all)
    }, [])

    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            <Row gutter={[16, 16]} >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Invoices</Breadcrumb.Item>
                    <Breadcrumb.Item>{filter}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row style={{ marginTop: "22px" }} gutter={[16, 16]}>
                <Col span={24}>
                    <Row style={{ marginTop: "22px" }} gutter={[32, 32]}>
                        {buildings.map(el =>
                            <Col span={8}>
                                <Card style={{ borderRadius: 20, boxShadow: "0 2px 2px rgba(0,0,0,0.2)" }} gutter={[0, 8]}>
                                    <Row justify="space-between" align="middle">
                                        <p style={{ fontWeight: 500, fontSize: 22, margin: 0 }}>{el.name}</p>
                                        <InfoCircleOutlined />
                                    </Row>
                                    <Row justify="space-between" align="middle" style={{ marginTop: "12px" }}>
                                        <p style={{ margin: 0 }}>Address:</p>
                                        <p style={{ margin: 0 }}>{el.address}</p>
                                    </Row>
                                    <Row justify="space-between" align="middle" style={{ marginTop: "12px" }}>
                                        <p style={{ margin: 0 }}>Contact Name:</p>
                                        <p style={{ margin: 0 }}>{el.contact}</p>
                                    </Row>
                                    <Row justify="space-between" align="middle" style={{ marginTop: "12px" }}>
                                        <p style={{ margin: 0 }}>Type:</p>
                                        <p style={{ margin: 0 }}>{el.type}</p>
                                    </Row>
                                    <Row justify="space-between" align="middle" style={{ marginTop: "12px" }}>
                                        <p style={{ margin: 0 }}>Size (sqmt):</p>
                                        <p style={{ margin: 0 }}>{el.sqft}</p>
                                    </Row>
                                    <Row justify="center" style={{ marginTop: "22px" }}>
                                        <Button
                                            onClick={() => {
                                                setVisible(true)
                                                setData(el)
                                            }}
                                            size="small" type="primary" style={{ borderRadius: 10 }}>See {filter} Bills Details</Button>
                                    </Row>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
            <InvoicesModal visible={visible} setVisible={setVisible} data={data} />
        </Layout>
    )
}
export default Invoices