import { Card, Layout, PageHeader, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

const Section = () => {

    return (
        <Layout style={{ height: "100vh" }}>
            <Content className={`form-page-wrapper`}>
                <PageHeader
                    className="site-page-header"
                    title="Monitor Dashboard "
                    subTitle="  This is a subtitle"
                />
                <Row justify='center'>
                    <Card style={{ width: "90%" }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Row>
            </Content>
        </Layout>
    );
};

export default Section;