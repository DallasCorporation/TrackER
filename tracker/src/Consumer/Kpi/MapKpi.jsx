import { Col, Row, Statistic } from "antd"

const MapKpi = () => {
    return (
        <Row>
            <Col span={6}>
                <Statistic title="Electric KPI" value={1111} suffix="Kwh" />
            </Col>
            <Col span={6}>
                <Statistic title="Energy Production" value={0} />
            </Col>
            <Col span={6}>
                <Statistic title="Gas KPI" value={111} suffix="Sm3" />
            </Col>
            <Col span={6}>
                <Statistic title="Total Cost" value={2000} prefix="$" />
            </Col>
        </Row>
    )
}
export default MapKpi