import { Badge, Card, Row } from "antd"
import "./Organization.css"
const OrganizationCard = ({ description, title, selected = true }) => {
    return (
        <Badge.Ribbon text="Selected" style={{ visibility: selected ? "visible" : "hidden" }} >
            <Card className={selected ? "organizationClassActive" : "organizationClass"} style={{ textAlign: "center", justifyContent: "center" }}  hoverable>
                <Row justify="center" style={{ paddingTop: "52px" }} className="test">
                    {title.includes("Gas") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe657;</span>}
                    {title.includes("Electric") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe61d;</span>}
                    {title.includes("Water") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe730;</span>}
                    {title.includes("Resources") && <span className="anticon iconfontLarge" style={{ color: "#1196db", }}>&#xe927;</span>}
                </Row>
                <p className="title" style={{ marginTop: "22px", fontSize: "24px", height:"15px" }}>{title}</p>
                <p className="description">{description}</p>
            </Card>
        </Badge.Ribbon>
    )
}

export default OrganizationCard