import { Col, DatePicker, Row } from "antd";
import { ProCard, useDeepCompareEffect } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import locale from 'antd/es/date-picker/locale/it_IT'
import { CardTitle } from "../../Components/CustomComponents";
import { useState } from "react";
import ApexCharts from 'apexcharts';


const options = {
    legend: {
        position: "top",
        horizontalAlign: "center",
        align: "right"
    },
    chart: {
        id: "example",
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
        curve: 'straight',
    },
    dataLabels: {
        enabled: false
    },

    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        }
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
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px" }}>
            <Row justify="space-between" align="middle" >
                <Col>
                    <CardTitle>
                        Visit
                    </CardTitle>
                </Col>
                <Col>
                    <DatePicker placeholder="Choose" picker="month" locale={locale} />
                </Col>
            </Row>
            <ReactApexChart options={options} series={data} type="area" height={350} />
        </ProCard>
    )
}

export default LineCard