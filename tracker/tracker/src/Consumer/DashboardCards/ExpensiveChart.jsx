import { ArrowRightOutlined } from "@ant-design/icons"
import { ProCard } from "@ant-design/pro-components"
import { Col, Drawer, Modal, Row, Tabs } from "antd"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CardTitle } from "../../Components/CustomComponents"
import ElectricInvoices from "./../Invoices/ElectricInvoices";
import GasInvoices from "./../Invoices/GasInvoices";
import WaterInvoices from "./../Invoices/WaterInvoices";
import BuildingsProductionCard from "./BuildingsProductionCard"
import api from "../../api"
const { TabPane } = Tabs;

const RowHover = styled(Row)`
&:hover {
background: #ebfafa;
border-radius:10px;
cursor: pointer;
}
`
const ExpensiveChart = ({ bills }) => {
    const state = {
        series: [bills.totalElectric / 1000, bills.totalWater / 1000, bills.totalGas / 1000],
        options: {
            labels: ['Electric Consumption(Kw)', 'Water Consumption(l)', 'Gas Consumption(m³)'],
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
                                show: false,
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
                    formatter: function (val) { return val.toFixed(2) }
                },
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
    const [showModal, setModal] = useState()
    const [showDrawer, setDrawer] = useState()
    const navigate = useNavigate()
    const [gasDetail, setGas] = useState({})
    const [waterDetail, setWater] = useState({})
    const [electricDetail, setElectric] = useState([])

    const fetchDetailedConsumptions = async () => {
        await api.organization.fetchCost().then((res) => {
            setElectric(res.details.electric)
            setWater(res.details.water)
            setGas(res.details.gas)
        })
    }

    useEffect(() => {
        fetchDetailedConsumptions()
        if (bills === null || bills === undefined)
            return
    }, [bills])

    const names = [
        {
            name: "Total Expenses",
            desc: "Check your buildings bills",
            icon: <span className="anticon iconfont" >&#xe715;</span>,
            action: () => navigate("/Invoices/Yearly")
        },
        {
            name: "Total Consumption",
            desc: "Gas, Water and Electric data consumption",
            icon: <span className="anticon iconfont" >&#xe730;</span>,
            action: () => setDrawer(true)

        },
        {
            name: "Energy Production",
            desc: "Check your production",
            icon: <span style={{ fontSize: "80px !important" }} className="anticon iconfont" >&#xe61d;</span>,
            action: () => setModal(true)
        },
    ]

    if (Object.values(bills).length !== 0) {
        return (
            <ProCard bordered style={{ borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                <Row justify="space-between" align="middle">
                    <CardTitle >Expensive & Production</CardTitle>
                    <span className="anticon iconfont" style={{ color: "blue" }} >&#xe71b;</span>
                </Row>
                <Row justify="center">
                    <ReactApexChart options={state.options} series={state.series} type="donut" height={360} />
                </Row>
                <CardTitle style={{ marginTop: "32px" }}>By Category</CardTitle>
                {names.map((el, key) => {
                    return (
                        <RowHover key={key} justify="space-evenly" align="middle" style={{ padding: 12 }} className="hover" onClick={() => el.action()}>
                            <Col span={4} style={{ color: "blue" }}> {el.icon}</Col>
                            <Col span={16} >
                                <CardTitle style={{ lineHeight: 1 }} >{el.name}</CardTitle>
                                <p>{el.desc}</p>
                            </Col>
                            <Col span={4} style={{ textAlign: "end", color: "blue" }}>
                                <ArrowRightOutlined style={{ fontSize: 22 }} />
                            </Col>
                        </RowHover>
                    )
                })}
                <Drawer destroyOnClose width={1000} visible={showDrawer} onClose={() => setDrawer(false)}>
                    <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
                        <TabPane tab="Electric" key="1" >
                            <ElectricInvoices bills={bills} cost={electricDetail} aggregated={bills.aggregated} />
                        </TabPane>
                        <TabPane tab="Gas" key="2">
                            <GasInvoices bills={bills} cost={gasDetail} aggregated={bills.aggregated} />
                        </TabPane>
                        <TabPane tab="Water" key="3">
                            <WaterInvoices bills={bills} cost={waterDetail} aggregated={bills.aggregated} />
                        </TabPane>
                    </Tabs>
                </Drawer>
                <Modal width={1200} visible={showModal} cancelButtonProps={{ style: { display: 'none' } }} onOk={() => setModal(false)}>
                    <BuildingsProductionCard />
                </Modal>
            </ProCard>
        )
    }

}
export default ExpensiveChart