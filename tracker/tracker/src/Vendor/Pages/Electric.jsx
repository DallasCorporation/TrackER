import { Breadcrumb, Card, Layout, PageHeader, Row } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Electric = ({ bills }) => {

    let navigate = useNavigate()
    const allBuildings = useSelector(state => state.allOrganization.allBuildings)
    const [electricSum, setElectricSum] = useState(0)
    const [allElectric, setAllElectric] = useState([])
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
                    margin: 5,
                    size: '30%',
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
                            return value + " m³"
                        },
                    }
                }
            }
        },
        labels: labels,
        legend: {
            show: true,
            floating: true,
            fontSize: '13px',
            position: 'left',
            offsetX: 140,
            offsetY: 15,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ": " + opts.w.globals.series[opts.seriesIndex] + " m³"
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
        setAllElectric([])
        setElectricSum([])
        bills.forEach(bill => {
            let sum = 0
            bill.bills.forEach(singleBill => {
                sum += singleBill.electric
            })
            setLabels((old) => [...old, allBuildings.find(el => el._id === bill.buildingId).name])
            setAllElectric((old) => [...old, sum.toFixed(2)])
            setElectricSum(sum)
        });
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
                title="Electric"
                subTitle="Check your supplier earnings and productions"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <ReactApexChart options={options} series={allElectric} type="polarArea" height={400} />
            </Card>
        </Layout>
    )
}
export default Electric