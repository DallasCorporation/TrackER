import { Col, Row, Empty } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IconFont } from "../utils";
import api from "../../api";
const SeismographCard = () => {
  let options = {
    chart: {
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 200
        }
      },
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          y2: 4500,
          borderColor: '#000',
          fillColor: '#00E396',
          opacity: 0.2,
          label: {
            borderColor: '#333',
            style: {
              fontSize: '10px',
              color: '#333',
              background: '#00E396',
            },
            text: 'Safe Area',
          }
        }]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    legend: {
      show: true,
      hideOverlappingLabels: true,
    },
    xaxis: {
      labels: {
        format: 'dd-MM-yyyy HH:mm',
      },
      type: 'datetime',
    },
    tooltip: {
      enabled: true,
      followCursor: true,
      theme: "light",
      x: {
        show: true,
        format: "dd-MM-yyyy HH:mm"
      },
    },
  }



  const getQuake = async () => {
    await api.quake.get().then(res => { setQuake(res.intensity.map(el => ({ x: el.date, y: el.value }))) })
  }
  const [quake, setQuake] = useState({})

  useEffect(() => {
    getQuake()
    setInterval(() => {
      getQuake()
    }, 5000);
  }, [])

  return (
    <ProCard bordered style={{
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }} >
      <Row align="middle" justify="space-between">
        <Col>
          <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}>Seismograph Status</h4>
        </Col>
        <Col>
          <IconFont type="i-wi-earthquake" style={{ fontSize: 40, color: "#713F00" }} />
        </Col>
        <Col xs={24} >
          <ReactApexChart options={options} series={[{ name: "Quake", data: quake }]} type="line" height={350} />
        </Col>
      </Row>
    </ProCard >
  )
};

export default SeismographCard

