import { Button, Card, Col, Divider, Empty, Modal, PageHeader, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import api from "../../api"
import { IconFont } from "../utils"
import ResourcesModal from "./Resources/ResourcesModal"
import { isMobile } from "react-device-detect"
let optionsBar = {
    chart: {
        type: 'bar',
        toolbar: { show: false, },
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        },
    },
    tooltip: {
        enabled: true,

        y: {
            formatter: function (val) {
                return val + "€"
            },
            title: {
                formatter: (seriesName, props) => {
                    return ["Total Earnings", "Installation Cost"][props.dataPointIndex]
                },
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Total Earnings", "Installation Cost"],
    }
}

let optionsLine = {
    legend: {
        position: "top",
        horizontalAlign: "center",
        align: "right"
    },
    chart: {
        id: 'area-datetime',
        type: 'area',
        autoSelected: 'selection',
        animations: {
            enabled: true,
            easing: 'easein',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
        },
        toolbar: { show: true, },
    },
    colors: ['#00E396'],
    stroke: {
        curve: 'smooth',
        width: 2,
        lineCap: 'butt',
    },
    dataLabels: {
        enabled: false
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return (val / 1000).toFixed(2) + " KW"
            },
        }
    },
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            show: true,
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy HH:mm"
        },
        y: {
            formatter: function (val) {
                return (val / 1000).toFixed(2) + "kW"
            },
            title: {
                formatter: () => {
                    return "Electric Usage"
                },
            },
        }
    }

}

const RenewableCards = ({ item, bills, resources }) => {

    const getAllData = async () => {
        setSolarSum(0)
        setTotalSum(0)
        setDeviceEarning(0)
        setDeviceCost(0)
        setAllBills([])
        if (bills === null || Object.keys(bills).length === 0)
            if (bills.bills === undefined)
                return []
        await api.renewable.fetchResourcesByBuildingId(bills.buildingId).then(res => res.map(devices => {
            setDeviceEarning((old) => old + devices.earning)
            setDeviceCost((old) => old + devices.price)
            bills.bills.map(el => {
                setSolarSum((old) => old + Number(el.solar))
                setTotalSum((old) => old + Number(el.solar))
                setAllBills((old) => [...old, [el.date, Number(el.solar).toFixed(2)]])
            })
        }))
    }

    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [filter, setFilter] = useState("")
    const [solarSum, setSolarSum] = useState(0)
    const [totalSum, setTotalSum] = useState(0)
    const [allBills, setAllBills] = useState([])
    const [deviceEarning, setDeviceEarning] = useState(0)
    const [deviceCost, setDeviceCost] = useState(0)
    const [metric, setMetric] = useState(true)

    useEffect(() => {
        setAllBills([])
        getAllData()
    }, [filter])


    const getSeries = () => [
        {
            data: [
                {
                    x: 'Organization Earnings',
                    y: (deviceEarning * totalSum / 1000).toFixed(2),
                    fillColor: '#00E396'

                }, {
                    x: 'Organization Cost',
                    y: Number(deviceCost).toFixed(2),
                    fillColor: "#d40000"
                }
            ]
        }
    ]

    const renderData = (filter) =>
        <>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title={filter + " Devices Production"}
                subTitle={isMobile ? "" : "Check your devices earnings and productions"}
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="top" gutter={[32, 32]} >
                    <Col span={12}>
                        <Statistic title={`Total ${filter} Production`} value={metric ? totalSum / 1000 : totalSum} suffix={metric ? "Kilowatt (kW)" : "Watt"} precision={2} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} className="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Kilowatt (kW)" : "Watt"}</p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Earnings" value={(deviceEarning * totalSum / 1000).toFixed(2)} suffix={"Euro €"} precision={2} />
                    </Col>
                </Row>
                <Divider />

                {allBills.length > 0 ?
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
                        description={<span>  This building has <b>NO {filter}</b> data yet</span>}
                    >
                    </Empty>
                }
            </Card>
        </>

    return (
        <Row justify="center" gutter={[32, 32]}>
            <Col span={24}>
                <Statistic title="Total Energy Production" value={metric ? (solarSum) / 1000 : (solarSum)} suffix={metric ? "KiloWatt (kW)" : "Watt (W)"} precision={2} />
                <Row align="middle">
                    <span onClick={() => setMetric(!metric)} style={{ color: "#3c9d18", marginRight: 6, cursor: "pointer" }} className="anticon iconfont">&#xe615;</span>
                    <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Total in Kilowatt (kW)" : "Total in Watt (W)"}</p>
                </Row>
            </Col>
            <Col lg={24} sm={24} md={24}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Solar")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#3c9d18" }}>Total Solar Production</p>
                    <IconFont type="i-solar-panels" style={{ fontSize: 45, color: " #3c9d18 !important" }} />
                    <Statistic value={!metric ? solarSum : solarSum / 1000} suffix={metric ? "kW" : "W"} precision={2} />
                </Card>
            </Col>
            <Modal destroyOnClose visible={visible} onOk={() => setVisible(false)} cancelButtonProps={{ style: { display: 'none' } }} width={1000} title={"Total " + filter + " Production"}>
                {renderData(filter)}
            </Modal>
            <ResourcesModal defaultActiveKey={filter} building={item} visible={visible1} setVisible={setVisible1} data={item.resources} />
        </Row >
    )
}
export default RenewableCards