import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import "./style.css"

const KpiCard = ({ bills, item }) => {
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
        let buildingBills = bills.all.find(el => el.buildingId === item._id).bills
        buildingBills.map(el => {
            setElectric((old) => old + el.electric)
            setWater((old) => old + el.water)
            setGas((old) => old + el.gas)
        })
    }, [bills])


    return (
        <Row align="top" gutter={[32, 32]} >
            <Col span={8}>
                <Card class="kpi" hoverable style={{ borderRadius: 20, }}>
                    <Row justify="space-between" align="middle">
                        <Col span={5}>
                            <span style={{ color: "#1196db", }} class="anticon iconfontMedium2">&#xe64c;</span>
                        </Col>
                        <Col span={19} >
                            <Statistic title={`Electricity Consumption`} value={metricElectric ? electric / 1000 : electric} suffix={metricElectric ? "Kilowatt (kW)" : "Watt"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <span onClick={() => setMetricElectric(!metricElectric)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricElectric ? "Kilowatt (kW)" : "Watt"}</p>
                    </Row>
                </Card>
            </Col>

            <Col span={8}>
                <Card class="kpi" hoverable style={{ borderRadius: 20, }}>
                    <Row justify="space-between" align="middle">
                        <Col span={5}>
                            <span style={{ color: "#1196db" }} class="anticon iconfontMedium2">&#xe662;</span>
                        </Col>
                        <Col span={19} >
                            <Statistic title="Water Consumption" value={metricWater ? water * 0.0001666667 : water} suffix={metricWater ? "Liter/Hours (l/h)" : "Liter"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <span onClick={() => setMetricWater(!metricWater)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricWater ? "Liter/Hours (l/h)" : "Liter"}</p>
                    </Row>
                </Card>
            </Col>

            <Col span={8}>
                <Card class="kpi" hoverable style={{ borderRadius: 20, }}>
                    <Row justify="space-between" align="middle">
                        <Col span={5}>
                            <span style={{ color: "#1196db" }} class="anticon iconfontMedium2">&#xe657;</span>
                        </Col>
                        <Col span={19} >
                            <Statistic title={`Gas Consumption`} value={metricGas ? gas * 0.0454249414 / 1000 : gas} suffix={metricGas ? "Gas/m³" : "Gallon"} precision={2} />
                        </Col>
                    </Row>
                    <Row align="middle" >
                        <span onClick={() => setMetricGas(!metricGas)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                        <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricGas ? "Gas/m³" : "Gallon"}</p>
                    </Row>
                </Card>
            </Col>
        </Row>
    )

}
export default KpiCard