import { Button, Card, Carousel, Col, Divider, Layout, Row, Statistic, } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api"
import UsersCard from "./DashboardCards/UsersCard";
import CarouselKpi from "./DashboardCards/CarouselKpi";
import ConsumeCard from "./DashboardCards/ConsumeCard";
import styled from "styled-components";
import CustomerModal from "./CustomerModal";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: grey;

  }
  > .slick-dots li.slick-active button {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: #1196db;
  }
`;

const Dashboard = () => {
    let navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const organization = useSelector((state) => state.organization.organization)
    const buildings = useSelector((state) => state.allOrganization.allBuildings)
    const allUser = useSelector((state) => state.allUser.user)
    const [loading, setLoading] = useState(true)
    const [loadingRenew, setLoadingRenew] = useState(true)
    const [visible, setVisible] = useState(false)
    const [userPassed, setUser] = useState({})
    const [kWhSum, setkWh] = useState(0)
    const [kWhCost, setkWhCost] = useState(0)
    const [gasSum, setGas] = useState(0)
    const [gasCost, setGasCost] = useState(0)
    const [waterSum, setWater] = useState(0)
    const [waterCost, setWaterCost] = useState(0)
    const [sold, setSold] = useState(0)
    const [totalGeo, setTotalGeo] = useState(0)
    const [totalWind, setTotalWind] = useState(0)
    const [totalSolar, setTotalSolar] = useState(0)
    const [totalHydro, setTotalHydro] = useState(0)
    const [totalRenew, setTotalRenew] = useState(0)
    const [cost, setCost] = useState({})
    const [users, setUsers] = useState([])


    const getKpi = async (id) => {
        let kWh = 0
        let gas = 0
        let water = 0
        let tmpCost = {}
        await api.bills.getBillsAggregated(id).then(res => {
            if (organization.type.includes("Electric")) {
                organization.details.electric.forEach(el => {
                    if (el.name === "Electricity Cost at kWh")
                        kWh += res.totalElectric * 0.0833333 / 1000 * el.price
                    if (el.name === "Electricity Supplier Cost" || el.name === "Electricity Delivery Cost") {
                        kWh += el.price
                        tmpCost[el.name] = el.price
                    }
                    if (el.name === "Electricity Tax Percentage")
                        kWh += (res.totalElectric * el.price / 100)
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
                        gas += (res.totalGas * el.price / 100)
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
                        water += (res.totalWater * el.price / 100)
                });
                setWater((old) => old + res.totalWater)
                setWaterCost((old) => old + Number(water))
            }
            setCost(tmpCost)
        })
        await api.renewable.fetchResourcesByOrganizationId(organization._id).then(res => {
            let sum = 0
            res.map(el => sum += el.buildings.length)
            setSold(sum)
        })

        await api.bills.getBillsByOrganizationIdAggregated(organization._id).then(res => {
            let solar = 0
            let geo = 0
            let wind = 0
            let hydro = 0
            setLoadingRenew(true)
            res.result.map(el => {
                let filter = buildings.find(build => build._id === el.buildingId)
                filter.resources.map(element => {
                    el.bills.map(bill => {
                        bill.resources.map(resource => {
                            if (Object.keys(resource)[0].includes("Solar") && Object.keys(element)[0].includes("Solar")) {
                                solar += Number(Object.values(resource))
                            }
                            if (Object.keys(resource)[0].includes("Wind") && Object.keys(element)[0].includes("Wind")) {
                                wind += Number(Object.values(resource))
                            }
                            if (Object.keys(resource)[0].includes("Hydro") && Object.keys(element)[0].includes("Hydro")) {
                                hydro += Number(Object.values(resource))
                            }
                            if (Object.keys(resource)[0].includes("Geo") && Object.keys(element)[0].includes("Geo")) {
                                geo += Number(Object.values(resource))
                            }
                        })
                    })
                    setTotalGeo(geo / 1000)
                    setTotalHydro(hydro / 1000)
                    setTotalWind(wind / 1000)
                    setTotalSolar(solar / 1000)
                    setTotalRenew((geo + hydro + solar + wind) / 1000)
                })
            })
            setTimeout(() => {
                setLoadingRenew(false)
            }, 1000);
        })
    }

    useEffect(() => {
        let tmp = users
        if (organization === null || organization === undefined)
            return
        organization.customers.forEach(async element => {
            let res = allUser.find(el => el._id === element.user)
            if (!tmp.includes(res) && res !== undefined) {
                tmp.push(res)
                await getKpi(element.user).then(() => setLoading(false))
            }
        });
        if (organization.customers.length === 0)
            setLoading(false)

        setUsers(tmp)
    }, [organization])

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
                            waterSum={waterSum} gasSum={gasSum} kWhSum={kWhSum} sold={sold} renewable={totalRenew}
                        />
                        <Divider />
                        <p style={{ fontSize: 18, fontWeight: 500 }}>Customers List</p>
                        <UsersCard openModal={(user) => {
                            setUser(user)
                            setVisible(true)
                        }} />
                    </Card>
                </Col>
                <Col span={16}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Overview </p>
                            <span class="anticon iconfont" style={{ color: "#1196db" }}>&#xe7a7;</span>
                        </Row>
                        <ConsumeCard />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Total Cost</p>
                            <span class="anticon iconfont" style={{ color: "#1196db" }}>&#xe71b;</span>
                        </Row>
                        <Row>
                            {Object.keys(cost).map(el =>
                                <Col span={12}>
                                    <Statistic title={el} value={cost[el] * users.length} suffix="€" precision={2} />
                                </Col>
                            )}
                        </Row>
                    </Card>
                    <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", marginTop: 32 }}>
                        <Row justify="space-between" align="middle">
                            <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Organization Total Production</p>
                            <span class="anticon iconfont" style={{ color: "#1196db", }}>&#xe64f;</span>
                        </Row>
                        <CarouselWrapper style={{ justifyContent: "center" }} autoplay={!loadingRenew}>
                            <Row justify="space-between" align="middle">
                                <Col span={24} style={{ height: "200px", textAlign: "center", marginTop: 12 }}>
                                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Solar Production</p>
                                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe65f;</span>
                                    <Statistic loading={loadingRenew} value={totalSolar} suffix="Kw" precision={2} />
                                </Col>
                            </Row>
                            <Row justify="space-between" align="middle">
                                <Col span={24} style={{ height: "200px", textAlign: "center", marginTop: 12 }}>
                                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Hydro Production</p>
                                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe650;</span>
                                    <Statistic loading={loadingRenew} value={totalHydro} suffix="Kw" precision={2} />
                                </Col>
                            </Row>
                            <Row justify="space-between" align="middle">
                                <Col span={24} style={{ height: "200px", textAlign: "center", marginTop: 12 }}>
                                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Windy Production</p>
                                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe661;</span>
                                    <Statistic loading={loadingRenew} value={totalWind} suffix="Kw" precision={2} />
                                </Col>
                            </Row>
                            <Row justify="space-between" align="middle">
                                <Col span={24} style={{ height: "200px", textAlign: "center", marginTop: 12 }}>
                                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Geothermic Production</p>
                                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe64b;</span>
                                    <Statistic loading={loadingRenew} value={totalGeo} suffix="Kw" precision={2} />
                                </Col>
                            </Row>
                        </CarouselWrapper>
                    </Card>

                </Col>
            </Row>
            <CustomerModal visible={visible} setVisible={setVisible} user={userPassed} />
        </Layout>
    );
}
export default () => <Dashboard />
