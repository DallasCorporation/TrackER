import { Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import SingInForm from '../Components/SignInForm';
import TweenOne from 'rc-tween-one';

const animType = {
    queue: 'bottom',
    one: [
      { x: 0, y: "+=30", duration: 1000, type: 'from', opacity: 0, delay: 0 },
      { x: 0, y: 0, opacity: 1 },
    ]
  };

const Login = () => {
    return (
        <TweenOne animation={animType.one} key="title">
            <Layout style={{ height: "90vh" }}>
                <Content className={`form-page-wrapper`}>
                    <SingInForm key="A" />
                </Content>
            </Layout>
        </TweenOne>
    );
};

export default Login;