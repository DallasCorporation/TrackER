import { QuestionCircleOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Card, Col, Collapse, Empty, Input, Layout, PageHeader, Popconfirm, Radio, Row, Select, Modal, message } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import { fetchBuildings } from "../../reducers/buildings";
import MapboxMap from './MapboxMap';
import LoadingSpinner from '../../Components/LoadingSpinner';
import StatsCard from "../DashboardCards/StatsCard";
import { linear } from "../utils";
import ReactApexChart from "react-apexcharts";
import "./style.css"
import moment from "moment";
import EditBuildingModal from "./EditBuildingModal";
import { useNavigate } from "react-router-dom";
import BuildingCard from "./BuildingCard";
const { Option } = Select;
const { Search } = Input;

const BuildingTab = ({ updateRoute, socket }) => {
    const buildings = useSelector((state) => state.buildings.buildings)
    const user = useSelector((state) => state.user.user)
    const allOrg = useSelector((state) => state.allOrganization.organization)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
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
        window.scroll(0, 0)
    }
    const getBills = async () => {
        await api.bills.getBillsAggregated(user._id).then(res => setBills(res))
    }

    useEffect(() => {
        getBills()
        window.scroll(0, 0)
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
                        onClear={() => {
                            setBuildingsFilter(buildings)
                            window.scroll(0, 0)
                        }}
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
                    buildingsFilter.map((item) => <BuildingCard socket={socket} key={item._id} bills={bills} deleteBuilding={deleteBuilding} getData={getData} setAddress={setAddress} setBuildingId={setBuildingId} setContact={setContact} item={item} setIsModalVisible={setIsModalVisible} setName={setName} setType={setType} showBills={showBills} />)
            }
            <EditBuildingModal setName={(val) => setName(val)} setContact={(val) => setContact(val)} setType={(val) => setType(val)}
                buildingId={buildingId} name={name} contact={contact} address={address} type={type} visible={isModalVisible} setVisible={() => setIsModalVisible(false)} updateBuilding={() => updateBuilding(buildingId)} />
        </Layout >
    );
}
export default ({ updateRoute, socket }) => <BuildingTab socket={socket} updateRoute={() => updateRoute()} />
