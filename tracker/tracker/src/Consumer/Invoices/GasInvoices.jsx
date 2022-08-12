import { SwapOutlined } from "@ant-design/icons"
import { Breadcrumb, Card, Carousel, Col, Divider, Layout, PageHeader, Radio, Row, Statistic, Switch } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import CustomerDrawer from "../../Vendor/CustomerDrawer"
import CustomersBuildingTable from "../../Vendor/CustomersBuildingTable"

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
                    return ["Earnings", "Cost"][props.dataPointIndex]
                },
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Earnings", "Cost"],
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


const GasInvoices = ({ bills, cost }) => {
    let navigate = useNavigate()
    const allBuildings = useSelector(state => state.allOrganization.allBuildings)
    const [metricCubic, setMetric] = useState(true)
    const [buildingId, setBuildingId] = useState("")
    const [visible, setVisible] = useState(false)
    const [gasSum, setGasSum] = useState(0)
    const [allGas, setAllGas] = useState([])
    const [allGasLine, setAllGasLine] = useState([])
    const [labels, setLabels] = useState([])
    const [totalTaxCost, setTotalTax] = useState(0)
    const [totalEarning, setTotalEarning] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [series, setSeries] = useState([])

    const options = {
        chart: {
            height: 390,
            type: 'polarArea',
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
        labels: labels,
        colors: ["#1984f5", "#00c2f6", "#00cbc8",],
        value: {
            formatter: function (value) {
                return metricCubic ? (value * 0.0454249414 / 1000).toFixed(2) + " m³" : value + " Gallon"
            },
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) {
                    return metricCubic ? (value * 0.0454249414 / 1000).toFixed(2) + " m³" : value + " Gallon"
                },
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
                let res = metricCubic ? (opts.w.globals.series[opts.seriesIndex] * 0.0454249414 / 1000).toFixed(2) + " m³" : opts.w.globals.series[opts.seriesIndex] + " Gallon"
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
        setAllGas([])
        setGasSum(0)
        let totalElectric = 0
        let totalGas = 0
        let totalWater = 0
        bills.bills.map(el => {
            totalGas = +totalGas + +el.gas
        })
        if (bills.bills.length === 0)
            return
        setGasSum(Number(totalGas).toFixed(2))
        let earning = 0
        let costTot = 0
        if (cost !== undefined) {
            cost.forEach(el => {
                if (el.name === "Gas Cost at m³") {
                    setTotalEarning(totalGas * 0.0454249414 / 1000 * el.price)
                    earning += totalGas * 0.0454249414 / 1000 * el.price
                }
                if (el.name === "Supplier Gas Cost") {
                    setSupplier(el.price)
                    earning += el.price
                }
                if (el.name === "Gas Delivery Cost") {
                    setDelivery(el.price)
                    costTot += el.price
                }
                if (el.name === "Gas Tax Percentage") {
                    setTotalTax(totalGas * 0.0454249414 / 1000 * el.price / 100)
                    costTot += totalGas * 0.0454249414 / 1000 * el.price / 100
                }
            });
        }


        setSeries({
            data: [
                {
                    x: 'Organization Earnings',
                    y: earning.toFixed(2),
                    fillColor: '#00E396'

                }, {
                    x: 'Organization Cost',
                    y: costTot.toFixed(2),
                    fillColor: "#d40000"
                }
            ]
        })
        let tmp = []
        Object.values(bills.bills).map(el => {
            tmp.push([el.date, el.gas])
        })
        setAllGasLine([{ data: tmp }])
        let sum = 0
        bills.bills.forEach(singleBill => {
            sum += singleBill.gas
        })
        setLabels((old) => [...old, allBuildings.find(el => el._id === bills.buildingId).name])
        setAllGas((old) => [...old, parseFloat(Number(sum).toFixed(4))])
    }, [bills, metricCubic])

    const columns = [
        {
            title: "#",
            dataIndex: 'index',
            valueType: 'index',
            key: 'index',
            width: 10,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            initialValue: 'all',
            filters: true,
            onFilter: true,
            valueType: 'select',
            width: 300,
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            key: 'option',
            valueType: 'option',
            render: (_, data) =>
                <a onClick={() => {
                    setVisible(true)
                    setBuildingId(bills.buildingId)
                }} key="1" >
                    See Details
                </a>
        },
    ];
    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
                height:"85vh"
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
                title="Gas Supplier Details"
                subTitle="Check your supplier earnings and productions"
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="middle" gutter={[32, 32]} >

                    <Col span={7}>
                        <Statistic title="Total Gas Usage" value={metricCubic ? gasSum * 0.0454249414 / 1000 : gasSum} suffix={metricCubic ? "Gas/m³" : "Gallon"} precision={2} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Gas/m³" : "Gallon"}</p>
                        </Row>
                    </Col>
                    <Col span={5} style={{ height: 90 }} >
                        <Statistic title="Total Energy Earning" value={totalEarning} suffix={"Euro (€)"} precision={4} />
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
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Gas Usage</p>
                        <ReactApexChart options={optionsLine} series={allGasLine} type="line" height={320} />
                    </Col>
                </Row>
            </Card>
        </Layout>
    )
}
export default GasInvoices