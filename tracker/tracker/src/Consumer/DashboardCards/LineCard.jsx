import { Button, Col, DatePicker, Row } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React from "react";
import ReactApexChart from "react-apexcharts";
import locale from 'antd/es/date-picker/locale/it_IT'
import { CardTitle } from "../../Components/CustomComponents";
const LineCard = ({data}) => {
    console.log(data)
    let state = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            legend: {
                position: "top",
                horizontalAlign: "center",
                align: "right"
            },
            chart: {
                autoSelected: 'selection' ,
                animations: {
                    enabled: true,
                    easing: 'easein',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                },
                toolbar: { show: true,},
                height: 350,
                type: 'area'

            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    };

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
            <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </ProCard>
    )
};

export default LineCard