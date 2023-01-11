import { Col, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";

const options = {
    noData: {
        text: "You have no data... Try to add a Building to your account",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "blue",
            fontSize: '18px',
        }
    },
    colors: ["#ffcf45", "#19e396", "#008ffb"],
    legend: {
        position: "top",
        horizontalAlign: "center",
        align: "right"
    },
    chart: {
        id: 'area-datetime',
        type: 'area',
        autoSelected: 'selection',
        animations: {
            enabled: true,
            easing: 'easein',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
        },
        toolbar: { show: true, },

    },
    stroke: {
        curve: 'smooth',
        width: 2,
        lineCap: 'butt',
    },
    dataLabels: {
        enabled: false
    },

    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            show: true,
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy HH:mm"
        },
    }

}
const LineCard = ({ data }) => {

    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
            <Row justify="space-between" align="middle" >
                <Col>
                    <h4 style={{ fontSize: "20px", fontWeight: 500, color: "#2d3436" }}> Consumption Overview</h4>
                </Col>
            </Row>
            <ReactApexChart options={options} series={data} type="area" height={350} />
        </ProCard>
    )
}

export default LineCard