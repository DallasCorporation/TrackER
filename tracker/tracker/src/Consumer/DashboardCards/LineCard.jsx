import { Col, DatePicker, Row } from "antd";
import { ProCard, useDeepCompareEffect } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import locale from 'antd/es/date-picker/locale/it_IT'
import { CardTitle } from "../../Components/CustomComponents";
import { useState } from "react";
import ApexCharts from 'apexcharts';
import moment from "moment"


const options = {
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

    const filterData = (e) => {
        ApexCharts.exec('area-datetime', 'zoomX',
            new Date(e[0]).getTime(),
            new Date(e[1]).getTime(),

        )
    }

    return (
        <ProCard colSpan={12} bordered style={{ borderRadius: "10px" }}>
            <Row justify="space-between" align="middle" >
                <Col>
                    <CardTitle>
                        Consumption Chart
                    </CardTitle>
                </Col>
                <Col>
                    <DatePicker.RangePicker  placeholder={["Start Date","End Date"]}  locale={locale} onChange={(e) => filterData(e)} />
                </Col>
            </Row>
            <ReactApexChart options={options} series={data} type="area" height={350} />
        </ProCard>
    )
}

export default LineCard