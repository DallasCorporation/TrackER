import { createFromIconfontCN } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Form, Layout, message, Row } from "antd"
import Col from "antd/es/grid/col";
import Input from "antd/lib/input/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { fetchBuildings } from "../../reducers/buildings";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_z6cm66hvkag.js',
});

const AddNewBuildings = ({ user }) => {

    const [options, setOptions] = useState([])
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [lat, setLat] = useState(0)
    const [long, setLon] = useState(0)
    const [sqft, setSqft] = useState(0)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const onSelect = (tmp) => {
        setAddress(tmp)
        let res = options.filter((el) => el.value == tmp)[0].props
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
                console.log(tmp)
            })
            .catch(error => console.log('error', error));
    }

    const addBuilding = () => {
        let data = {
            name,
            contact,
            userId: user._id,
            address,
            organizationId: "62d1472a348c75187e0743a0",
            sqft,
            type: "School",
            lat,
            long,
        }
        setShow(true)
        api.buildings.addBuilding(data).then(res => {
           
            api.buildings.fetchBuildings(user._id).then((res) => {
                dispatch(fetchBuildings(res))
                setTimeout(() => {
                    setShow(false)
                    message.success("Building created!")
                }, 1000);
            })
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
            {show && <LoadingSpinner message={"Deleting..."}></LoadingSpinner>}
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Buildings</Breadcrumb.Item>
                    <Breadcrumb.Item>Create Building</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
                <Col lg={12} md={6} sx={6}>
                    <Col lg={24} md={6} sx={6}>
                        <Form.Item
                            name="name"

                            rules={[{ required: true, message: 'Please input the building name' }]}
                        >
                            <Input onChange={(e) => setName(e.target.value)} allowClear style={{ height: 50 }} placeholder="Name of the building" prefix={<IconFont type="i-user" />} />
                        </Form.Item>
                    </Col>

                    <Col lg={24} md={6} sx={6}>
                        <Form.Item
                            name="Contact Name"

                            rules={[{ required: true, message: 'Please input the building name' }]}
                        >
                            <Input onChange={(e) => setContact(e.target.value)} allowClear style={{ height: 50 }} placeholder="Contact name of the owner" prefix={<IconFont type="i-user" />} />
                        </Form.Item>
                    </Col>
                    <Col lg={24} md={6} sx={6}>
                        <Form.Item
                            name="Building type"

                            rules={[{ required: true, message: 'Please input the building type' }]}
                        >
                            <Input allowClear style={{ height: 50 }} placeholder="Building type" prefix={<IconFont type="i-user" />} />
                        </Form.Item>
                    </Col>
                    <Col lg={24} md={6} sx={6}>
                        <Form.Item
                            name="Building sqft"

                            rules={[{ required: true, message: 'Please input the building name' }]}
                        >
                            <Input onChange={(e) => setSqft(e.target.value)} type={"number"} allowClear style={{ height: 50 }} placeholder="Building type" prefix={<IconFont type="i-user" />} />
                        </Form.Item>
                    </Col>
                </Col>
                <Col lg={12}>
                    <Col lg={22} md={6} sx={6}>
                        <Form.Item
                            name="Address"
                            rules={[{ required: true, message: 'Please input the building name' }]}
                        >
                            <AutoComplete allowClear style={{ height: 50 }} placeholder="Address of the building" prefix={<IconFont type="i-user" />}
                                onSearch={(e) => handleCoords(e)} options={options} onSelect={onSelect} />
                        </Form.Item>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col lg={24} align="middle">
                    <Button onClick={() => addBuilding()}>Add</Button>
                </Col>
            </Row>
        </Layout>
    )
}
export default AddNewBuildings