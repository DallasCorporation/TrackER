import { DesktopOutlined, EditOutlined, EyeOutlined, MoreOutlined, } from "@ant-design/icons";
import { Card, Col, Dropdown, Layout, Menu, Row, } from "antd";
import React from "react";
import styled from "styled-components";



const menu = (
  <Menu style={{ borderRadius: "10px", }}

    items={[
      {
        key: '1',
        label: (
          <p>View Balance Details</p>
        ),
        icon: <EditOutlined style={{ verticalAlign: "baseline", display: "inline" }} />,
        style: { height: "35px", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }
      },
      {
        type: "divider"
      },
      {
        key: '2',
        label: (
          <p>View Account Details</p>
        ),
        icon: <EyeOutlined />,
        style: { height: "35px", alignItems: "center", justifyContent: "center", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }

      },

    ]}
  />
);


let placeholder = []
for (let a = 0; a < 4; a++)
  placeholder.push(
    <Col span={6}>
      <Card style={{ borderRadius: "20px", boxShadow: "1px 1px 8px 1px rgba(0,0,0,0.25)", }}>
        <Row justify="space-between">
          <DesktopOutlined style={{ fontSize: 32, }} />
          <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ borderRadius: "20px", boxShadow: "0px 1px 18px 1px rgba(0,0,0,0.25)" }}>
            <MoreOutlined style={{ fontSize: 18 }} />
          </Dropdown>
        </Row>
        <Row style={{ marginTop: 10 }} justify="space-between">
          <p style={{ fontWeight: "300", fontSize: "22px", fontFamily: "" }}>KPI Name</p>
          <p style={{ fontWeight: "500", fontSize: "22px", fontFamily: "" }}>1212 €</p>
        </Row>
      </Card>
    </Col>)


const Dashboard = () => {
  return (
    <Layout
      style={{
        paddingRight: 24,
        paddingLeft: 24,
        minHeight: 280,
      }}
    >
    </Layout>
  );
}
export default () => <Dashboard />
