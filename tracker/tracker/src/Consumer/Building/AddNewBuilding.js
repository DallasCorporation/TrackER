import { AutoComplete, Avatar, Breadcrumb, Button, Card, Form, Layout, message, PageHeader, Row, Select } from "antd"
import Col from "antd/es/grid/col";
import Input from "antd/lib/input/Input";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { fetchBuildings } from "../../reducers/buildings";
import { setAllOrganization } from "../../reducers/allOrganization";
import { AccountSubTitle } from "../../Components/CustomComponents"
import { useEffect } from "react";
import BuildingOptions from "./BuildingOptions";
import { ExpandAltOutlined } from '@ant-design/icons';
import "./style.css"
import { useNavigate } from "react-router-dom";

const AddNewBuildings = ({ user, socket }) => {
    const dispatch = useDispatch()
    const [options, setOptions] = useState([])
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [type, setType] = useState("")
    const [lat, setLat] = useState(0)
    const [long, setLon] = useState(0)
    const [sqft, setSqft] = useState(0)
    const [allOrganizations, setOrganizations] = useState([])
    const [organizationId, setOrganization] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrganization = async () => {
            await api.organization.fetch().then(res => {
                setOrganizations(res)
                dispatch(setAllOrganization(res))
            })
        }
        fetchOrganization()
    }, [])

    const onSelect = (tmp) => {
        setAddress(tmp)
        let res = options.filter((el) => el.value === tmp)[0].props
        setLat(res.lat)
        setLon(res.lon)
    };

    const handleCoords = async (address) => {
        var requestOptions = {
            method: 'GET',
        };
        let tmp = []
        await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=811f21d574e34738a95aca463b9dfd74`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                result.results.forEach(element => {
                    tmp.push({
                        label: element.formatted,
                        value: element.formatted,
                        key: element.place_id,
                        props: element
                    })
                });
                setOptions(tmp)
            })
            .catch(error => console.log('error', error));
    }

    const addBuilding = async () => {
        if (name === "" || contact === "" || address === "" || sqft === "" || type === "" || organizationId === [])
            message.error("Fill the form to submit a building")
        let data = {
            name,
            contact,
            userId: user._id,
            address,
            sqft,
            type,
            lat,
            long,
            organizationId: organizationId
        }
        let orgCopy = allOrganizations.find(el => el._id === organizationId)
        let customers = orgCopy.customers
        setShow(true)
        await api.buildings.addBuilding(data).then(async res => {
            setTimeout(() => {
                setShow(false)
                message.success("Building created!")
                socket.emit("newBuilding", { sender: user._id, receiver: organizationId })
            }, 1000);
        }).catch(err => {
            console.log(err)
            setTimeout(() => {
                setShow(false)
                message.error("Building not created!")
            }, 1000);
        })
        await api.buildings.fetchBuildings(user._id).then((res) => {
            dispatch(fetchBuildings(res))
        })
    }

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >


            {show && <LoadingSpinner message={"Creating new building..."}></LoadingSpinner>}
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Buildings</Breadcrumb.Item>
                    <Breadcrumb.Item>Create Building</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Create Building"
                subTitle="Add a new Building to your account"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, marginTop: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                <AccountSubTitle style={{ marginLeft: 15 }}>Add a new building to your account</AccountSubTitle>
                <Row gutter={[32, 0]} style={{ marginTop: "32px", }}>
                    <Col lg={12} md={24}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input onChange={(e) => setName(e.target.value)} allowClear size="large" placeholder="Building Name" prefix={<span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100db;</span>} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                name="Contact Name"

                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input onChange={(e) => setContact(e.target.value)} allowClear size="large" placeholder="Building Owner Name" prefix={<span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100e5;</span>} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="Building type"
                                rules={[{ required: true, message: 'Please input the building type' }]}
                            >
                                <BuildingOptions setType={setType} />
                            </Form.Item>
                        </Col>
                    </Col>
                    <Col lg={12} md={24}>
                        <Col span={24}>
                            <Form.Item size="large" rules={[{ required: true, message: 'Please input the building size' }]}
                            >
                                <Input size="large" onChange={(e) => setSqft(e.target.value)} min={1} type={"number"} allowClear placeholder="Building Size (Sqmt)" prefix={<ExpandAltOutlined style={{ fontSize: 25, paddingTop: 7, paddingBottom: 7, marginRight: 5 }} />} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="Address"
                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >

                                <AutoComplete
                                    className="test"
                                    style={{ height: 52.28 }}
                                    size="large" allowClear placeholder="Building Address"
                                    onSearch={(e) => handleCoords(e)} options={options} onSelect={onSelect} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item rules={[{ required: true, message: 'Please input the building organization' }]}>
                                <Select size="large"
                                    placeholder={<Row align="middle"><span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span> Building Organization</Row>}
                                    onChange={(val) => { setOrganization(val) }}>
                                    {allOrganizations.length > 0 && allOrganizations.map(el =>
                                        <Option key={el._id} value={el._id}>
                                            <Row align="middle">
                                                <Avatar src={el.icon} style={{ marginRight: 5 }} />{el.name}
                                            </Row>
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
                <Row align="middle" justify="end" style={{ marginRight: 22 }} >
                    <Button type="primary" style={{ borderRadius: 10 }} onClick={() => addBuilding()}>Add</Button>
                </Row>
            </Card>
        </Layout>
    )
}
export default AddNewBuildings