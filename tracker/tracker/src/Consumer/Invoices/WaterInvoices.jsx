import { Breadcrumb, Card, Carousel, Col, Divider, Empty, Layout, PageHeader, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

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
    colors: ['#008ffb'],
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
                return val + "l"
            },
            title: {
                formatter: () => {
                    return "Water Usage"
                },
            },
        }
    }

}

const WaterInvoices = ({ bills, cost, aggregated, filtered }) => {
    const [metricCubic, setMetric] = useState(true)
    const [waterSum, setWaterSum] = useState(0)
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [allWaterLine, setAllWaterLine] = useState([])

    const options = {
        noData: {
            text: "You have no data...",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "blue",
                fontSize: '12px',
            }
        },
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
        labels: ["Organization Cost", "Tax Cost", "Delivery Cost", "Supplier Cost"],
        colors: ["#1984f5", "#00c2f6", "#00cbc8", "#00cbff",],
        value: {
            formatter: function (value) { return Number(value).toFixed(2) + " €" },
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) { return Number(value).toFixed(2) + " €" },
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
                let res = opts.w.globals.series[opts.seriesIndex].toFixed(2) + " €"
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
        if (bills === null)
            return
        setWaterSum(0)
        setAllWaterLine([])
        if (bills.hasOwnProperty("all")) {
            setWaterSum(Number(bills.totalGas).toFixed(2))
        }
        else filtered.map(el => setWaterSum(old => old + el[1]))

        let totalWater = 0
        if (aggregated === undefined) {
            filtered.forEach(el => {
                totalWater = +totalWater + +el[1]
            })
            if (filtered.length === 0)
                return
        } else Object.values(aggregated).map(el => totalWater = +totalWater + +el.water)


        setWaterSum(Number(totalWater).toFixed(2))
        if (cost !== undefined && Object.keys(cost).length > 0) {
            cost.forEach(el => {
                if (el.name === "Water Cost at kWh") {
                    setTotalEarning(totalWater * 0.0001666667 * el.price)
                }
                if (el.name === "Water Supplier Cost") {
                    setSupplier(el.price)
                }
                if (el.name === "Water Delivery Cost") {
                    setDelivery(el.price)
                }
                if (el.name === "Water Tax Percentage") {
                    setTotalTax(totalWater * 0.0001666667 * el.price / 100)
                }
            });
        }

        let tmp = []
        if (aggregated === undefined) {
            filtered.forEach(el => {
                tmp.push([el[0], el[1]])
            })
            setAllWaterLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map(el => {
                tmp.push([el.date, el.water])
            })
            setAllWaterLine([{ data: tmp }])

        }

    }, [filtered, aggregated, metricCubic, bills, cost])

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
            {Object.keys(bills).length === 0 ?
                <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    < Empty />
                </Card>
                :
                <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                    <Row align="top" gutter={[32, 32]}>
                        <Col md={6} sm={12}>
                            <Statistic title="Total Water Usage" value={metricCubic ? waterSum * 0.0001666667 : waterSum} suffix={metricCubic ? "Liter/Hours (l/h)" : "Liter"} precision={4} />
                            <Row align="middle">
                                <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6, cursor: "pointer" }} class="anticon iconfont">&#xe615;</span>
                                <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Literr/Hours (l/h)" : "Liter"}</p>
                            </Row>
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Organization Cost" value={totalEarning} suffix={"Euro (€)"} precision={2} />
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Statistic title="Total Delivery Cost" value={delivery} suffix={"Euro (€)"} precision={2} />
                        </Col>
                        <Col md={6} sm={12} style={{ height: 90 }} >
                            <Carousel autoplay dots={false} autoplaySpeed={3500}>
                                <Statistic title="Total Tax Cost" value={totalTaxCost.toFixed(2)} suffix={"Euro (€)"} precision={2} />
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
                </Card>}
        </Layout>
    )
}
export default WaterInvoices