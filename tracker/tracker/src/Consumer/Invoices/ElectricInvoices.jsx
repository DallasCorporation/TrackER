import { Breadcrumb, Card, Carousel, Col, Divider, Layout, PageHeader, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

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
                    return "Electric Usage"
                },
            },
        }
    }

}


const ElectricInvoices = ({cost, aggregated, filtered }) => {
    const [metricCubic, setMetric] = useState(true)
    const [electricSum, setElectricSum] = useState(0)
    const [allElectricLine, setAllElectricLine] = useState([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)

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
        setAllElectricLine([])
        setElectricSum(0)
        let totalElectric = 0
        if (aggregated === undefined) {
            filtered.forEach(el => {
                totalElectric = +totalElectric + +el[1]
            })

            if (filtered.length === 0)
                return
        } else {
            Object.values(aggregated).map(el => {
                totalElectric = +totalElectric + +el.electric
            })
        }


        setElectricSum(Number(totalElectric).toFixed(2))
        console.log(cost)
        if (cost !== undefined && Object.keys(cost).length>0) {
            cost.forEach(el => {
                if (el.name === "Electricity Cost at kWh") {
                    setTotalEarning(electricSum * 0.0833333 / 1000 * el.price)
                }
                if (el.name === "Electricity Supplier Cost") {
                    setSupplier(el.price)
                }
                if (el.name === "Electricity Delivery Cost") {
                    setDelivery(el.price)
                }
                if (el.name === "Electricity Tax Percentage") {
                    setTotalTax(electricSum * 0.0833333 / 1000 * el.price / 100)
                }
            });
        }


        let tmp = []
        if (aggregated === undefined) {
            filtered.forEach(el => {
                tmp.push([el[0], el[1]])
            })
            setAllElectricLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map(el => {
                tmp.push([el.date, el.electric])
            })
            setAllElectricLine([{ data: tmp }])
        }


    }, [filtered, metricCubic, aggregated, cost, electricSum])


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
                title="Electric Supplier Details"
                subTitle="Check your supplier earnings and productions"
            />
            <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="middle" gutter={[32, 32]} >
                    <Col span={7}>
                        <Statistic title="Total Electric Usage" value={metricCubic ? electricSum * 0.0833333 / 1000 : electricSum} suffix={metricCubic ? "Kilowatt (kW)" : "Watt"} precision={4} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Kilowatt (kW)" : "Watt"}</p>
                        </Row>
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Statistic title="Organization Cost" value={totalEarning} suffix={"Euro (€)"} precision={4} />
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Statistic title="Total Delivery Cost" value={delivery} suffix={"Euro (€)"} precision={4} />
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Carousel autoplay dots={false} autoplaySpeed={3500}>
                            <Statistic title="Total Tax Cost" value={totalTaxCost} suffix={"Euro (€)"} precision={4} />
                            <Statistic title="Total Supplier Cost" value={supplier} suffix={"Euro (€)"} precision={4} />
                        </Carousel>
                    </Col>
                </Row>
                <Divider />

                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Electric Usage</p>
                        <ReactApexChart options={optionsLine} series={allElectricLine} type="line" height={320} />
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
export default ElectricInvoices