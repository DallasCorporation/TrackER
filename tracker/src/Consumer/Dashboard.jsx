import { Col, Layout, Row, } from "antd";
import React from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { statebar, stateradial } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";

const Dashboard = () => {

  return (
    <Layout
      style={{
        paddingRight: 24,
        paddingLeft: 24,
        minHeight: 280,
      }}
    >
      <h1 style={{ fontSize: "24px", }}>Welcome back, Edward 👋</h1>
      <p style={{ color: "#636e72", fontFamily: "Manrope,sanserif" }}>template p</p>
      <Row gutter={[32, 32]}>
        <Col span={18}>
          <Row gutter={[0, 32]}>
            <BannerCard name="Get exclusive discounts for any payment method" />
            <LineCard />
          </Row>
          <Row justify="center" gutter={[32, 0]} style={{marginTop:"32px"}}>
            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={statebar.options} series={statebar.series} type="bar" height={150} />}
                value={"13,346"}
              />
            </Col>
            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={stateradial.options} series={stateradial.series} type="radialBar" height={185} />}
                value={"17,346"}
              />
            </Col>
            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={statebar.options} series={statebar.series} type="bar" height={150} />}
                value={"1,346"}
              />
            </Col>
            <Col span={6}>
              <StatsCard
                chart={<ReactApexChart options={stateradial.options} series={stateradial.series} type="radialBar" height={185} />}
                value={"2,345"}
              />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={[8, 8]}>
            <ExpensiveChart />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
