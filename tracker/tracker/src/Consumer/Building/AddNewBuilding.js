import { Breadcrumb, Layout, Row } from "antd"

const AddNewBuildings = ({ user }) => {

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Buildings</Breadcrumb.Item>
                    <Breadcrumb.Item>Create Building</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
        </Layout>
    )
}
export default AddNewBuildings