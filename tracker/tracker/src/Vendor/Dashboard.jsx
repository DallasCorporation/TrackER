import { Button, Card, Col, Divider, Layout, Row, Statistic, } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api"
import UsersCard from "./DashboardCards/UsersCard";
import CarouselKpi from "./DashboardCards/CarouselKpi";


const Dashboard = () => {
    let navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const organization = useSelector((state) => state.organization.organization)
    const allUser = useSelector((state) => state.allUser.user)
    const [loading, setLoading] = useState(true)
    const [kWhSum, setkWh] = useState(0)
    const [kWhCost, setkWhCost] = useState(0)
    const [gasSum, setGas] = useState(0)
    const [gasCost, setGasCost] = useState(0)
    const [waterSum, setWater] = useState(0)
    const [waterCost, setWaterCost] = useState(0)
    const [cost, setCost] = useState({})
    const [users, setUsers] = useState([])


    const getKpi = async (id) => {
        await api.bills.getBillsAggregated(id).then(res => {
            let kWh = 0
            let gas = 0
            let water = 0
            let tmpCost = {}
            if (organization.type.includes("Electric")) {
                organization.details.electric.forEach(el => {
                    if (el.name === "Electricity Cost at m³")
                        kWh += res.totalElectric * 0.0833333 / 1000 * el.price
                    if (el.name === "Electricity Supplier Cost" || el.name === "Electricity Delivery Cost") {
                        kWh += el.price
                        tmpCost[el.name] = el.price
                    }
                    if (el.name === "Electricity Tax Percentage")
                        kWh += (kWh * el.price / 100)
                });
                setkWh((old) => old + res.totalElectric)
                setkWhCost((old) => old + Number(kWh))
            }
            if (organization.type.includes("Gas")) {
                organization.details.gas.forEach(el => {
                    if (el.name === "Gas Cost at m³")
                        gas += res.totalGas * 0.0454249414 / 1000 * el.price
                    if (el.name === "Supplier Gas Cost" || el.name === "Gas Delivery Cost") {
                        gas += el.price
                        tmpCost[el.name] = el.price
                    }
                    if (el.name === "Gas Tax Percentage")
                        gas += (gas * el.price / 100)
                });
                setGas((old) => old + res.totalGas)
                setGasCost((old) => old + Number(gas))
            }
            if (organization.type.includes("Water")) {
                organization.details.water.forEach(el => {
                    if (el.name === "Water Cost at m³")
                        water += res.totalWater * 0.0001666667 * el.price
                    if (el.name === "Water Supplier Cost" || el.name === "Water Delivery Cost") {
                        water += el.price
                        tmpCost[el.name] = el.price
                    }
                    if (el.name === "Water Tax Percentage")
                        water += (water * el.price / 100)
                });
                setWater((old) => old + res.totalWater)
                setWaterCost((old) => old + Number(water))
            }
            setCost(tmpCost)
        })
    }

    useEffect(() => {
        let tmp = users
        if (organization === null)
            return
        organization.customers.forEach(async element => {
            let res = allUser.find(el => el._id === element.user)
            if (!tmp.includes(res) && res !== undefined) {
                tmp.push(res)
                await Promise.all([getKpi(element.user),]).then(() => setLoading(false))
            }
        });
        if (organization.customers.length === 0)
            setLoading(false)

        setUsers(tmp)
    }, [])

    return (
        <Layout
            style={{
                paddingRight: 24,
                paddingLeft: 24,
                minHeight: 280,
                marginTop: "32px"
            }}
        >
            <h1 style={{ fontSize: "24px", }}>Welcome back, {user.name} 👋</h1>
            <p style={{ color: "#636e72", fontSize: "14px", lineHeight: "21px" }}>Your current status and analytics are here</p>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <Card style={{ borderRadius: 20 }}>
                        <CarouselKpi loading={loading}
                            waterCost={waterCost} gasCost={gasCost} kWhCost={kWhCost}
                            waterSum={waterSum} gasSum={gasSum} kWhSum={kWhSum}
                        />
                        <Divider />
                        <p style={{ fontSize: 18, fontWeight: 500 }}>Customers List</p>
                        <UsersCard />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}>Other Kpi Earning</p>

                        <Row justify="center">
                            <Button onClick={() => navigate("/Electric")} type="primary" size="middle" style={{ borderRadius: 10 }}>See details</Button>
                        </Row>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <p style={{ fontSize: 18, fontWeight: 500 }}>Organization Total Cost</p>
                        {Object.keys(cost).map(el =>
                            <Statistic title={el} value={cost[el] * users.length} suffix="€" precision={2} />
                        )}
                    </Card>
                </Col>
            </Row>

        </Layout>
    );
}
export default () => <Dashboard />
