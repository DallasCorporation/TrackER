import { Breadcrumb, Card, Carousel, Col, Divider, Layout, PageHeader, Radio, Row, Statistic, Switch } from "antd"
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


const ElectricInvoices = ({ bills, aggregated }) => {
    const [metricCubic, setMetric] = useState(true)
    const [electricSum, setElectricSum] = useState(0)
    const [allElectricLine, setAllElectricLine] = useState([])

    useEffect(() => {
        setElectricSum(0)
        let totalElectric = 0
        if (aggregated === undefined) {
            bills.bills.map(el => {
                totalElectric = +totalElectric + +el.electric
            })

            if (bills.bills.length === 0)
                return
        } else {
            Object.values(aggregated).map(el => {
                totalElectric = +totalElectric + +el.electric
            })
        }
        setElectricSum(Number(totalElectric).toFixed(2))
        let tmp = []
        if (aggregated === undefined) {
            Object.values(bills.bills).map(el => {
                tmp.push([el.date, el.electric])
            })
            setAllElectricLine([{ data: tmp }])
        } else {
            Object.values(aggregated).map(el => {
                tmp.push([el.date, el.electric])
            })
            setAllElectricLine([{ data: tmp }])
        }


    }, [bills, metricCubic, aggregated])


    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
                height: "85vh"
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
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="middle" gutter={[32, 32]} >
                    <Col span={20}>
                        <Statistic title="Total Electric Usage" value={metricCubic ? electricSum * 0.0833333 / 1000 : electricSum} suffix={metricCubic ? "Kilowatt Hours (kWh)" : "Watt"} precision={4} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metricCubic)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metricCubic ? "Kilowatt Hours (kWh)" : "Watt"}</p>
                        </Row>
                    </Col>
                </Row>
                <Divider />

                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Electric Usage</p>
                        <ReactApexChart options={optionsLine} series={allElectricLine} type="line" height={320} />
                    </Col>
                </Row>
            </Card>
        </Layout>
    )
}
export default ElectricInvoices