import { Card, Col, Layout, Row, Statistic } from "antd";
import React from "react";
import Chart from "./Chart";
import LineKpiChart from "./Charts/LineKpiChart";
import GlobalMap from "./GlobalMap";


const Dashboard = () => {
  return (
    <Layout
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col span={18}>
          <Card title="Global Load Profile" bordered={false} >
            <Row>
              <Col span={6}>
                <Statistic title="Electric KPI" value={1111} suffix="Kwh"/>
              </Col>
              <Col span={6}>
                <Statistic title="Energy Production" value={0}  />
              </Col>
              <Col span={6}>
                <Statistic title="Gas KPI" value={111}  suffix="Sm3"/>
              </Col>
              <Col span={6}>
                <Statistic title="Total Cost" value={2000} prefix="$" />
              </Col>
            </Row>
            <GlobalMap/>
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
    </Layout>
  );
}
export default () => <Dashboard />
