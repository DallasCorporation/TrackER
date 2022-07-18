import { Card, Col, Divider, Row, Slider } from "antd"
import OrganizationCard from "../Organization/OrganizationCard"

const FirstStep = ({ gas, setGas, electric, setElectric, water, setWater, distributed, setDistributed }) => {
    return (
        <div>

            <Row gutter={[48, 48]} style={{ marginTop: "42px" }} justify="center">
                <Col span={6}>
                    <div onClick={() => setGas(!gas)}>
                        <OrganizationCard title={"Gas Furniture"} description={"If your organization is providing natural gas to cities, region or country"} selected={gas} />
                    </div>
                    <Divider />
                    <div style={!gas ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <p>Select your device type:</p>
                            <p>sdsada</p>
                            <Slider />
                        </Card>
                    </div>
                </Col>
                <Col span={6} >
                    <div onClick={() => setElectric(!electric)}>
                        <OrganizationCard title={"Electric Furniture"} description={"If your organization is is providing electricity to cities, region or country"} selected={electric} />
                    </div>
                    <Divider />
                    <div style={!electric ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <p>Select your device type:</p>
                            <p>sdsada</p>
                            <Slider />
                        </Card>
                    </div>
                </Col>
                <Col span={6}>
                    <div onClick={() => setWater(!water)}>
                        <OrganizationCard title={"Water Furniture"} description={"If your organization is providing water to cities, region or country"} selected={water} />
                    </div>
                    <Divider />
                    <div style={!water ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <p>Select your device type:</p>
                            <p>sdsada</p>
                            <Slider />
                        </Card>
                    </div>
                </Col>
                <Col span={6}>
                    <div onClick={() => setDistributed(!distributed)}>
                        <OrganizationCard title={"Distributed Energy Resources"}
                            description={"If your organization is selling energy resources like Solar energy, Wind energy or Hydro energy"}
                            selected={distributed} />
                    </div>
                    <Divider />
                    <div style={!distributed ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                        <Card style={{ textAlign: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #1196db" }} >
                            <p>Select your device type:</p>
                            <p>sdsada</p>
                            <Slider />
                        </Card>
                    </div>
                </Col>
            </Row>
        </div >
    )

}
export default FirstStep