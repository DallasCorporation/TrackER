import { AutoComplete, Breadcrumb, Button, Card, Form, Layout, message, Row, Select } from "antd"
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


const AddNewBuildings = ({ user }) => {
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

    const addBuilding = () => {
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
        let orgCopy = allOrganizations.filter(el => el._id === organizationId)
        let customers = orgCopy[0].customers
        setShow(true)
        api.buildings.addBuilding(data).then(res => {
            customers.push({ user: user._id, building: res._id })
            orgCopy[0].customers = customers

            api.buildings.fetchBuildings(user._id).then((res) => {
                api.organization.update(organizationId, ...orgCopy).then((data1) => {
                    console.log(data1)
                })
                dispatch(fetchBuildings(res))
                setTimeout(() => {
                    setShow(false)
                    message.success("Building created!")
                }, 1000);
            })
        }).catch(err => {
            setTimeout(() => {
                setShow(false)
                message.error("Building not created!")
            }, 1000);
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
            <Card style={{ borderRadius: 20, marginTop: "32px", boxShadow: "0 2px 2px rgba(0,0,0,0.2)" }}>
                <AccountSubTitle style={{ marginLeft: 15 }}>Add a new building to your account</AccountSubTitle>
                <Row gutter={[32, 32]} style={{ marginTop: "32px", }}>
                    <Col lg={12} md={6} sx={6}>
                        <Col lg={24} md={6} sx={6}>
                            <Form.Item
                                name="name"

                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input onChange={(e) => setName(e.target.value)} allowClear size="large" placeholder="Building Name" prefix={<span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span>} />
                            </Form.Item>
                        </Col>

                        <Col lg={24} md={6} sx={6}>
                            <Form.Item
                                name="Contact Name"

                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input onChange={(e) => setContact(e.target.value)} allowClear size="large" placeholder="Building Owner Name" prefix={<span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100e5;</span>} />
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={6} sx={6}>
                            <Form.Item
                                name="Building type"
                                rules={[{ required: true, message: 'Please input the building type' }]}
                            >
                                <Select placeholder={<Row align="middle"><span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span> Building Type</Row>} size="large" onChange={(val) => setType(val)}>
                                    <Option value="School"><Row align="middle"><span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span> School</Row></Option>
                                    <Option value="Home"><Row align="middle"><span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span> Home</Row></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={6} sx={6}>
                            <Form.Item
                                name="Building sqmt"

                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <Input onChange={(e) => setSqft(e.target.value)} min={1} type={"number"} allowClear size="large" placeholder="Building Sqmt." prefix={<span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span>} />
                            </Form.Item>
                        </Col>
                    </Col>
                    <Col lg={12}>
                        <Col lg={24} md={6} sx={6}>
                            <Form.Item
                                name="Address"
                                rules={[{ required: true, message: 'Please input the building name' }]}
                            >
                                <AutoComplete size="large" allowClear placeholder="Building Address" prefix={<span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span>}
                                    onSearch={(e) => handleCoords(e)} options={options} onSelect={onSelect} />
                            </Form.Item>
                            <Form.Item
                                name="Building Organization"
                                rules={[{ required: true, message: 'Please input the building type' }]}
                            >
                                <Select
                                    placeholder={<Row align="middle"><span className="antioc iconfont" style={{ marginRight: 5 }}>&#x100dc;</span> Building Organization</Row>} size="large"
                                    onChange={(val) => { setOrganization(val) }}>
                                    {allOrganizations.length > 0 && allOrganizations.map(el =>
                                        <Option key={el._id} value={el._id}>
                                            {el.name}
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