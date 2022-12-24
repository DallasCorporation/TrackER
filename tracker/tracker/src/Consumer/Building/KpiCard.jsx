import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import { IconFont } from "../utils"
import "./style.css"

const KpiCard = ({ bills, gasVisible, waterVisible, electricVisible }) => {
    const [metricGas, setMetricGas] = useState(false)
    const [metricWater, setMetricWater] = useState(false)
    const [metricElectric, setMetricElectric] = useState(false)
    const [electric, setElectric] = useState(0)
    const [gas, setGas] = useState(0)
    const [water, setWater] = useState(0)


    useEffect(() => {
        setElectric(0)
        setGas(0)
        setWater(0)
        if (bills === null || bills === undefined)
            return
        bills.bills.map(bill => {
            setElectric((old) => old + bill.electric)
            setWater((old) => old + bill.water)
            setGas((old) => old + bill.gas)
        })
    }, [bills])


    const getWindowSize = () => {
        const { innerWidth } = window;
        return innerWidth;
    }
    const [width, setWindowSize] = useState(getWindowSize());
    const handleWindowResize = () => {
        setWindowSize(getWindowSize());
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Row align="top" gutter={[32, 32]} >
            <Col md={8} sm={24} xs={24} >
                <Card class="kpi" hoverable style={{ borderRadius: 20, cursor: "default" }} onClick={() => electricVisible(true)}>
                    <Row gutter={[32, 32]} justify={width <= 768 ? "center" : "space-between"} align="middle">
                        <Col md={6} sm={24} xs={24}>
                            <IconFont type="i-Energy" style={{ fontSize: 45, color: "#1196db" }} />
                        </Col>
                        <Col md={18} sm={24} xs={24}>
                            <Statistic title={`Electricity Consumption`} value={metricElectric ? electric / 1000 : electric} suffix={metricElectric ? "Kilowatt (kW)" : "Watt"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <span onClick={() => setMetricElectric(!metricElectric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} class="anticon iconfont">&#xe615;</span>
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricElectric ? "Kilowatt (kW)" : "Watt"}</p>
                    </Row>
                </Card>
            </Col>

            <Col md={8} sm={24} xs={24}>
                <Card class="kpi" hoverable style={{ borderRadius: 20, cursor: "default" }} onClick={() => waterVisible(true)}>
                    <Row gutter={[32, 32]} justify={width <= 768 ? "center" : "space-between"} align="middle">
                        <Col md={6} sm={24} xs={24}>
                            <IconFont type="i-water" color="#1196db" style={{ fontSize: 45, color: "#1196db" }} />
                        </Col>
                        <Col md={18} sm={24} xs={24}>
                            <Statistic title="Water Consumption" value={metricWater ? water * 0.0001666667 : water} suffix={metricWater ? "Liter/Hours (l/h)" : "Liter"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <span onClick={() => setMetricWater(!metricWater)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} class="anticon iconfont">&#xe615;</span>
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricWater ? "Liter/Hours (l/h)" : "Liter"}</p>
                    </Row>
                </Card>
            </Col>

            <Col md={8} sm={24} xs={24}>
                <Card class="kpi" hoverable style={{ borderRadius: 20, cursor: "default" }}>
                    <Row gutter={[32, 32]} justify={width <= 768 ? "center" : "space-between"} align="middle" onClick={() => gasVisible(true)}>
                        <Col md={6} sm={24} xs={24}>
                            <IconFont type="i-fire-line" style={{ fontSize: 45, color: "#1196db" }} />
                        </Col>
                        <Col md={18} sm={24} xs={24}>
                            <Statistic title={`Gas Consumption`} value={metricGas ? gas * 0.0454249414 / 1000 : gas} suffix={metricGas ? "Gas/m³" : "Gallon"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <span onClick={() => setMetricGas(!metricGas)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} class="anticon iconfont">&#xe615;</span>
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricGas ? "Gas/m³" : "Gallon"}</p>
                    </Row>
                </Card>
            </Col>
        </Row>
    )

}
export default KpiCard