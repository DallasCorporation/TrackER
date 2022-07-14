import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Overlay from '../Components/Overlay';

const Login = () => {
    return (
        <Layout style={{ height: "90vh" }}>
            <Content className={`form-page-wrapper`}>
                <Overlay />
            </Content>
        </Layout>
    );
};

export default Login;