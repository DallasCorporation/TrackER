import { Card, Col, Modal, Row, Statistic } from "antd"
import { useState } from "react"

const RenewableCards = ({ getData, resources }) => {

    const [visible, setVisible] = useState(false)
    const [filter, setFilter] = useState("")

    const renderData = () => {
        console.log(getData)
        resources.forEach(element => {
            console.log(Object.keys(element)[0] === filter)
        });
    }

    return (
        <Row justify="center" gutter={[32, 32]}>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Solar")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Solar Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe65f;</span>
                    <Statistic value="0" suffix="Kw" precision={2} />
                </Card>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Hydro")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Hydro Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe650;</span>
                    <Statistic value="0" suffix="Kw" precision={2} />
                </Card>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Wind")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total  Windy Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe661;</span>
                    <Statistic value="0" suffix="Kw" precision={2} />
                </Card>
            </Col>
            <Col span={6}>
                <Card hoverable style={{ borderRadius: 20, textAlign: "center" }} onClick={() => {
                    setFilter("Geo")
                    setVisible(true)
                }}>
                    <p style={{ fontWeight: "300", fontSize: 17, color: "#1196db" }}>Total Geothermic Production</p>
                    <span class="anticon iconfontMedium3" style={{ color: "#1196db" }}>&#xe64b;</span>
                    <Statistic value="0" suffix="Kw" precision={2} />
                </Card>
            </Col>
            <Modal visible={visible} onCancel={() => setVisible(false)} width={800} >
                {renderData()}
            </Modal>
        </Row>
    )
}
export default RenewableCards