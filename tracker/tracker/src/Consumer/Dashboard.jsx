import { Col, Layout, Row, } from "antd";
import React, { useEffect } from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { stateBar } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import RevenueCard from "./DashboardCards/RevenueCard";
import EarningsCard from "./DashboardCards/EarningsCard";
import DownloadCard from "./DashboardCards/DowloadCard";
import SeismographCard from "./DashboardCards/SeismographCard"
import { useSelector } from "react-redux";
import api from "../api";
import { useState } from "react";
import moment from "moment"

const Dashboard = () => {
  const user = useSelector((state) => state.user.user)
  const buildings = useSelector((state) => state.buildings.buildings)
  const [bills, setBills] = useState({})
  const [gas, setGas] = useState({})
  const [water, setWater] = useState({})
  const [electric, setElectric] = useState({})
  const day = moment().subtract(10, 'days');
  const [solar, setSolar] = useState({})
  const [totalRen, setTotalRen] = useState(0)

  const getData = (data) => {
    if (data === undefined) return []
    if (Object.keys(data).length === 0) return []
    let series = []
    let electric = []
    let gas = []
    let water = []
    Object.values(data.bills).forEach((el) => {
      electric.push({
        x: moment.utc(el.date).local().format(),
        y: el.electric === undefined ? 0 : el.electric
      })
      gas.push({
        x: moment.utc(el.date).local().format(),
        y: el.gas === undefined ? 0 : el.gas
      })
      water.push({
        x: moment.utc(el.date).local().format(),
        y: el.water === undefined ? 0 : el.water
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

  const getBills = async () => {
    await api.bills.fetchBills().then(res => {
      let water = []
      let gas = []
      let electric = []
      let sumGas = 0
      let sumWater = 0
      let sumElectric = 0
      let totalElectric = 0
      let totalGas = 0
      let totalWater = 0
      let sumSolar = 0
      let oldMoment = moment("01/01/22", "MM/D/YYYY")
      res.bills.map(bill => sumSolar += bill.solar)
      setTotalRen(sumSolar)
      setSolar({ name: "Solar", data: [sumSolar] })
      let billDates = Object.values(res.bills).filter(el => moment(el.date).isBetween(day, undefined))
      billDates.forEach(el => {
        totalElectric += el.electric
        totalGas += el.gas
        totalWater += el.water
        if (moment(el.date).isSame(oldMoment, "day")) {
          sumWater += el.water
          sumElectric += el.electric
          sumGas += el.gas
          oldMoment = el.date
        } else {
          water.push(Number(sumWater).toFixed(3))
          electric.push(Number(sumElectric).toFixed(3))
          gas.push(Number(sumGas).toFixed(3))
          sumWater = Number(el.water)
          sumElectric = Number(el.electric)
          sumGas = Number(el.gas)
          oldMoment = el.date
        }
      })
      water.push(Number(sumWater).toFixed(3))
      electric.push(Number(sumElectric).toFixed(3))
      gas.push(Number(sumGas).toFixed(3))
      electric.shift()
      gas.shift()
      water.shift()
      electric = electric.slice(-3)
      gas = gas.slice(-3)
      water = water.slice(-3)
      totalElectric = Number(totalElectric.toFixed(2))
      totalGas = Number(totalGas.toFixed(2))
      totalWater = Number(totalWater.toFixed(2))
      setBills({ ...res, totalElectric, totalGas, totalWater })
      setWater({ name: "Water", data: water })
      setGas({ name: "Gas", data: gas })
      setElectric({ name: "Electric", data: electric })
    })
  }

  useEffect(() => {
    getBills()
  }, [user, buildings])

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
            <BannerCard name="Get exclusive discounts for your bills" />
            <LineCard data={getData(bills)} />
          </Row>
          <Row justify="center" gutter={[32, 32]} style={{ marginTop: "32px" }}>
            <Col lg={8} md={8} sx={8} >
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={stateBar("Water", "#008ffb").options} series={[water]} type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} sx={8}>
              <StatsCard
                color={"#fff9e9"}
                chart={<ReactApexChart options={stateBar("Electric", "#ffcf45").options} series={[electric]} type="bar" height={150} />}
              />
            </Col>
            <Col lg={8} md={8} sx={8}>
              <StatsCard
                color={"#ebfafa"}
                chart={<ReactApexChart options={stateBar("Gas", "#19e396").options} series={[gas]} type="bar" height={150} />}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <EarningsCard series={[solar]} total={(totalRen / 1000).toFixed(2)} />
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <SeismographCard series={[solar]} total={(totalRen / 1000).toFixed(2)} />
          </Row>
        </Col>
        <Col lg={6} md={24} sx={24}>
          <Row gutter={[8, 32]} justify="center" align="middle">
            <ExpensiveChart bills={bills} />
            <DownloadCard />
            <RevenueCard bills={bills.aggregated} />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
