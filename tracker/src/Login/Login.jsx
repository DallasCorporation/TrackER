import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import LoginForm from './LoginForm';
import './login.less';

const Login = () => {

    const submit = () => { }
    return (
        <Layout style={{ height: "65vh" }}>
            <Content style={{ marginTop: 64 }} className={`form-page-wrapper`}>
                <LoginForm submit={submit} />
            </Content>
        </Layout>
    );
};

export default Login;