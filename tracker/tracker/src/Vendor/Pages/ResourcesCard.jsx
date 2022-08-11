import { Button, Card, Col, Row } from "antd"

const ResourcesCard = ({ element, onClick }) => {
    let title = element.name
    return (
        <Card className={"organizationClass"} style={{ minHeight: 310, textAlign: "center", justifyContent: "center", cursor: "default" }} hoverable>
            <Row justify="center" style={{ paddingTop: "52px" }} className="test">
                {title.includes("Solar") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe65f;</span>}
                {title.includes("Hydro") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe650;</span>}
                {title.includes("Geo") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe64b;</span>}
                {title.includes("Wind") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe661;</span>}
                <Col span={24} style={{ marginTop: 22 }}>
                    <p className="title" style={{ marginTop: "22px", fontSize: "24px", height: "15px" }}>
                        Check and create <b>{title}</b> Configuration
                    </p>
                </Col>
            </Row>
            <Button onClick={onClick} type="primary" style={{ borderRadius: 20, marginTop: 22 }}>Add a configuration</Button>
        </Card>
    )
}
export default ResourcesCard