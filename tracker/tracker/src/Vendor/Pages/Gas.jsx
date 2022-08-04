import { Breadcrumb, Card, Layout, PageHeader, Row } from "antd"
import { useNavigate } from "react-router-dom"

const Gas = () => {
    let navigate = useNavigate()
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
                    <Breadcrumb.Item>{window.location.pathname.split("/")[1]}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Gas Supplier Details"
                subTitle="Check your supplier earnings and productions"
                onBack={() => navigate("/Dashboard")}
            />
              <Card style={{ borderRadius: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.2)", }}></Card>
        </Layout>
    )
}
export default Gas