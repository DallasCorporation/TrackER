import { Card, Col, Divider, Empty, Layout, PageHeader, Row, Statistic, Tabs } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import api from "../../api"

const BuildingsProductionCard = () => {
    const buildings = useSelector(state => state.buildings.buildings)
    const [resourceApi, setResourceApi] = useState({})
    const [build, setBuild] = useState({})
    const [bills, setBills] = useState({})


    const fetchResources = async (id) => {
        if (id === build)
            return
        setBuild(id)
        await api.renewable.fetchResourcesByBuildingId(id).then(res => setResourceApi(res))
        await api.bills.getBillsRenewable(id).then(res => setBills(res))
    }

    useEffect(() => {
        fetchResources(build)
    }, [build])

    const renderIcon = (building) => {
        switch (building.type) {
            case "Residential":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i--house" /></svg>{building.name}</Row>
            case "Factory":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-factory" /></svg>{building.name} </Row>

            case "Skyscraper":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i--skyline" /></svg>{building.name} </Row>

            case "School":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-school" /></svg>{building.name}</Row>

            case "University":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-university" /></svg>{building.name} </Row>

            case "Hospital":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-ambulance" /></svg>{building.name} </Row>

            case "Police Station":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-police" /></svg>{building.name} </Row>

            case "Bank":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-bank" /></svg>{building.name} </Row>

            case "Shopping Mall":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i--shopping-mal" /></svg>{building.name} </Row>

            case "Court":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-museum" /></svg>{building.name} </Row>

            case "Airport":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i-airport" /></svg>{building.name} </Row>

            case "City Hall":
                return <Row align="middle"><svg class="iconSvg" aria-hidden="true"><use xlinkHref="#i--orthodoxian" /></svg>{building.name} </Row>
            default:
        }
    }

    const getIcon = (resources) => {
        if (resources.resourcesType === undefined)
            return
        if (resources.resourcesType.includes("Solar"))
            return (
                <Row justify="center" align="middle">
                    <h3 style={{ margin: 0, marginRight: 20, fontWeight: 500 }}>{resources.name}</h3>
                    <div >
                        <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe65f;</span>
                    </div>
                </Row>)
        if (resources.resourcesType.includes("Wind"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe661;</span>
        if (resources.resourcesType.includes("Geo"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe64b;</span>
        if (resources.resourcesType.includes("Hydro"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe650;</span>
    }

    const getTotal = (type) => {
        if (type === undefined)
            return
        if (type.includes("Solar"))
            return bills.totalSolar / 1000
        if (type.includes("Hydro"))
            return bills.totalHydro / 1000
        if (type.includes("Geo"))
            return bills.totalGeo / 1000
        if (type.includes("Wind"))
            return bills.totalWind / 1000
    }

    const renderData = (building) => {
        fetchResources(building)
        let totPrice = resourceApi.earning * getTotal(resourceApi.resourcesType)
        return (
            Object.keys(resourceApi).length !== 0 &&
            Object.keys(bills).length !== 0 &&
            <Row>
                <Col span={12}>
                    <Card style={{ borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }} title={getIcon(resourceApi)}>
                        <Row justify="space-around" align="top">
                            <Statistic title={`Total Production`} value={getTotal(resourceApi.resourcesType)} suffix={"kWh"} precision={2} />
                            <Statistic title={`Total Earnings`} value={totPrice} suffix={"€"} precision={2} />
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }


    return (
        <Layout
            className="site-layout-background"
            style={{
                marginTop: 22,
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title={"Buildings Devices Production"}
                subTitle="Check your buildings energy earnings and productions"
            />
            <Card style={{ borderRadius: 20, marginBottom: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}>
                {Object.keys(buildings).length === 0 ?
                    <Empty description="No data to show"/>
                    :
                    <Tabs>
                        {buildings.map((el, index) =>
                            <Tabs.TabPane tab={<>{renderIcon(el)}</>} key={index}>
                                {el.resources.length === 0 ?
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 100, }}
                                        description={<span>  This building has <a>NO resources installed</a> yet</span>}
                                    >
                                    </Empty> :
                                    renderData(el._id)
                                }
                            </Tabs.TabPane>
                        )}
                    </Tabs>}
            </Card>
        </Layout>
    )

}
export default BuildingsProductionCard