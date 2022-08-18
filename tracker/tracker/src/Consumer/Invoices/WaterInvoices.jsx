import { SwapOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Carousel, Col, Divider, Layout, PageHeader, Radio, Row, Statistic, Switch } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomerDrawer from "../../Vendor/CustomerDrawer"
import CustomersBuildingTable from "../../Vendor/CustomersBuildingTable"
import ModalDetails from "../../Vendor/ModalDetails"



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
                return val + "€"
            },
            title: {
                formatter: () => {
                    return "Water Usage"
                },
            },
        }
    }

}

const WaterInvoices = ({ bills, cost, aggregated }) => {
    let navigate = useNavigate()
    const allBuildings = useSelector(state => state.allOrganization.allBuildings)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [waterSum, setWaterSum] = useState(0)
    const [allWater, setAllWater] = useState([])
    const [labels, setLabels] = useState([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState([])
    const [allWaterLine, setAllWaterLine] = useState([])

    const options = {
        chart: {
            height: 390,
            type: 'pie',
        },
        plotOptions: {
            polarArea: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 10,
                    size: '40%',
                    background: 'transparent',
                },
                dataLabels: {
                    name: {
                        fontSize: '14px',
                        show: true,

                    },
                }
            }
        },
        labels: ["Organization Cost", "Delivery Cost", "Supplier Cost", "Tax Cost"],
        colors: ["#1984f5", "#00c2f6", "#00cbc8", "#00cbff",],
        value: {
            formatter: function (value) { return value + " €" },
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) { return value + " €" },
            },

        },
        legend: {
            show: true,
            fontSize: '16px',
            position: 'right',
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                let res = opts.w.globals.series[opts.seriesIndex].toFixed(4) + " w"
                return seriesName + " " + res
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    }


    useEffect(() => {
        setLabels([])
        setAllWater([])
        setWaterSum(0)
        let totalWater = 0
        if (aggregated === undefined) {
            bills.bills.map(el => {
                totalWater = +totalWater + +el.water
            })
            if (bills.bills.length === 0)
                return
        } else {
            Object.values(aggregated).map(el => {
                totalWater = +totalWater + +el.water
            })
        }

        setWaterSum(Number(totalWater).toFixed(2))
        let earning = 0
        let costTot = 0
        if (cost !== undefined) {
            cost.forEach(el => {
                if (el.name === "Water Cost at kWh") {
                    setTotalEarning(totalWater * 0.0001666667 * el.price)
                    earning += totalWater * 0.0001666667 * el.price
                }
                if (el.name === "Water Supplier Cost") {
                    setSupplier(el.price)
                    earning += el.price
                }
                if (el.name === "Water Delivery Cost") {
                    setDelivery(el.price)
                    costTot += el.price
                }
                if (el.name === "Water Tax Percentage") {
                    setTotalTax(totalWater * 0.0001666667 * el.price / 100)
                    costTot += totalWater * 0.0001666667 * el.price / 100
                }
            });
        }

        let tmp = []
        if (aggregated === undefined) {
            Object.values(bills.bills).map(el => {
                tmp.push([el.date, el.water])
            })
            setAllWaterLine([{ data: tmp }])

            let sum = 0
            bills.bills.forEach(singleBill => {
                sum += singleBill.water
            })

            setLabels((old) => [...old, allBuildings.find(el => el._id === bills.buildingId).name])
            setAllWater((old) => [...old, parseFloat(Number(sum).toFixed(4))])
        } else {
            let sum = 0
            Object.values(aggregated).map(el => {
                tmp.push([el.date, el.water])
                sum += el.water
            })
            setAllWaterLine([{ data: tmp }])
            //setLabels((old) => [...old, allBuildings.find(el => el._id === bills.buildingId).name])
            setAllWater((old) => [...old, parseFloat(Number(sum).toFixed(4))])
        }

    }, [bills, metricCubic])

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
                    <Breadcrumb.Item>{window.location.pathname.split("/")[1]}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Water Supplier Details"
                subTitle="Check your supplier earnings and productions"
            />
            <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="middle" gutter={[32, 32]}>
                    <Col span={7} >
                        <Statistic title="Total Water Usage" value={metricCubic ? waterSum * 0.0001666667 : waterSum} suffix={metricCubic ? "Liter/Hours (l/h)" : "Liter"} precision={4} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Literr/Hours (l/h)" : "Liter"}</p>
                        </Row>
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Statistic title="Organization Cost" value={totalEarning} suffix={"Euro (€)"} precision={2} />
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Statistic title="Total Delivery Cost" value={delivery} suffix={"Euro (€)"} precision={2} />
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Carousel autoplay dots={false} autoplaySpeed={3500}>
                            <Statistic title="Total Tax Cost" value={totalTaxCost} suffix={"Euro (€)"} precision={2} />
                            <Statistic title="Total Supplier Cost" value={supplier} suffix={"Euro (€)"} precision={2} />
                        </Carousel>
                    </Col>
                </Row>
                <Divider />

                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Water Usage</p>
                        <ReactApexChart options={optionsLine} series={allWaterLine} type="line" height={320} />
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Cost Overview</p>
                        <Row justify="center">
                            <ReactApexChart options={options} series={[totalEarning, totalTaxCost, delivery, supplier]} type="pie" width={700} />
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Layout>
    )
}
export default WaterInvoices