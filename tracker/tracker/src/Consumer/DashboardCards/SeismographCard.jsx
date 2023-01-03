import { Col, Row, Empty } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { IconFont } from "../utils";
const SeismographCard = ({ series, total = 0 }) => {


  let options = {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 200
        }
      },
    },
    xaxis: {
      labels: {
        format: 'dd/MM/yyyy HH:mm',
      },
      type: 'datetime',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    legend: {
      show: false
    },
  }
  return (
    <ProCard bordered style={{
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }}>
      <Row align="middle" justify="space-between">
        <Col>
          <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Seismograph Status</h4>
        </Col>
        <Col>
          <IconFont type="i-wi-earthquake" style={{ fontSize: 40, color: "#713F00" }} />
        </Col>
        <Col xs={24} >
          {
            total <= 0 ?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              :
              <ReactApexChart options={options} series={[series]} type="line" height={350} />
          }
        </Col>
      </Row>
    </ProCard>
  )
};

export default SeismographCard

