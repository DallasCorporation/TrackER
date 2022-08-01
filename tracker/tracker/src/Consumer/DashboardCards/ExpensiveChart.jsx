import { ArrowRightOutlined } from "@ant-design/icons"
import { ProCard } from "@ant-design/pro-components"
import { Col, Row } from "antd"
import { useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import styled from "styled-components"
import { CardTitle } from "../../Components/CustomComponents"

const RowHover = styled(Row)`
&:hover {
background: #ebfafa;
border-radius:10px;
cursor: pointer;
}
`
const ExpensiveChart = ({ bills }) => {
    const state = {
        series: [bills.totalElectric, bills.totalWater, bills.totalGas],
        options: {
            labels: ['Electricity Cost', 'Water Cost', 'Gas Cost'],
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                align: "center"
            },
            chart: {
                type: 'donut',
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#022cf7', '#55b1f3', '#1be7ff'],
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        size: '90%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total Cost',
                                formatter: (val) =>val.globals.series.reduce((partialSum, a) => partialSum + a, 0)
                            }
                        }
                    },
                },
                value: {
                    show: true,
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    color: undefined,
                    offsetY: 16,
                    formatter: function (val) {
                        return val
                    }
                },
                // name: {
                //     show: false
                // },
                // value: {
                //     show: true,
                //     showAlways: true,
                // },
                // total: {
                //     show: true,
                //     showAlways: true,
                // },

            },
            yaxis: {
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: [],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-yaxis-label',
                    },
                    offsetX: 0,
                    offsetY: 0,
                    rotate: 0,
                    formatter: (val) => { return val.toFixed(2) },
                },
            }
        },
    };

    const names = [
        {
            name: "Company Expenses",
            desc: "Employee expenses",
            icon: <span class="anticon iconfont" >&#xe715;</span>,
        },
        {
            name: "Total Invoices",
            desc: "Gas, Water and Electric invoices",
            icon: <span class="anticon iconfont" >&#xe657;</span>,
        },
        {
            name: "Total Consumption",
            desc: "Gas, Water and Electric data consumption",
            icon: <span class="anticon iconfont" >&#xe730;</span>,

        },
        {
            name: "Energy Production",
            desc: "Check your production",
            icon: <span style={{ fontSize: "80px !important" }} class="anticon iconfont" >&#xe61d;</span>,
        },
    ]

    return (
        <ProCard bordered style={{ borderRadius: "10px" }}>
            <Row justify="space-between" align="middle">
                <CardTitle >Expensive</CardTitle>
                <span class="anticon iconfont" style={{ color: "blue" }} >&#xe71b;</span>
            </Row>
            <Row justify="center">
                <ReactApexChart options={state.options} series={state.series} type="donut" height={320} />
            </Row>
            <CardTitle style={{ marginTop: "32px" }}>By Category</CardTitle>
            {names.map((el) => {
                return (
                    <RowHover justify="space-evenly" align="middle" style={{ padding: 12 }} className="hover">
                        <Col span={4} style={{ color: "blue" }}> {el.icon}</Col>
                        <Col span={16} >
                            <CardTitle style={{ lineHeight: 1 }} >{el.name}</CardTitle>
                            <p>{el.desc}</p>
                        </Col>
                        <Col span={4} style={{ textAlign: "end", color: "blue" }}>
                            <ArrowRightOutlined />
                        </Col>
                    </RowHover>
                )
            })}
        </ProCard>
    )
}
export default ExpensiveChart