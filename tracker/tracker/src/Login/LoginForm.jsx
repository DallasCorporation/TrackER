import React from "react";
import {
    Form, Input, Button, Alert, Col, Card
} from 'antd';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ApiFilled, createFromIconfontCN } from '@ant-design/icons';
import api from '../api'

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_z6cm66hvkag.js',
});

class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: null
    };

    handleSubmit = (data) => {
        api.user
            .login(data)
            .then((data) => { return data; })
            .catch((err) => { throw new Error(err.response.data.errors.email); });
    }

    render() {
        return (
            <div className="container">
                <Form layout="vertical" onFinish={this.handleSubmit} className="basic-form">
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 18, offset: 3 }} md={{ span: 12, offset: 6 }} lg={{ span: 10, offset: 7 }} xl={{ span: 8, offset: 8 }}>
                        <Card title="Welcome back" className="basic-form-card">
                            {this.state.errors != null && (
                                <Form.Item>
                                    <Alert closable message={this.state.errors} type="error" onClose={() => this.setState({ errors: null })} />
                                </Form.Item>
                            )}

                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder="Email" prefix={<IconFont type="i-user" />} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Password" prefix={<IconFont type="i-lock" />} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="basic-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link className="basic-form-forgot" to="/forgot-password">Forgot Password?</Link>
                                <Link className="basic-form-register" to="/signup">Sign Up</Link>
                            </Form.Item>
                        </Card>
                    </Col>
                </Form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;
