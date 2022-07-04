import React from "react";
import {
    Form, Input, Button, Alert, Col, Card, Row, Divider
} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { createFromIconfontCN } from '@ant-design/icons';
import api from '../api'
import { useState } from "react";
import { AccountTitle, GreyParagraph } from "../Components/CustomComponents";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { fetchBuildings } from "../reducers/buildings";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_z6cm66hvkag.js',
});

const LoginForm = () => {
    let navigate = useNavigate();
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    console.log(localStorage.getItem("token"))
    const handleSubmit = (data) => {
        api.user
            .login(data)
            .then((data) => {
                dispatch(login(data))
                localStorage.setItem("token", data.token)
                api.buildings.fetchBuildings(data._id).then((res) => {
                    dispatch(fetchBuildings(res))
                })
            })
            .catch((err) => { throw new Error(err.response.data.errors.email); });
        
    }

    const errorSubmit = (data) => {
        let res = []
        Object.values(data.errorFields).map(el => res.push(el.errors[0]))
        setError(res)
    }

    return (
        <Form layout="vertical" onFinishFailed={(e) => errorSubmit(e)} onFinish={(data) => handleSubmit(data)} className="basic-form">
            <Row justify="center" align="middle" style={{ padding: "64px" }}>
                <Col span={24}>
                    <AccountTitle style={{ fontSize: "36px", fontWeight: "bold" }}>Welcome Back</AccountTitle>
                    <GreyParagraph style={{ marginBottom: "16px", fontSize: "16px" }}>Check your energy production and consumption!</GreyParagraph>
                    {error != null &&
                        error.map(el => (
                            <Form.Item>
                                <Alert closable message={el} type="error" onClose={() => setError(null)} />
                            </Form.Item>
                        ))
                    }
                    <Form.Item
                        name="email"

                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input allowClear style={{ height: 50 }} placeholder="Email" prefix={<IconFont type="i-user" />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ height: 50 }} placeholder="Password" prefix={<IconFont type="i-lock" />} />
                    </Form.Item>
                    <Row justify="end">
                        <Form.Item>
                            <Link className="basic-form-forgot" to="/forgot-password">Forgot Password?</Link>
                        </Form.Item>
                    </Row>
                    <Form.Item style={{ marginTop: "8px" }}>
                        <Button type="primary" htmlType="submit" style={{ width: "100%", height: "50px" }}>
                            Log in
                        </Button>
                    </Form.Item>
                    <Divider plain>Or</Divider>
                    <Form.Item>
                        <Link className="basic-form-register" to="/signup">Sign Up</Link>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}


LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;
