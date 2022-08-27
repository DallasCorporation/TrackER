import { Breadcrumb, Button, Card, Col, Empty, Layout, PageHeader, Row, Segmented } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../api";
import { InfoCircleOutlined } from '@ant-design/icons';
import InvoicesModal from "./InvoicesModal";

const Invoices = ({ user }) => {
    const filter = useLocation().pathname.split("/")[2]
    const buildings = useSelector(state => state.buildings.buildings)
    const [bills, setBills] = useState([])
    const [data, setData] = useState({})
    const [timespan, setTimespan] = useState("")
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const [building, setBuilding] = useState({})

    const getBillsAggregated = async () => {
        await api.bills.getBillsAggregated(user._id).then(res => setBills(res.all))
    }
    useEffect(() => {
        getBillsAggregated(user._id)
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
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Buildings Invoices"
                subTitle="Browse and check your invoices"
                onBack={() => navigate("/Dashboard")}
            />
            <Row justify="center">
                <Segmented size="large" value={filter} options={['Weekly', 'Monthly', 'Yearly']} onChange={(el) => navigate("/Invoices/" + el)} />
            </Row>
            <Row style={{ marginTop: "22px" }} gutter={[16, 16]}>
                <Col span={24}>
                    <Row gutter={[32, 32]}>
                        {Object.keys(buildings).length === 0 ?
                            <Col span={24} style={{ marginBottom: 32, background: "white", borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{
                                        height: 150,
                                    }}
                                    description={
                                        <p style={{ fontSize: 18 }}>You must have a Building to show some Bills...</p>
                                    }
                                >
                                    <Button style={{ borderRadius: 20, marginBottom: 32 }} type="primary" onClick={() => navigate("/Building/New")}>Add a Building Now</Button>
                                </Empty>
                            </Col>
                            :
                            buildings.map(el =>
                                <Col md={8} sm={12} xs={24}>
                                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} >
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
                                                    bills.forEach(bill => {
                                                        if (bill.buildingId === el._id) {
                                                            setData(bill)
                                                            setBuilding(el)
                                                        }
                                                    });
                                                    setTimespan(filter)
                                                }}
                                                size="middle" type="primary" style={{ borderRadius: 10 }}>{filter} Bills Details</Button>
                                        </Row>
                                    </Card>
                                </Col>
                            )}
                    </Row>
                </Col>
            </Row>
            <InvoicesModal visible={visible} setVisible={setVisible} data={data} timespan={timespan} building={building} />
        </Layout>
    )
}
export default Invoices