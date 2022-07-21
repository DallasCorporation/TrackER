import { Avatar, Card, Descriptions } from "antd"

const ThirdStep = ({ name, owner, icon, createdAt, type, description, prices = [] }) => {
    const renderPrices = prices.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.price === value.price && t.name === value.name
        ))
    )

    const checkName = (name) => {
        if (name === "Solar" || name === "Wind" || name === "Geo" || name === "Hydro" || name === "Bio")
            return false
        return true
    }

    const getIcon = (name) => {
        if (name.includes("Solar"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe65f;</span>
        if (name.includes("Wind"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe661;</span>
        if (name.includes("Geo"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe64b;</span>
        if (name.includes("Hydro"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe650;</span>
        if (name.includes("Bio"))
            return <span className={"anticon iconfontMedium2"} style={{ color: "#1196db" }}>&#xe645;</span>
    }

    return (
        <Card style={{ borderRadius: 20, boxShadow: "0 2px 2px rgba(0,0,0,0.2)" }}>
            <Descriptions title="Organization Info" bordered>
                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Organization Owner">{owner}</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item label="Created at">{new Date(createdAt).toDateString()}</Descriptions.Item>
                <Descriptions.Item label="Organization Type" span={2}>{type} </Descriptions.Item>
                <Descriptions.Item label="Organization logo" span={3}>
                    <Avatar size={250} src={icon} />
                </Descriptions.Item>
                {renderPrices.map(element => (element.name !== "" && checkName(element.name)) && <Descriptions.Item key={element.name} label={element.name}>{element.price}€</Descriptions.Item>)}
                {renderPrices.map(element => (element.name !== "" && !checkName(element.name)) && <Descriptions.Item column={2} key={element.name} label={element.name}>{getIcon(element.name)}</Descriptions.Item>)}
                <Descriptions.Item span={3} style={{ maxWidth: 100 }} label="Organization Description">{description}</Descriptions.Item>
            </Descriptions>
        </Card>
    )
}
export default ThirdStep