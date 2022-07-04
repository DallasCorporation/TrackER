import { AutoComplete, Avatar, Button, Card, Col, Input, Layout, List, PageHeader, Row, Select } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../api";
import { fetchBuildings } from "../../reducers/buildings";
import Map from './Map';


const Kpi = styled.p`
font-size:22px
`

const { Option } = Select;
const { Search } = Input;


const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
];

const BuildingTab = () => {
    // const refresh = async () => {
    //     await api.buildings.fetchBuildings(user._id).then((res) => {
    //         dispatch(fetchBuildings(res))
    //     })
    // }
    axios.get(`http://api.positionstack.com/v1/forward?access_key=42400f2d6d777645ac7654f315483bda&query=cesena`)
    const buildings = useSelector((state) => state.buildings.buildings)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const deleteBuilding = async (id) => {
        await api.buildings.deleteBuilding(id)
        await api.buildings.fetchBuildings(user._id).then((res) => {
            dispatch(fetchBuildings(res))
        })
        
    }
    console.log(user)
    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
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
                        filterOption={(inputValue, option) =>
                            option.props.children
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        dataSource={options}
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
            {/* <Button onClick={() => refresh()}>Refresh</Button> */}
            <List
                style={{ marginTop: "32px" }}
                itemLayout="horizontal"
                dataSource={buildings}
                renderItem={item => (
                    <Card bodyStyle={{ padding: "0", marginBottom: "32px" }} >
                        <Row >
                            <Col lg={24} md={24} sx={24}>
                                <Row justify="space-between" align="middle" style={{ backgroundColor: "#0010f7", height: "50px", padding: "10px" }}>
                                    <h3 style={{ color: "white" }}>Name of the building</h3>
                                    <Button onClick={() => deleteBuilding(item._id)}>Delete</Button>
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
                                <p>Contact Name</p>
                                <Input value={item.contact} readOnly></Input>
                            </Col>
                            <Col lg={8} md={8} sx={8}>
                                <p>Building Address</p>
                                <Input value={item.address} readOnly></Input>
                                <p>Building Type</p>
                                <Input value={item.type} readOnly></Input>
                            </Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: "32px", padding: "32px" }}>
                            <Col lg={5} md={5} sx={5}>
                                <Card style={{ borderRadius: "10px" }}>
                                    <h4>Titolo uno</h4>
                                    <p>Consumo corrente</p>
                                </Card>
                            </Col>
                            <Col lg={5} md={5} sx={5}>
                                <Card style={{ borderRadius: "10px" }}>
                                    <h4>Titolo due</h4>
                                    <p>Consumo corrente</p>
                                </Card>
                            </Col>
                            <Col lg={5} md={5} sx={5}>
                                <Card style={{ borderRadius: "10px" }}>
                                    <h4>Titolo tre</h4>
                                    <p>Consumo corrente</p>
                                </Card>
                            </Col>
                            <Col lg={5} md={5} sx={5}>
                                <Card style={{ borderRadius: "10px" }}>
                                    <h4>Titolo quattro</h4>
                                    <p>Consumo corrente</p>
                                </Card>
                            </Col>
                        </Row>
                        <Col align="center">
                            <Button>Open</Button>
                        </Col>

                    </Card>

                )}
            />
        </Layout>
    );
}
export default () => <BuildingTab />
