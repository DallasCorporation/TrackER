import { ProCard } from "@ant-design/pro-components"
import { Card, Col, Divider, Layout, Modal, PageHeader, Row, Statistic, Tooltip } from "antd"
import { IconFont } from "../utils"
import React, { useEffect, useState } from "react"
import { CardTitle } from "../../Components/CustomComponents"
import api from "../../api"
import { isMobile } from "react-device-detect"
import ReactApexChart from "react-apexcharts"

const TemperatureCard = ({ outText = false }) => {
    const [temperature, setTemperature] = useState()
    const [humidity, setHumidity] = useState()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [visible, setVisible] = useState(false)
    const [metric, setMetric] = useState(true)
    const [historyTemperature, setHistoryTemperature] = useState([])
    const [historyHumidity, setHistoryHumidity] = useState([])
    const fetchTemperature = async () =>
        await api.temperature.get().then(res => {
            setTemperature(res.currentTemperature)
            setHumidity(res.currentHumidity)
            setHistoryTemperature(res.history.map(value => ({ x: value.date, y: value.temperature })))
            setHistoryHumidity(res.history.map(value => ({ x: value.date, y: value.humidity })))
        })

    useEffect(() => {
        fetchTemperature()
        setInterval(() => {
            fetchTemperature()
        }, 5000);
        setInterval(() => {
            let nwDate = new Date();
            setCurrentTime(nwDate)
        }, 1000);
    }, [])

    let options = {
        chart: {
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 200
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        legend: {
            show: true,
            hideOverlappingLabels: true,
        },
        xaxis: {
            labels: {
                format: 'dd-MM-yyyy HH:mm',
            },
            type: 'datetime',
        },
        tooltip: {
            enabled: true,
            followCursor: true,
            theme: "light",
            x: {
                show: true,
                format: "dd-MM-yyyy HH:mm"
            },
        },
    }

    return (
        <>
            {outText ?
                <Tooltip title="Temperature & Humidity Sensor Installed">
                    <Col onClick={() => setVisible(true)} style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)", borderRadius: "100%", display: "inline-block", padding: 20, cursor: "pointer" }}>
                        <Col style={{ paddingLeft: 12, paddingRight: 12 }}>
                            <IconFont type="i-Temperature" style={{ fontSize: 30 }} />
                        </Col>
                        <Col style={{ paddingLeft: 12, paddingRight: 12 }}>
                            <IconFont type="i-Humidity" style={{ fontSize: 30 }} />
                        </Col>
                    </Col>
                </Tooltip>
                :
                <ProCard onClick={() => setVisible(true)} bordered style={{ borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row justify="space-between" align="middle">
                        <CardTitle style={{ margin: 0 }} >Time & Humidity</CardTitle>
                        <Statistic valueStyle={{ fontSize: 18 }} value={currentTime.toLocaleTimeString()} />
                    </Row>
                    <Row justify="center" align="middle" style={{ marginTop: 12 }}>
                        <Statistic value={temperature} suffix="°" />
                        <IconFont type="i-Temperature" style={{ fontSize: 50 }} />
                        <Statistic value={humidity} suffix="%" />
                        <IconFont type="i-Humidity" style={{ fontSize: 40 }} />
                    </Row>
                </ProCard>
            }
            <Modal width={1000} visible={visible} destroyOnClose cancelButtonProps={{ style: { display: 'none' } }} onOk={() => setVisible(false)}>
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
                                    <Statistic title={`Actual Temperature`} value={metric ? temperature : temperature * 1.8 + 32} suffix={metric ? "Celsius" : "Fahrenheit"} precision={2} />
                                    <Row align="middle">
                                        <span onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} className="anticon iconfont">&#xe615;</span>
                                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Celsius" : "Fahrenheit"}</p>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Statistic title={`Actual Humidity`} value={humidity} suffix={"%"} precision={0} />
                                </Col>
                            </Row>
                            <Divider />
                            <ReactApexChart options={options} series={[{ name: "Temperature", data: historyTemperature }, { "name": "Humidity", data: historyHumidity }]} type="area" height={450} />
                        </Card>
                    </Layout>
                </>
            </Modal>
        </>
    )
}
export default TemperatureCard