import { createFromIconfontCN } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Form, Layout, Row } from "antd"
import Col from "antd/es/grid/col";
import Input from "antd/lib/input/Input";
import { useState } from "react";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_z6cm66hvkag.js',
});

const AddNewBuildings = ({ user }) => {

    const [options, setOptions] = useState([])

    const onSelect = (tmp) => {
        console.log('onSelect', tmp);
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
                        value: element.formatted + " (id: " + element.place_id + ")",
                        props: element
                    })
                });
                setOptions(tmp)

            })
            .catch(error => console.log('error', error));
    }

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
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
                            <Input allowClear style={{ height: 50 }} placeholder="Name of the building" prefix={<IconFont type="i-user" />} />
                        </Form.Item>
                    </Col>

                    <Col lg={24} md={6} sx={6}>
                        <Form.Item
                            name="Contact Name"

                            rules={[{ required: true, message: 'Please input the building name' }]}
                        >
                            <Input allowClear style={{ height: 50 }} placeholder="Contact name of the owner" prefix={<IconFont type="i-user" />} />
                        </Form.Item>
                    </Col>
                    <Col lg={24} md={6} sx={6}>
                        <Form.Item
                            name="Building type"

                            rules={[{ required: true, message: 'Please input the building name' }]}
                        >
                            <Input allowClear style={{ height: 50 }} placeholder="Building type" prefix={<IconFont type="i-user" />} />
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
                    <Button>Add</Button>
                </Col>
            </Row>
        </Layout>
    )
}
export default AddNewBuildings