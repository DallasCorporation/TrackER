import { ArrowRightOutlined, CiOutlined } from "@ant-design/icons"
import { ProCard } from "@ant-design/pro-components"
import { Col, Row } from "antd"
import ReactApexChart from "react-apexcharts"
import styled from "styled-components"
import { CardTitle } from "../../Components/CustomComponents"

const RowHover = styled(Row)`
&:hover {
background: rgba(224, 248, 232, 1);
border-radius:10px;
cursor: pointer;
}
`
const ExpensiveChart = () => {
    const state = {
        series: [135, 20, 145],
        labels: ['Electricity', 'Water', 'Gas'],
        options: {
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
            }, colors: ['#022cf7', '#55b1f3', '#1be7ff'],
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        size: '90%',
                        labels: {
                            show: true,
                        },
                    }
                },
                name: {
                    show: false
                },
                value: {
                    show: true,
                    showAlways: true,
                },
                total: {
                    show: true,
                    showAlways: true,
                }
            },
        },
    };

    const names = [
        {
            name: "Company Expenses",
            desc: "Employee expenses"
        },
        {
            name: "Total Invoices",
            desc: "Gas, Water and Electric invoices"
        },
        {
            name: "Total Consumption",
            desc: "Gas, Water and Electric data consumption"
        },
        {
            name: "Energy Production",
            desc: "Check your production"
        },
    ]

    return (
        <ProCard bordered style={{ borderRadius: "10px" }}>
            <Row justify="space-between" align="middle">
                <CardTitle >Expensive</CardTitle>
                <CiOutlined />
            </Row>
            <Row justify="center">
                <ReactApexChart options={state.options} series={state.series} type="donut" height={320} />
            </Row>
            <CardTitle style={{ marginTop: "32px" }}>By Category</CardTitle>
            {names.map((el) => {
                return (
                    <RowHover justify="space-evenly" align="middle" style={{ padding: 12 }} className="hover">
                        <Col span={4}>
                            <CiOutlined />
                        </Col>
                        <Col span={16} >
                            <CardTitle style={{ lineHeight: 1 }} >{el.name}</CardTitle>
                            <p>{el.desc}</p>
                        </Col>
                        <Col span={4} style={{textAlign:"end"}}>
                            <ArrowRightOutlined />
                        </Col>
                    </RowHover>
                )
            })}
        </ProCard>
    )
}
export default ExpensiveChart