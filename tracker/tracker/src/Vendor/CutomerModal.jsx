import { DotChartOutlined } from "@ant-design/icons"
import { Button, Col, Drawer, Modal, Row, Skeleton, Space } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import api from "../api"
import MapboxMap from "../Consumer/Building/MapboxMap"
import StreetMap from "../Maps/StreetMap"
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
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 2,
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



const CustomerModal = ({ visible, buildingId, setVisible }) => {
    const [bills, setBills] = useState({})
    const [data, setData] = useState([])
    const [building, setBuilding] = useState({})
    const [load, setLoad] = useState(true)
    const fetchData = async () => {
        setLoad(true)
        let water = []
        let gas = []
        let electric = []
        await api.bills.fetchBills(buildingId).then(res => {
            res.bills.map(el => {
                water.push({ x: moment.utc(el.date).local().format(), y: el.water })
                electric.push({ x: moment.utc(el.date).local().format(), y: el.electric })
                gas.push({ x: moment.utc(el.date).local().format(), y: el.gas })
            })
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

                            </Col>

                        </Row>

                    </Col>
                </Row>
            }
        </Drawer>
    )
}
export default CustomerModal