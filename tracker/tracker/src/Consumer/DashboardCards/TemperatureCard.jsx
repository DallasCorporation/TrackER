import { ProCard } from "@ant-design/pro-components"
import { Card, Col, Divider, Layout, Modal, PageHeader, Row, Statistic } from "antd"
import { IconFont } from "../utils"
import React, { useEffect, useState } from "react"
import { CardTitle } from "../../Components/CustomComponents"
import api from "../../api"
import { isMobile } from "react-device-detect"

const TemperatureCard = () => {
    const [temperature, setTemperature] = useState(18)
    const [humidity, setHumidity] = useState(18)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [allData, setAllData] = useState([])
    const [visible, setVisible] = useState(false)
    const [metric, setMetric] = useState(false)
    const fetchTemperature = async () =>
        await api.temperature.get().then(res => {
            setTemperature(res.currentTemperature)
            setHumidity(res.currentHumidity)
            setAllData(res)
        })

    useEffect(() => {
        fetchTemperature()
        setInterval(() => {
            let nwDate = new Date();
            setCurrentTime(nwDate)
        }, 1000);
    }, [])

    return (
        <>
            <ProCard onClick={() => setVisible(true)} bordered style={{ borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row justify="space-between" align="middle">
                    <CardTitle >Time & Temperature</CardTitle>
                </Row>
                <Row justify="center" align="middle">
                    <Statistic value={temperature + "°"} />
                    <IconFont type="i-Temperature" style={{ fontSize: 60 }} />
                    <Statistic value={currentTime.toLocaleTimeString()} />
                </Row>
            </ProCard>
            <Modal width={1000} visible={visible} destroyOnClose onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
                <>
                    <Layout
                        className="site-layout-background"
                        style={isMobile ? {} : {
                            padding: 30
                        }}
                    >
                        <PageHeader
                            style={{ paddingLeft: 0 }}
                            className="site-page-header"
                            title={"Temperature Analysis"}
                            subTitle={isMobile ? "" : "Check your house temperature and humidity"}
                        />
                        <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                            <Row align="top" gutter={[32, 32]} >
                                <Col span={12}>
                                    <Statistic title={`Total  Production`} value={metric ? temperature : temperature * 1.8 + 32} suffix={metric ? "Celsius" : "Fahrenheit"} precision={2} />
                                    <Row align="middle">
                                        <span onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} class="anticon iconfont">&#xe615;</span>
                                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Celsius" : "Fahrenheit"}</p>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider />

                            {/* {allBills.length > 0 ?
                            <>
                                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                                    <Col span={24}>
                                        <p style={{ fontSize: 18, fontWeight: 500 }}> {filter} Production</p>
                                        <ReactApexChart options={optionsLine} series={[{ data: allBills }]} type="line" height={320} />
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                                    <Col span={24}>
                                        <p style={{ fontSize: 18, fontWeight: 500 }}> Total Profit</p>
                                        <ReactApexChart options={optionsBar} series={getSeries()} type="bar" height={250} />
                                    </Col>
                                </Row>
                            </> :
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{ height: 100, }}
                                description={<span>  This building has <a>NO {filter}</a> resources installed yet</span>}
                            >
                                <Button onClick={() => setVisible1(true)} type="primary" style={{ borderRadius: 20 }}>Install One Now</Button>
                            </Empty>
                        } */}
                        </Card>
                    </Layout>
                </>
            </Modal>
        </>
    )
}
export default TemperatureCard