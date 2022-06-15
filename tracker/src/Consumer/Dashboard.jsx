import { Col, Image, Layout, Row, } from "antd";
import React from "react";
import BannerCard from "./DashboardCards/BannerCard";
import ReactApexChart from "react-apexcharts";
import LineCard from "./DashboardCards/LineCard";
import StatsCard from "./DashboardCards/StatsCard";
import { stacked, statebar, stateradial } from "./utils";
import ExpensiveChart from "./DashboardCards/ExpensiveChart";
import { ProCard } from "@ant-design/pro-components";
import i1 from './icon/i1.svg';
import i2 from './icon/i2.svg';
import i3 from './icon/i3.svg';
import i4 from './icon/i4.svg';
import i5 from './icon/i5.svg';
import i6 from './icon/i6.svg';
import { ArrowRightOutlined } from "@ant-design/icons";
import TableCard from "./DashboardCards/TableCard";

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
          <Row justify="center" gutter={[32, 0]} style={{ marginTop: "32px" }}>
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

          <Row style={{ marginTop: "32px" }}>
            <ProCard bordered style={{
              borderRadius: "10px"
            }}>
              <Row justify="space-between" align="middle" >
                <Col>
                  <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Best team</h4>
                  <div>
                    <p>Highest income this month</p>
                    <p>$442.98 Highest income this month</p>
                  </div>
                </Col>
                <Col>
                  <p>Marketing Team</p>
                  <Row>
                    <img src={i1} />
                    <img src={i2} />
                    <img src={i3} />
                    <img src={i4} />
                    <img src={i5} />
                    <img src={i6} />
                    <ArrowRightOutlined />
                  </Row>
                </Col>
              </Row>
            </ProCard>
          </Row>

          <Row style={{ marginTop: "32px" }}>
            <ProCard bordered style={{
              borderRadius: "10px"
            }}>
              <Row justify="space-between" align="middle" >
                <Col>
                  <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Earnings</h4>
                  <div>
                    <p>This month</p>
                    <p>$6.340.42</p>
                  </div>
                </Col>
                <Col>
                  <ReactApexChart options={stacked.options} series={stacked.series} type="bar" height={125} width={1000} />
                </Col>


              </Row>
            </ProCard>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <TableCard />
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
