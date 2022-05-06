import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Col, Layout, Row } from "antd"

const Account = () => {
    return (
        <Layout
            className="site-layout-background"
            style={{
                padding: 24,
                minHeight: 280,
            }}
        >
            <Col span={6}>

                <Card>
                    <Row justify="center">

                        <Avatar size={64} icon={<UserOutlined />} />
                        <Col span={24} style={{textAlign:"center"}}>Username</Col>
                    </Row>
                </Card>
            </Col>
        </Layout>
    )
}
export default Account