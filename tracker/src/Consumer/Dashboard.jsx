import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row, Statistic } from "antd";
import React from "react";
import Chart from "./Chart";
import LineKpiChart from "./Charts/LineKpiChart";
import LiquidChart from "./Charts/LiquidChart";
import RingKpi from "./Charts/RingKpi";
import GlobalMap from "./GlobalMap";
import MapKpi from "./Kpi/MapKpi";

const Dashboard = () => {
  return (
    <Layout
      className="site-layout-background"
      style={{
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col span={18}>
          <Card title="Global Load Profile" bordered={false} >
            <MapKpi />
            <GlobalMap />
          </Card>
        </Col>
        <Col span={6}>
          <Row justify="space-between" gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Card title" bordered={false} >
                <LineKpiChart />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Efficiency" bordered={false} >
                <Chart />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[32, 16]} style={{ marginTop: 16 }}>
        <Col span={10}>
          <Card title="Card title" bordered={false} >
            <Row justify="space-between" gutter={[16, 16]}>

              <RingKpi color="#fab12b" value={0.7} label="Energy" />
              <RingKpi color="#67e0d1" value={0.9} label="Water" />
              <RingKpi color="#3fc563" value={0.1} label="Gas" />
            </Row>
          </Card>
        </Col>
        <Col span={7}>
          <Card title="Efficiency" bordered={false} >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Gas Consumption last week"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Electrics consumption"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={7}>
          <Card title="Water Consumption" bordered={false}  >
            <LiquidChart />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
export default () => <Dashboard />
