import { Button, Col, Drawer, Modal, Row, Skeleton, Space } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import api from "../api"
import MapboxMap from "../Consumer/Building/MapboxMap"
import "./skeleton.css"
import ProSkeleton from '@ant-design/pro-skeleton';
import ReactApexChart from "react-apexcharts"
import moment from "moment"


let options = {
    chart: {
        type: 'bar',
        height: 350,
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '90%',
            endingShape: 'rounded'
        },
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
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
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
            },
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        theme: "light",
        x: {
            show: true,
            format: "dd-MM-yyyy"
        },
    },
}

let radialOption = {
    labels: ['Water Total Production', 'Gas Total Production', 'Electricity Total Production',],
    legend: {
        position: "bottom",
        horizontalAlign: "center",
        align: "center"
    },
    chart: {
        type: 'donut',
    },
    dataLabels: {
        enabled: false
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '80%',
                labels: {
                    show: true,
                }
            },
        },
        value: {
            show: true,
            formatter: function (val) { return val.toFixed(2) }
        },
    },
    yaxis: {
        labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (val) => { return val.toFixed(2) },

        },
    }
};




const CustomerDrawer = ({ visible, buildingId, setVisible }) => {
    const [bills, setBills] = useState({})
    const [pieBills, setPieBills] = useState([{}])
    const [data, setData] = useState([])
    const [building, setBuilding] = useState({})
    const [load, setLoad] = useState(true)
    const fetchData = async () => {
        setLoad(true)
        let water = []
        let gas = []
        let electric = []
        let oldMoment = moment('01/23/17', 'MM/D/YYYY')
        await api.bills.fetchBills(buildingId).then(res => {
            let sumWater = 0
            let sumElectric = 0
            let sumGas = 0
            let totalElectric = 0
            let totalGas = 0
            let totalWater = 0
            res.bills.map(el => {
                totalElectric += el.electric
                totalGas += el.gas
                totalWater += el.water
                if (moment(el.date).isSame(oldMoment, 'day')) {
                    sumWater += el.water
                    sumElectric += el.electric
                    sumGas += el.gas
                    oldMoment = el.date
                } else {
                    water.push({ x: el.date, y: parseFloat(sumWater.toFixed(2)) })
                    electric.push({ x: el.date, y: parseFloat(sumElectric.toFixed(2)) })
                    gas.push({ x: el.date, y: parseFloat(sumGas.toFixed(2)) })
                    sumWater = el.water
                    sumElectric = el.electric
                    sumGas = el.gas
                    oldMoment = el.date
                }
            })
            setPieBills([parseFloat(totalWater.toFixed(2)), parseFloat(totalGas.toFixed(2)), parseFloat(totalElectric.toFixed(2))])
            setData([{ name: "Water", data: water }, { name: "Gas", data: gas }, { name: "Electric", data: electric }])
            setBills(res)
        })
        await api.buildings.getBuilding(buildingId).then(res => {
            setBuilding(res)
            setTimeout(() => {
                setLoad(false)
            }, 500);
        })
    }

    useEffect(() => {
        fetchData()
    }, [visible, buildingId])

    return (
        <Drawer title={building.name + " Consume Overview"} visible={visible} width={1000} onClose={() => setVisible(false)} footer={<Button key="back" type="primary" onClick={() => setVisible(false)}>Ok</Button>}>
            {load ?
                <Col span={24} style={{ width: "100%" }}>
                    <Skeleton.Image active={true} style={{ width: "100%", height: 300 }} />
                    <br /><br />
                    <Skeleton.Input active style={{ width: "100%" }} />
                    <ProSkeleton type="descriptions" />
                </Col>
                :
                <Row>
                    <Col span={24}>
                        {/* <StreetMap lat={building.lat} lng={building.long} /> */}
                        <div style={{ height: 300 }}>
                            <MapboxMap lat={building.lat} lng={building.long} />
                        </div>
                        <Row style={{ marginTop: 22 }} gutter={[16, 16]} justify="space-between" align="middle">
                            <Col span={24}>
                                <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Name: <b>{building.address}</b></p>
                                <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Contact Name: <b>{building.contact}</b></p>
                                <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Type: <b>{building.type}</b></p>
                                <p style={{ fontSize: "15px", fontWeight: 500 }}>Building Size: <b>{building.sqft} sqmt</b></p>
                                <p style={{ fontSize: "15px", fontWeight: 500 }}>Created At: <b>{new Date(building.date).toLocaleString()}</b></p>
                            </Col>
                            <Col span={24}>
                                <ReactApexChart options={options} series={data} type="bar" height={350} />
                            </Col>

                            <Col span={12}>
                                <ReactApexChart options={radialOption} series={pieBills} type="donut" />
                            </Col>

                        </Row>

                    </Col>
                </Row>
            }
        </Drawer>
    )
}
export default CustomerDrawer