import { InfoCircleOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Card, Col, Collapse, Divider, Modal, Popconfirm, Radio, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import StatsCard from "../DashboardCards/StatsCard";
import { IconFont, linear } from "../utils";
import KpiCard from "./KpiCard";
import MapboxMap from "./MapboxMap";
import RenewableCards from "./RenewableCards";
import ResourcesModal from "./Resources/ResourcesModal";
import { isMobile } from "react-device-detect";
import SeismographCard from "../DashboardCards/SeismographCard";
import TemperatureCard from "../DashboardCards/TemperatureCard";

const BuildingCard = ({ bills, item, setIsModalVisible, setContact, setName, setAddress, setType, setBuildingId, getData }) => {
    const [collapse, setCollapse] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleElec, setVisibleElec] = useState(false)
    const [visibleWater, setVisibleWater] = useState(false)
    const [visibleGas, setVisibleGas] = useState(false)
    const [visibleQuake, setVisibleQuake] = useState(false)

    return (
        <div style={isMobile ? {} : { paddingTop: "32px" }} key={item._id}>
            <Card bodyStyle={{ padding: "0", marginBottom: "32px", borderRadius: "10px" }} headStyle={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", backgroundColor: "#0010f7" }} style={{ borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
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
                                        icon={<InfoCircleOutlined style={{ color: 'blue' }} />}
                                        title="This function is currently unavailable"
                                        okText="Ok"
                                        showCancel={false}
                                    >
                                        <Radio.Button>Delete</Radio.Button>
                                    </Popconfirm>
                                </Radio.Group>
                            </Row>
                        </Col>
                    </Row>
                }
            >
                <Row justify="space-between" gutter={[32, 32]} style={{ marginBottom: "32px", padding: "16px" }}>
                    <Col md={10} sm={24} >
                        <MapboxMap lat={item.lat} lng={item.long} />
                    </Col>
                    <Col md={12} sm={24}>
                        <ProForm grid layout="vertical" rowProps={{ gutter: [32, 32], }} submitter={{
                            submitButtonProps: { style: { display: 'none', }, }, resetButtonProps: { style: { display: 'none', }, },
                        }}>
                            <ProFormText allowClear={false} value={item.name} label="Building Name" placeholder="Building Name" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.contact} label="Contact Name" placeholder="Contact Name" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.type} label="Building Type" placeholder="Building Type" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.sqft} label="Building Dimension in Sqmt" placeholder="Building Type" colProps={{ span: 12 }} />
                            <ProFormText allowClear={false} value={item.address} label="Building Address" placeholder="Building Address" colProps={{ span: 24 }} />
                        </ProForm>
                        <Row justify="space-around">
                            <Tooltip title="Green House System monitoring">
                                <Col style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)", borderRadius: "50%", display: "inline-block", padding: 20 }}>
                                    <IconFont type="i-eco-house" style={{ fontSize: 60 }} />
                                </Col>
                            </Tooltip>
                            <Tooltip title="Solar PV Installed">
                                <Col style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)", borderRadius: "50%", display: "inline-block", padding: 20 }}>
                                    <IconFont type="i-solar-panels" style={{ fontSize: 60 }} />
                                </Col>
                            </Tooltip>
                            <Tooltip title="Earthquake Sensor Installed">
                                <Col style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)", borderRadius: "50%", display: "inline-block", padding: 20, cursor: "pointer" }} onClick={() => setVisibleQuake(true)}>
                                    <IconFont type="i-357earthquake" style={{ fontSize: 60 }} />
                                </Col>
                            </Tooltip>
                            <TemperatureCard outText />

                        </Row>
                    </Col>
                </Row>
                <Collapse style={{ border: 0, }} accordion isActive={collapse} collapsible="header" >
                    <Collapse.Panel isActive={collapse} style={{ border: 0 }} showArrow={false} collapsible="header"
                        header={<Button style={{ borderRadius: 10 }} type={collapse ? "default" : "primary"} size="large" onClick={() => setCollapse(!collapse)}> {collapse ? "Close" : "Open"}</Button>}
                        key="1">
                        <Row justify="space-between" style={{ marginBottom: "32px", padding: "32px" }} gutter={[32, 32]}>
                            <Col span={24}>
                                <KpiCard bills={bills} item={item} gasVisible={setVisibleGas} waterVisible={setVisibleWater} electricVisible={setVisibleElec} />
                            </Col>
                            {!isMobile &&
                                <>
                                    <Divider />
                                    <Col span={24}>
                                        <StatsCard chart={<ReactApexChart options={linear('Consumed Electricity', "watt", "#1984f5").options} series={getData("Electric")} type="area" height={350} />} />
                                    </Col>
                                    <Col span={24}>
                                        <StatsCard chart={<ReactApexChart options={linear('Consumed Water', "liter", "#00c2f6").options} series={getData("Water")} type="area" height={350} />} />
                                    </Col>
                                    <Col span={24}>
                                        <StatsCard chart={<ReactApexChart options={linear('Consumed Gas', "m³", "#00cbc8").options} series={getData("Gas")} type="area" height={350} />} />
                                    </Col>
                                </>
                            }
                            <Col span={24} style={{ marginTop: 22 }}>
                                <Row justify="center" >
                                    <RenewableCards bills={bills} item={item} resources={item.resources} />
                                </Row>
                            </Col>
                        </Row>
                    </Collapse.Panel>
                </Collapse>
            </Card >
            <ResourcesModal building={item} visible={visible} setVisible={setVisible} data={item.resources} />
            <Modal visible={visibleQuake} width={1200} cancelButtonProps={{ style: { display: 'none' } }} onOk={() => setVisibleQuake(false)} >
                <SeismographCard />
            </Modal>
            {isMobile &&
                <>
                    <Modal cancelButtonProps={{ style: { display: 'none' } }} visible={visibleElec} onOk={() => setVisibleElec(false)}>
                        <StatsCard chart={<ReactApexChart options={linear('Consumed Electricity', "watt", "#1984f5").options} series={getData("Electric")} type="area" height={350} />} />
                    </Modal>
                    <Modal visible={visibleWater} cancelButtonProps={{ style: { display: 'none' } }} onOk={() => setVisibleWater(false)}>
                        <StatsCard chart={<ReactApexChart options={linear('Consumed Water', "liter", "#00c2f6").options} series={getData("Water")} type="area" height={350} />} />
                    </Modal>
                    <Modal visible={visibleGas} cancelButtonProps={{ style: { display: 'none' } }} onOk={() => setVisibleGas(false)}>
                        <StatsCard chart={<ReactApexChart options={linear('Consumed Gas', "m³", "#00cbc8").options} series={getData("Gas")} type="area" height={350} />} />
                    </Modal>
                </>
            }
        </div >
    )
}
export default BuildingCard