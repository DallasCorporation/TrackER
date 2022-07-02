import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <Layout style={{ height: "90vh" }}>
            <Content className={`form-page-wrapper`}>
                <Row style={{ height: "100%" }}>
                    <Col span={10} style={{ backgroundColor: "white" }}>
                        <LoginForm  />
                    </Col>
                    <Col span={14} style={{ backgroundColor: "blue" }}>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Login;