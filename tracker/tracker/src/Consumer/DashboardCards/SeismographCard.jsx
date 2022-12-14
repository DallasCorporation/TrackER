import { Col, Row, Empty } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { stacked } from "../utils";
import { useEffect } from "react";
const SeismographCard = ({ series, total = 0 }) => {
  useEffect(() => {
  }, [series])

  return (
    <ProCard bordered style={{
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }}>
      <Row align="middle" justify="space-between">
        <Col lg={6} md={6} xs={24}>
          <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Seismograph Status</h4>
        </Col>
        <Col lg={18} md={18} xs={24} >
          {
            total <= 0 ?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              :
              <ReactApexChart options={stacked.options} series={series} type="line" height={150} />
          }
        </Col>
      </Row>
    </ProCard>
  )
};

export default SeismographCard

