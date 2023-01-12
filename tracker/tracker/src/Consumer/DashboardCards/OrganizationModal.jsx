import { useEffect, useState } from "react";
import api from "../../api";
import { Avatar, Breadcrumb, Card, Col, Divider, Layout, Modal, PageHeader, Row, Slider, Space, Statistic, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { ProList } from "@ant-design/pro-components";
import { IconFont } from "../utils";
import styled from "styled-components";

const RenewableCard = ({ title, organizationId }) => {

    const SubTitle = styled.p`
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 19px;
    line-height: 1.5715;
    text-overflow: ellipsis;
    margin-bottom: 16px 
    `

    const [load, setLoad] = useState(true)
    const [hydro, setHydro] = useState([])
    const [geo, setGeo] = useState([])
    const [wind, setWind] = useState([])
    const [solar, setSolar] = useState([])
    const getData = async () => {
        setSolar([])
        setGeo([])
        setWind([])
        setHydro([])
        await api.renewable.fetchAll().then((res) => {
            res.map(el => {
                switch (el.resourcesType) {
                    case "Hydro":
                        setHydro((old) => [...old, el])
                        break
                    case "Geo":
                        setGeo((old) => [...old, el])
                        break
                    case "Wind":
                        setWind((old) => [...old, el])
                        break
                    case "Solar":
                        setSolar((old) => [...old, el])
                        break
                    default:
                        break
                }
            })
            setTimeout(() => {
                setLoad(false)
            }, 1000);
        })
    }
    useEffect(() => {
        if (organizationId === null)
            return
        getData()
    }, [title])


    return (
        <Card style={{
            borderRadius: 20,
            boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)"
        }}>

            <Row gutter={[32, 16]}>
                <Col span={24}>
                    <Row justify="space-between" align="middle">

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
                        <IconFont type="i-a-EnergyResources" style={{ fontSize: 40, color: "green" }} />
                    </Row>
                </Col>
                <Col span={24}>
                    {solar.length > 0 &&
                        <div>
                            <SubTitle>Organization Solar Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {solar.map(el =>
                        <Row justify="space-between" key={el._id} gutter={[32, 32]}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                    {hydro.length > 0 &&
                        <div>
                            <SubTitle>Organization Hydro Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {hydro.map(el =>
                        <Row justify="space-between" key={el._id}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                    {geo.length > 0 &&
                        <div>
                            <SubTitle>Organization Geothermic Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {geo.map(el =>
                        <Row justify="space-between" key={el._id}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                    {wind.length > 0 &&
                        <div>
                            <SubTitle>Organization Windy Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {wind.map(el =>
                        <Row justify="space-between" key={el._id}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                </Col>

            </Row>
        </Card>
    )
}

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
                    <Row justify="space-between" align="middle">
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
                        {title.includes("Electric") && <IconFont type="i-Energy" style={{ fontSize: 40, color: "gold" }} />}
                        {title.includes("Gas") && <IconFont type="i-fire-line" style={{ fontSize: 40, color: "#17e396" }} />}
                        {title.includes("Water") && <IconFont type="i-water-flash-line" style={{ fontSize: 40, color: "blue" }} />}

                    </Row>
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



const OrganizationModal = ({ visible , setVisible}) => {
    const navigate = useNavigate()
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [allOrganization, setAllOrganization] = useState([]);
    const fetchData = async () => await api.organization.fetchCost().then((res) => {
        setAllOrganization([res])
    })
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Modal width={1200} visible={visible} cancelButtonProps={{ style: { display: 'none' } }} onOk={() => setVisible(false)} >
            <Layout
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 280,
                }}
            >
                {/* {show && <LoadingSpinner message={"Deleting..."}></LoadingSpinner>} */}
                <Row gutter={[16, 16]} >
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Organizations</Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <PageHeader
                    style={{ paddingLeft: 0 }}
                    className="site-page-header"
                    title="Organizations"
                    subTitle="Check all registered organization of our platform"
                    onBack={() => navigate("/Dashboard")}
                />
                <Row style={{ marginTop: 12 }}>
                    <Col span={24}>
                        <ProList rowKey="title" headerTitle="Registered Organization" cardProps={{ style: { borderRadius: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.2)" } }} cardBordered tableStyle={{ borderRadius: 20 }} style={{ borderRadius: 20 }}
                            expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => {
                                        if (expandedRowKeys.includes(rowIndex))
                                            setExpandedRowKeys([])
                                        else
                                            setExpandedRowKeys([rowIndex])
                                    }, // click row
                                    onDoubleClick: event => { }, // double click row
                                    onContextMenu: event => { }, // right button click row
                                    onMouseEnter: event => { }, // mouse enter row
                                    onMouseLeave: event => { }, // mouse leave row
                                };
                            }}
                            dataSource={allOrganization}
                            itemLayout="vertical"
                            size="large"
                            split
                            metas={{
                                title: {
                                    render: (_, data) => (
                                        <Row align="middle">
                                            <Col style={{ width: 220 }}>
                                                {data.name}
                                            </Col>
                                            <Col >
                                                <Space size={0}>
                                                    {data.type.includes("Electric") && <Tag icon={<span className="anticon iconfontTag" >&#xe61d;</span>} color="gold">Electric</Tag>}
                                                    {data.type.includes("Gas") && <Tag icon={<span className="anticon iconfontTag" >&#xe657;</span>} color="#17e396">Gas</Tag>}
                                                    {data.type.includes("Water") && <Tag icon={<span className="anticon iconfontTag" >&#xe730;</span>} color="blue">Water</Tag>}
                                                    {data.type.includes("Distributed") && <Tag icon={<span className="anticon iconfontTag" >&#xe927;</span>} color="green">Energy Resources</Tag>}
                                                </Space>
                                            </Col>
                                        </Row>

                                    ),
                                },
                                subTitle: {
                                    dataIndex: 'description'
                                },
                                content: {
                                    render: (_, data) => {
                                        const { electric, water, gas, resources } = data.details
                                        return (
                                            <Col span={24} style={{ marginBottom: 32 }}>
                                                <Row gutter={[64, 64]} justify="center" align="middle">
                                                    <Tooltip placement="bottom" title={data.name + " Logo"}>
                                                        <Avatar size={240} src={data.icon} style={{ boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)" }} />
                                                    </Tooltip>
                                                    <Col span={14} style={{ marginLeft: 22 }}>
                                                        <p style={{ fontSize: 17 }}>Owner: <b>TrackER</b> </p>
                                                        <Row>
                                                            <p style={{ fontSize: 17 }}>Created at: {new Date(data.createAt).toLocaleDateString()}</p>
                                                            <p style={{ fontSize: 17, marginLeft: 32 }}>Total Registered Buildings: {data.customers.length}</p>
                                                        </Row>
                                                        <Slider value={data.customers.length} marks={{ 0: 'Small', 25: 'Medium', 70: 'Large', }} />
                                                    </Col>
                                                    {electric.length > 0 &&
                                                        <Col md={12} sm={24}>
                                                            <TypeCard title="Electric Plan" data={electric} />
                                                        </Col>
                                                    }

                                                    {gas.length > 0 &&
                                                        <Col md={12} sm={24}>
                                                            <TypeCard title="Gas Plan" data={gas} />
                                                        </Col>
                                                    }
                                                    {water.length > 0 &&
                                                        <Col md={12} sm={24}>
                                                            <TypeCard title="Water Plan" data={water} />
                                                        </Col>
                                                    }
                                                    {resources.length > 0 &&
                                                        <Col span={24}>
                                                            <RenewableCard title="Renewable Installation Cost and Earnings" organizationId={data._id} />
                                                        </Col>
                                                    }
                                                </Row>
                                            </Col>)
                                    }
                                },
                            }} />
                    </Col>
                </Row>
            </Layout>
        </Modal>
    )
}
export default OrganizationModal