import { Card, Col, Divider, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import api from "../../api"
import styled from "styled-components"


const RenewableCard = ({ title, organizationId }) => {

    const SubTitle = styled.p`
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 19px;
    line-height: 1.5715;
    text-overflow: ellipsis;
    margin-bottom: 16px 
    `

    const [load, setLoad] = useState(true)
    const [hydro, setHydro] = useState([])
    const [geo, setGeo] = useState([])
    const [wind, setWind] = useState([])
    const [solar, setSolar] = useState([])
    const getData = async () => {
        setSolar([])
        setGeo([])
        setWind([])
        setHydro([])
        await api.renewable.fetchResourcesByOrganizationId(organizationId).then((res) => {
            res.map(el => {
                switch (el.resourcesType) {
                    case "Hydro":
                        setHydro((old) => [...old, el])
                        break
                    case "Geo":
                        setGeo((old) => [...old, el])
                        break
                    case "Wind":
                        setWind((old) => [...old, el])
                        break
                    case "Solar":
                        setSolar((old) => [...old, el])
                        break
                    default:
                        break
                }
            })
            setTimeout(() => {
                setLoad(false)
            }, 1000);
        })
    }
    useEffect(() => {
        if (organizationId === null)
            return
        getData()
    }, [title])


    return (
        <Card style={{
            borderRadius: 20,
            boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 10px 12px rgba(0,0,0,0.22)"
        }}>

            <Row gutter={[32, 16]}>
                <Col span={24}>
                    <p style={{
                        overflow: "hidden",
                        color: "rgba(0, 0, 0, 0.85)",
                        fontWeight: "bold",
                        fontSize: "20px",
                        lineHeight: 1.5715,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: 0
                    }}>{title}</p>
                </Col>
                <Col span={24}>
                    {solar.length > 0 &&
                        <div>
                            <SubTitle>Organization Solar Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {solar.map(el =>
                        <Row justify="space-between" key={el._id} gutter={[32,32]}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                    {hydro.length > 0 &&
                        <div>
                            <SubTitle>Organization Hydro Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {hydro.map(el =>
                        <Row justify="space-between" key={el._id}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                    {geo.length > 0 &&
                        <div>
                            <SubTitle>Organization Geothermic Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {geo.map(el =>
                        <Row justify="space-between" key={el._id}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                    {wind.length > 0 &&
                        <div>
                            <SubTitle>Organization Windy Energy Resources Available Devices</SubTitle>
                            <Divider />
                        </div>
                    }
                    {wind.map(el =>
                        <Row justify="space-between" key={el._id}>
                            <Col md={4} sm={24}>
                                <Statistic title={"Name"} value={el.name} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Type"} value={el.type} loading={load} />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Installation Price"} value={el.price} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Earnings at kWh"} value={el.earning} loading={load} suffix="€" />
                            </Col>
                            <Col md={4} sm={24}>
                                <Statistic title={"Organization profit at kWh"} value={el.organization} suffix="%" loading={load} />
                            </Col>
                            <Divider />
                        </Row>
                    )}
                </Col>

            </Row>
        </Card>
    )
}
export default RenewableCard