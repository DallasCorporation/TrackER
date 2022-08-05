import { Breadcrumb, Card, Layout, PageHeader, Row } from "antd"
import { useNavigate } from "react-router-dom"
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Water = ({ bills, user }) => {
    let navigate = useNavigate()
    const allBuildings = useSelector(state => state.allOrganization.allBuildings)
    const [waterSum, setWaterSum] = useState(0)
    const [allWater, setAllWater] = useState([])
    const [labels, setLabels] = useState([])
    const options = {
        chart: {
            height: 390,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                }
            }
        },
        labels: labels,
        legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'left',
            offsetX: 160,
            offsetY: 15,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
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
        bills.forEach(bill => {
            let sum = 0
            bill.bills.forEach(singleBill => {
                sum += singleBill.gas
            })
            setLabels((old) => [...old, allBuildings.find(el => el._id === bill.buildingId).name])
            setAllWater((old) => [...old, sum])
            setWaterSum(sum)
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
                title="Water Supplier Details"
                subTitle="Check your supplier earnings and productions"
                onBack={() => navigate("/Dashboard")}
            />
            <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <ReactApexChart options={options} series={allWater} type="radialBar" height={390} />
            </Card>

        </Layout>
    )
}
export default Water