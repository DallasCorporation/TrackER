
import { Col, Layout, Row } from "antd"
import AccountInfo from "./AccountInfo"
import AccountTab from "./AccountTab"

const Account = () => {
    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <AccountInfo />
                </Col>
                <Col span={18}>
                    <AccountTab />
                </Col>
            </Row>
        </Layout>
    )
}
export default Account