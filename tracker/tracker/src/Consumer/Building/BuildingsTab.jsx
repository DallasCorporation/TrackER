import { QuestionCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Card, Col, Collapse, Empty, Input, Layout, PageHeader, Popconfirm, Radio, Row, Select, Modal, message } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import { fetchBuildings } from "../../reducers/buildings";
import Map from './Map';
import LoadingSpinner from '../../Components/LoadingSpinner';
import StatsCard from "../DashboardCards/StatsCard";
import { linear } from "../utils";
import ReactApexChart from "react-apexcharts";
import "./style.css"
import moment from "moment";
import EditBuildingModal from "./EditBuildingModal";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const { Search } = Input;

const BuildingTab = ({ updateRoute }) => {
    const buildings = useSelector((state) => state.buildings.buildings)
    const user = useSelector((state) => state.user.user)
    const allOrg = useSelector((state) => state.allOrganization.organization)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [collapse, setCollapse] = useState(false)
    const [bills, setBills] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filter, setFilter] = useState("Address");
    const [buildingsFilter, setBuildingsFilter] = useState(buildings);
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [buildingId, setBuildingId] = useState("")
    const navigate = useNavigate()
    const [type, setType] = useState("")
    const [myMessage, setMessage] = useState("")

    const deleteBuilding = async (id) => {
        setMessage("Deleting...")
        setShow(true)
        await api.buildings.deleteBuilding(id)
        await api.buildings.fetchBuildings(user._id).then((res) => {
            setTimeout(() => {
                setShow(false)
            }, 1000);
            message.success("Building deleted correctly")
            setBuildingsFilter(res)
            dispatch(fetchBuildings(res))
        })
    }
    const getBills = async () => {
        await api.bills.getBillsAggregated(user._id).then(res => setBills(res))
    }

    useEffect(() => {
        getBills()
    }, [buildings, show])

    const getData = (id, type) => {
        if (bills.all === undefined)
            return []
        let test = bills.all.find(el => el.buildingId === id)
        if (test === undefined) {
            return []
        }
        let data = []
        test.bills.map(el =>
            data.push({
                x: moment.utc(el.date).local().format(),
                y: el[type.toLowerCase()]
            }))
        let series = [{
            name: type,
            data: data
        }]
        return series
    }

    const showBills = (type, orgId) => {
        return allOrg.find(el => el._id === orgId).type.includes(type)
    }

    const renderItem = () => {
        let tmp = []
        if (buildings === null)
            return []
        buildings.map(el =>
            tmp.push(
                {
                    value: filter === "Address" ? el.address : el.name,
                    label: filter === "Address" ? el.address : el.name,
                    key: el.id,
                    props: el.id
                })
        )
        return tmp
    };

    const renderBuildings = (element) => {
        let res = buildings.find(el =>
            filter === "Address" ? el.address === element : el.name === element,
        )
        setBuildingsFilter([res])
    };

    const updateBuilding = async (buildingId) => {
        let data = {
            name,
            contact,
            address,
            type,
        }
        setMessage("Updating...")
        setShow(true)
        await api.buildings.updateBuilding(buildingId, data).then(res => {
        }).catch(err => { setShow(false); message.error("Error...") })
        await api.buildings.fetchBuildings(user._id).then((res) => {
            dispatch(fetchBuildings(res))
            setBuildingsFilter(res)
            setTimeout(() => {
                setShow(false)
                message.success("Updated successfully")
            }, 1000);
        })
    }

    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            {show && <LoadingSpinner message={myMessage}></LoadingSpinner>}
            <Row gutter={[16, 16]} >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Buildings</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Buildings Portfolio"
                subTitle="Browse and check your buildings"
                onBack={() => navigate("/Dashboard")}
            />
            <Row style={{ width: "100%" }}>
                <Input.Group compact>
                    <Select
                        onChange={(val) => setFilter(val)}
                        defaultValue="Address"
                        style={{ width: "35%" }}
                    >
                        <Option value="Address">Address</Option>
                        <Option value="Building">Building</Option>
                    </Select>
                    <AutoComplete
                        allowClear
                        onClear={() => setBuildingsFilter(buildings)}
                        style={{ width: "65%" }}
                        dataSource={renderItem()}
                        onSelect={(d, da) => renderBuildings(da.value)}
                    >
                        <Search placeholder="Search by Name"
                        />
                    </AutoComplete>
                </Input.Group>
            </Row>
            {
                buildingsFilter === null || buildingsFilter.length === 0 ?
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
                    buildingsFilter.map((item) =>
                        <div style={{ paddingTop: "32px" }} key={item._id}>
                            <Card bodyStyle={{ padding: "0", marginBottom: "32px", borderRadius: "10px" }} headStyle={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", backgroundColor: "#0010f7" }} style={{ borderRadius: "10px" }}
                                title={
                                    <Row >
                                        <Col span={24}>
                                            <Row justify="space-between" align="middle">
                                                <h3 style={{ color: "white" }}>{item.name}</h3>
                                                <Radio.Group value="default" >
                                                    <Radio.Button type="primary" onClick={() => {
                                                        setIsModalVisible(true);
                                                        setName(item.name);
                                                        setContact(item.contact);
                                                        setAddress(item.address);
                                                        setType(item.type);
                                                        setBuildingId(item._id)
                                                    }}>Edit</Radio.Button>
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
                                }
                            >
                                <Row justify="space-between" gutter={[32, 0]} style={{ marginBottom: "32px", padding: "16px" }}>
                                    <Col span={10} >
                                        <Map lat={item.lat} lng={item.long} />
                                    </Col>
                                    <Col span={12}>
                                        <p>Building Name</p>
                                        <Input value={item.name} readOnly></Input>
                                        <p style={{ marginTop: "22px" }}>Contact Name</p>
                                        <Input value={item.contact} readOnly></Input>
                                        <p style={{ marginTop: "22px" }}>Address</p>
                                        <Input value={item.address} readOnly></Input>
                                        <p style={{ marginTop: "22px" }}>Building Type</p>
                                        <Input value={item.type} readOnly></Input>
                                    </Col>
                                </Row>

                                <Collapse style={{ border: 0, }} accordion isActive={collapse} collapsible="header">
                                    <Collapse.Panel isActive={collapse} style={{ border: 0 }} showArrow={false} collapsible="header"
                                        header={<Button style={{ borderRadius: 10 }} type={collapse ? "default" : "primary"} size="large" onClick={() => setCollapse(!collapse)}> {collapse ? "Close" : "Open"}</Button>}
                                        key="1">
                                        <Row justify="space-between" style={{ marginBottom: "32px", padding: "32px" }} gutter={[32, 32]}>
                                            {showBills("Electric", item.organizationId) &&
                                                <Col span={24}>
                                                    <StatsCard
                                                        color={"#ebfafa"}
                                                        chart={<ReactApexChart options={linear('Consumed Electricity', "watt").options} series={getData(item._id, "Electric")} type="line" height={350} />}
                                                    />
                                                </Col>}
                                            {showBills("Water", item.organizationId) && <Col span={24}>
                                                <StatsCard
                                                    color={"#ebfafa"}
                                                    chart={<ReactApexChart options={linear('Consumed Water', "liter").options} series={getData(item._id, "Water")} type="line" height={350} />}
                                                />
                                            </Col>}
                                            {showBills("Gas", item.organizationId) && <Col span={24}>
                                                <StatsCard
                                                    color={"#ebfafa"}
                                                    chart={<ReactApexChart options={linear('Consumed Gas', "m³").options} series={getData(item._id, "Gas")} type="line" height={350} />}
                                                />
                                            </Col>}
                                        </Row>
                                    </Collapse.Panel>
                                </Collapse>
                            </Card>
                        </div>
                    )
            }
            <EditBuildingModal setName={(val) => setName(val)} setContact={(val) => setContact(val)} setType={(val) => setType(val)}
                buildingId={buildingId} name={name} contact={contact} address={address} type={type} visible={isModalVisible} setVisible={() => setIsModalVisible(false)} updateBuilding={() => updateBuilding(buildingId)} />

        </Layout >
    );
}
export default ({ updateRoute }) => <BuildingTab updateRoute={() => updateRoute()} />
