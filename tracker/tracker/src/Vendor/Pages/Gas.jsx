import { Breadcrumb, Card, Layout, PageHeader, Row } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Gas = ({ bills }) => {
    let navigate = useNavigate()
    const allBuildings = useSelector(state => state.allOrganization.allBuildings)
    const [gasSum, setGasSum] = useState(0)
    const [allGas, setAllGas] = useState([])
    const [labels, setLabels] = useState([])
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
                    value: {
                        show: true,
                        fontSize: '14px',
                        formatter: function (value) {
                            return value.toFixed(2) + " m³"
                        },
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        color: '#373d3f',
                        fontSize: '16px',
                        fontWeight: 600,
                        formatter: function (w) {
                            return gasSum.toFixed(2)
                        }
                    }
                }
            }
        },
        labels: labels,
        colors: ["#1984f5", "#00c2f6", "#00cbc8",],
        legend: {
            show: true,
            floating: true,
            fontSize: '15px',
            position: 'right',

            offsetY: 35,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ": " + opts.w.globals.series[opts.seriesIndex].toFixed(2) + " m³"
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
        setGasSum([])
        let total = 0
        bills.forEach(bill => {
            let sum = 0
            bill.bills.forEach(singleBill => {
                sum += singleBill.gas
            })
            setLabels((old) => [...old, allBuildings.find(el => el._id === bill.buildingId).name])
            setAllGas((old) => [...old, parseFloat(Number(sum).toFixed(2))])
            total += sum
        });
        setGasSum(total)
    }, [bills])

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
                title="Gas Supplier Details"
                subTitle="Check your supplier earnings and productions"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <ReactApexChart options={options} series={allGas} type="polarArea" height={400} />
            </Card>
        </Layout>
    )
}
export default Gas