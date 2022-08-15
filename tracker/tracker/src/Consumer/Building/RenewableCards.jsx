import { Card, Col, Modal, Row, Statistic } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"

const RenewableCards = ({ item, bills, resources }) => {

    const getData = (filter) => {
        let resArray = resources.map(el => Object.keys(el)[0])
        let data = []
        if (bills.all === undefined)
            return []
        let test = bills.all.find(el => el.buildingId === item._id)
        if (test === undefined) {
            return []
        }
        test.bills.map(el => {
            el["resources"].forEach(element => {
                if (resArray.includes(Object.keys(element)[0]) && Object.keys(element)[0] === filter) {
                    data.push({
                        x: moment.utc(el.date).local().format(),
                        y: Number(Object.values(element)).toFixed(2)
                    })
                }
            })
        })
        let series = [{
            name: filter,
            data: data
        }]
        return series
    }

    const getAllData = () => {
        let resArray = resources.map(el => Object.keys(el)[0])
        if (bills.all === undefined)
            return []
        let test = bills.all.find(el => el.buildingId === item._id)
        if (test === undefined) return []
        test.bills.map(el => {
            el["resources"].forEach(element => {
                if (resArray.includes(Object.keys(element)[0])) {
                    switch (Object.keys(element)[0]) {
                        case "Solar":
                            setSolarSum((old) => old + Number(Object.values(element)))
                            setTotalSum((old) => old + + Number(Object.values(element)))
                            break;
                        case "Hydro":
                            setHydroSum((old) => old + Number(Object.values(element)))
                            setTotalSum((old) => old + + Number(Object.values(element)))
                            break;
                        case "Geo":
                            setGeoSum((old) => old + Number(Object.values(element)))
                            setTotalSum((old) => old + + Number(Object.values(element)))
                            break;
                        case "Wind":
                            setWindSum((old) => old + Number(Object.values(element)))
                            setTotalSum((old) => old + + Number(Object.values(element)))
                            break;
                        default:
                            break;
                    }
                }
            })
        })
    }

    const [visible, setVisible] = useState(false)
    const [filter, setFilter] = useState("")
    const [geoSum, setGeoSum] = useState(0)
    const [hydroSum, setHydroSum] = useState(0)
    const [windSum, setWindSum] = useState(0)
    const [solarSum, setSolarSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [metric, setMetric] = useState(true)

    useEffect(() => {
        getAllData()
    }, [])


    const renderData = (filter) => {
        console.log(getData(filter))

    }


    return (
        <Row justify="center" gutter={[32, 32]}>
            <Col span={24}>
                <Statistic title="Total Electric Usage" value={metric ? totalSum / 1000 : totalSum} suffix={metric ? "KiloWatt (kW)" : "Watt"} precision={2} />
                <Row align="middle">
                    <span onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                    <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Total in Kilowatt (kW)" : "Total in Watt (W)"}</p>
                </Row>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Solar")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Solar Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe65f;</span>
                    <Statistic value={!metric ? solarSum : solarSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Hydro")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Hydro Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe650;</span>
                    <Statistic value={!metric ? hydroSum : hydroSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Wind")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Windy Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe661;</span>
                    <Statistic value={!metric ? windSum : windSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Geo")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Geothermic Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe64b;</span>
                    <Statistic value={!metric ? geoSum : geoSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Modal visible={visible} onCancel={() => setVisible(false)} width={800} title={"Total " + filter + " Production"}>
                {renderData(filter)}
            </Modal>
        </Row >
    )
}
export default RenewableCards