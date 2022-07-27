import { QuestionCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Card, Col, Empty, Input, Layout, PageHeader, Popconfirm, Radio, Row, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { fetchBuildings } from "../../reducers/buildings";
import Map from './Map';
import LoadingSpinner from '../../Components/LoadingSpinner';
import StatsCard from "../DashboardCards/StatsCard";
import { linear } from "../utils";
import ReactApexChart from "react-apexcharts";

const { Option } = Select;
const { Search } = Input;

const BuildingTab = ({ updateRoute }) => {
    const buildings = useSelector((state) => state.buildings.buildings)
    const user = useSelector((state) => state.user.user)
    const allOrg = useSelector((state) => state.allOrganization.organization)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [bills, setBills] = useState([])
    const deleteBuilding = async (id) => {
        setShow(true)
        await api.buildings.deleteBuilding(id)
        await api.buildings.fetchBuildings(user._id).then((res) => {
            dispatch(fetchBuildings(res))
            setTimeout(() => {
                setShow(false)
            }, 1000);
        })

    }
    const getBills = async () => {
        await api.bills.getBills().then(res => setBills(res))
    }
    useEffect(() => {
        getBills()
    }, [])

    const getData = (id, type) => {
        let test = bills.filter(el =>
            el.buildingId === id

        )
        let tmp = test[0]
        if (test[0] === undefined) {
            return []
        }
        let data = []
        tmp.bills.map(el =>
            data.push({
                x: new Date(el.date).toUTCString(),
                y: el[type.toLowerCase()]
            }))
        let series = [{
            name: type,
            data: data
        }]
        return series
    }

    const showBills = (type, orgId) => {
        let res = false
        allOrg.filter(el => res = (el._id === orgId && el.type.includes(type)))
        return res
    }

    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            {show && <LoadingSpinner message={"Deleting..."}></LoadingSpinner>}
            <Row gutter={[16, 16]} >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Buildings</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                className="site-page-header"
                title="Buildings Portfolio"
                subTitle="Browse and check your buildings"
            />
            <Row style={{ width: "100%" }}>
                <Input.Group compact>
                    <Select
                        defaultValue="Address"
                        style={{ width: "35%" }}
                    >
                        <Option value="Address">Address</Option>
                        <Option value="Building">Building</Option>
                    </Select>
                    <AutoComplete
                        style={{ width: "65%" }}
                        dataSource={buildings}
                        defaultActiveFirstOption={false}
                    >
                        <Search
                            placeholder={
                                "Search by Name"
                            }
                        />
                    </AutoComplete>
                </Input.Group>
            </Row>
            {buildings === null ?
                <Card style={{ marginTop: "32px" }}>
                    <Empty
                        description="No Buildings found..."
                    >
                        <Button style={{ height: 40, borderRadius: 8 }} type="primary" onClick={() => {
                            updateRoute("/building/New")
                        }}>
                            Add a new Building to your account!
                        </Button>
                    </Empty>
                </Card>
                :
                buildings.map((item) =>
                    <div style={{ paddingTop: "32px" }}>
                        <Card bodyStyle={{ padding: "0", marginBottom: "32px", borderRadius: "10px" }} headStyle={{ borderRadius: "10px" }} style={{ borderRadius: "10px" }}>
                            <Row >
                                <Col lg={24} md={24} sx={24}>
                                    <Row justify="space-between" align="middle" style={{ backgroundColor: "#0010f7", height: "50px", padding: "10px" }}>
                                        <h3 style={{ color: "white" }}>{item.name}</h3>
                                        <Radio.Group value="default" >
                                            <Radio.Button type="primary">Edit</Radio.Button>
                                            <Popconfirm
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                title="Do you wanna delete this building?"
                                                onConfirm={() => deleteBuilding(item._id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Radio.Button>Delete</Radio.Button>
                                            </Popconfirm>
                                        </Radio.Group>
                                    </Row>
                                </Col>
                            </Row>

                            <Row justify="space-between" gutter={[32, 0]} style={{ marginBottom: "32px", padding: "16px" }}>
                                <Col lg={8} md={8} sx={8}>
                                    <Map lat={item.lat} lng={item.long} />
                                </Col>
                                <Col lg={8} md={8} sx={8}>
                                    <p>Building Name</p>
                                    <Input value={item.name} readOnly></Input>
                                    <p style={{ marginTop: "27px" }}>Contact Name</p>
                                    <Input value={item.contact} readOnly></Input>
                                </Col>
                                <Col lg={8} md={8} sx={8}>
                                    <p>Building Address</p>
                                    <Input value={item.address} readOnly></Input>
                                    <p style={{ marginTop: "27px" }}>Building Type</p>
                                    <Input value={item.type} readOnly></Input>
                                </Col>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: "32px", padding: "32px" }} gutter={[32, 32]}>
                                {showBills("Electric", item.organizationId) && <Col span={8}>
                                    <StatsCard
                                        color={"#ebfafa"}
                                        chart={<ReactApexChart options={linear('Consumed Electricity').options} series={getData(item._id, "Electric")} type="line" height={150} />}
                                        value={"13,346"}
                                    />
                                </Col>}
                                {showBills("Water", item.organizationId) && <Col span={8}>
                                    <StatsCard
                                        color={"#ebfafa"}
                                        chart={<ReactApexChart options={linear('Consumed Water').options} series={getData(item._id, "Water")} type="line" height={150} />}
                                        value={"13,346"}
                                    />
                                </Col>}
                                {showBills("Gas", item.organizationId) && <Col span={8}>
                                    <StatsCard
                                        color={"#ebfafa"}
                                        chart={<ReactApexChart options={linear('Consumed Gas').options} series={getData(item._id, "Gas")} type="line" height={150} />}
                                        value={"13,346"}
                                    />
                                </Col>}
                            </Row>
                            <Col align="center">
                                <Button>Open</Button>
                            </Col>
                        </Card>
                    </div>
                )
            }
        </Layout>
    );
}
export default ({ updateRoute }) => <BuildingTab updateRoute={() => updateRoute()} />
