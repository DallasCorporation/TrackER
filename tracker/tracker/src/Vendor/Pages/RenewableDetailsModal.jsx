import { Card, Col, Divider, Modal, PageHeader, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import api from "../../api"
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
                    return ["Customers Production Earnings: ", "Installation Earnings: "][props.dataPointIndex]
                },
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: ["Customers Production Earnings", "Installation Earnings "],
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
                return (val/1000).toFixed(2) + "kWh"
            },
            title: {
                formatter: () => {
                    return "Electric Usage"
                },
            },
        }
    }

}


const RenewableDetailsModal = ({ filter, data, setVisible, visible }) => {
    const [dataRenewable, setData] = useState({})
    const [dataEarning, setDataEarning] = useState(0)
    const [metric, setMetric] = useState(false)
    const getData = () => {
        data.buildings.map(async building => {
            let tmp = []
            await api.bills.getBillsRenewable(building).then(res => {
                res.renewable.map(el => {
                    el.resources.map(resource => {
                        if (Object.keys(resource).includes(filter)) tmp.push([el.date, Number(Object.values(resource)).toFixed(2)])
                    })
                    setData(tmp)
                })
                filter === "Solar" && setDataEarning(res.totalSolar / 1000 * data.organization / 100)
                filter === "Wind" && setDataEarning(res.totalWind / 1000 * data.organization / 100)
                filter === "Hydro" && setDataEarning(res.totalHydro / 1000 * data.organization / 100)
                filter === "Geo" && setDataEarning(res.totalGeo / 1000 * data.organization / 100)
            })
        })
    }

    const getSeries = () => {
        return [
            {
                data: [
                    {
                        x: 'Organization Earnings',
                        y: dataEarning.toFixed(2),
                        fillColor: '#00E396'

                    }, {
                        x: 'Organization Cost',
                        y: Number(data.price* data.buildings.length).toFixed(2),
                        fillColor: "#008ffb"
                    }
                ]
            }
        ]
    }
    useEffect(() => {
        if (Object.keys(data).length !== 0)
            getData()
    }, [data, filter])


    return (
        <Modal destroyOnClose title={data.name + " resources details"} width={1000} visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title={filter + " Devices Production"}
                subTitle="Check your devices earnings and productions"
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row align="top" gutter={[32, 32]} >
                    <Col span={12}>
                        <Statistic title="Total Electric Usage" value={0} suffix={metric ? "Kilowatt Hours (kWh)" : "Watt"} precision={2} />
                        <Row align="middle">
                            <span onClick={() => setMetric(!metric)} style={{ color: "blue", marginRight: 6 }} class="anticon iconfont">&#xe615;</span>
                            <p style={{ color: "grey", fontSize: "18px", fontWeight: "lighter", margin: 0 }}>{!metric ? "Kilowatt Hours (kWh)" : "Watt"}</p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Earnings" value={0} suffix={metric ? "Kilowatt Hours (kWh)" : "Watt"} precision={2} />
                    </Col>
                </Row>
                <Divider />

                <Row style={{ marginTop: 32 }} justify="center" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> {filter} Usage</p>
                        <ReactApexChart options={optionsLine} series={[{ data: dataRenewable }]} type="line" height={320} />
                    </Col>
                </Row>
                <Divider />
                <Row style={{ marginTop: 32 }} justify="space-between" align="middle">
                    <Col span={24}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}> Total Profit</p>
                        <ReactApexChart options={optionsBar} series={getSeries()} type="bar" height={250} />
                    </Col>
                </Row>
            </Card>

        </Modal>
    )
}
export default RenewableDetailsModal