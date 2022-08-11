import { Avatar, Button, Col, Image, Layout, Row, } from "antd";
import React, { useEffect } from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { statebar, stateradial } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import { ProCard } from "@ant-design/pro-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import TableCard from "./DashboardCards/TableCard";
import RevenueCard from "./DashboardCards/RevenueCard";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DowloadCard";
import { useSelector } from "react-redux";
import api from "../api";
import { useState } from "react";
import moment from "moment"
import { useNavigate } from "react-router-dom";

function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

const component = require.context('../assets/avatars/', false, /\.svg/)
const images = importAll(component);



const getData = (data) => {
  if (data === undefined) return []
  if (Object.keys(data).length === 0) return []
  let series = []
  let electric = []
  let gas = []
  let water = []
  Object.values(data.aggregated).forEach((el) => {
    electric.push({
      x: moment.utc(el.date).local().format(),
      y: el.electric === undefined ? null : el.electric
    })
    gas.push({
      x: moment.utc(el.date).local().format(),
      y: el.gas === undefined ? null : el.gas
    })
    water.push({
      x: moment.utc(el.date).local().format(),
      y: el.water === undefined ? null : el.water
    })
  })
  electric = {
    type: 'area',
    name: "Electric",
    data: electric
  }
  gas = {
    type: 'area',
    name: "Gas",
    data: gas
  }
  water = {
    type: 'area',
    name: "Water",
    data: water
  }
  series = [
    electric,
    gas,
    water,
  ]
  return series
}

const Dashboard = () => {
  const user = useSelector((state) => state.user.user)
  const buildings = useSelector((state) => state.buildings.buildings)
  const organization = useSelector((state) => state.organization.organization)
  const [bills, setBills] = useState({})
  const [gas, setGas] = useState({})
  const [water, setWater] = useState({})
  const [electric, setElectric] = useState({})
  const day = moment().subtract(3, 'days');

  let navigate = useNavigate();
  const getBillsAggregated = async () => {
    await api.bills.getBillsAggregated(user._id).then(res => {
      setBills(res)
      setElectric(Object.values(res.aggregated).map(el => el.electric))

      let oldMoment = moment("01/01/17", "MM/D/YYYY")
      let billDates = Object.values(res.aggregated).filter(el => moment(el.date).isBetween(day, undefined))

      let water = []
      let gas = []
      let electric = []

      let sumGas = 0
      let sumWater = 0
      let sumElectric = 0
      billDates.map(el => {
        if (moment(el.date).isSame(oldMoment, "day")) {
          sumWater = +sumWater + +el.water
          sumElectric = +sumElectric + +el.electric
          sumGas = +sumGas + +el.gas
          oldMoment = el.date
        } else {
          water.push(Number(sumWater).toFixed(2))
          electric.push(Number(sumElectric).toFixed(2))
          gas.push(Number(sumGas).toFixed(2))
          sumWater = Number(el.water)
          sumElectric = Number(el.electric)
          sumGas = Number(el.gas)
          oldMoment = el.date
        }
      })
      electric.shift()
      gas.shift()
      water.shift()

      setWater({name:"Water", data:water})
      setGas({name:"Gas", data:gas})
      setElectric({name:"Electric", data:electric})
    })
  }
  useEffect(() => {
    getBillsAggregated(user._id)
  }, [user])

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
        <Col lg={18} md={24} sx={24}>
          <Row gutter={[0, 32]}>
            <BannerCard name="Get exclusive discounts fot your bills" />
            <LineCard data={getData(bills)} />
          </Row>
          <Row justify="center" gutter={[32, 32]} style={{ marginTop: "32px" }}>
            <Col lg={6} md={6} sx={6} >
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar.options} series={[electric]} type="bar" height={150} />}
                value={bills.totalElectric}
              />
            </Col>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar.options} series={[water]} type="bar" height={150} />}
                value={bills.totalWater}
              />
            </Col>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={statebar.options} series={[gas]} type="bar" height={150} />}
                value={bills.totalGas}
              />
            </Col>
            <Col lg={6} md={6} sx={6}>
              <StatsCard
                color={"#fdeffc"}
                chart={<ReactApexChart options={stateradial("#fe9ca9").options} series={stateradial('#fe9ca9').series} type="radialBar" height={185} />}
                value={"2,345"}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "32px" }}>
            <ProCard bordered style={{
              borderRadius: "10px"
            }}>
              <Row justify="space-between" align="middle" >
                <Col span={12}>
                  <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Best Organization</h4>
                  <div>
                    <p>Highest income this month</p>
                    <p>$442.98 Highest income this month</p>
                  </div>
                </Col>
                <Col span={8} style={{ marginRight: 32 }}>
                  <p>Name Organization Customers</p>
                  <Row justify="space-between" align="middle" gutter={[32, 32]}>
                    <Avatar size={40} src={images['Avatar-1.svg']} />
                    <Avatar size={40} src={images['Avatar-2.svg']} />
                    <Avatar size={40} src={images['Avatar-3.svg']} />
                    <Avatar size={40} src={images['Avatar-4.svg']} />
                    <Avatar size={40} src={images['Avatar-5.svg']} />
                    <Avatar size={40} src={images['Avatar-6.svg']} />
                    <ArrowRightOutlined onClick={() => navigate("/Organizations")} />
                  </Row>
                </Col>
              </Row>
            </ProCard>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <EarningsCard />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <TableCard buildings={buildings} />
          </Row>
        </Col>
        <Col lg={6} md={24} sx={24}>
          <Row gutter={[8, 32]} justify="center" align="middle">
            <ExpensiveChart bills={bills} />
            <DownloadCard />
            <RevenueCard />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
