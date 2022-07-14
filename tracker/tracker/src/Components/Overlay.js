import "./login.css";
import { useState } from "react";
import classnames from "classnames";
import { login } from "../reducers/user";
import { fetchBuildings } from "../reducers/buildings";
import api from "../api";
import { useDispatch } from "react-redux";
import { Alert, Divider, Form, Input, Row, Tabs } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components"


const { TabPane } = Tabs;
const SignInForm = () => {

    const [swapPanel, setSwapPanel] = useState(false);
    const [name, setName] = useState(null)
    const [company, setCompany] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConf, setPasswordConf] = useState(null)
    const [error, setError] = useState(null)
    const [type, setType] = useState("Building")
    const dispatch = useDispatch()

    const signUpButton = () => {
        setSwapPanel(true);
    };
    const signInButton = () => {
        setSwapPanel(false);
    };

    const handleLoginSubmit = () => {
        let data = { email, password }
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

    const handleSignUpSubmit = (e) => {
        if (password !== passwordConf) {
            setError(["Typed Password are different"])
            return
        }
        let data = {
            type,
            email,
            password,
            name,
            surname,
        }
        api.user
            .signUp(data)
            .then((data) => {
                if (type === "Vendor")
                    api.organization.create(data._id, company)
                api.preference.createPreference(data._id)
                dispatch(login(data))
                localStorage.setItem("token", data.token)
            })
            .catch((err) => {
                throw new Error(err.response.data.errors.email);
            });
        e.preventDefault();
    }
    return (
        <div className="signIn">
            <div
                className={classnames("container", { "right-panel-active": swapPanel })}
                id="container"
            >
                <div className="form-container sign-up-container">
                    <Form action="#" onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <Tabs defaultActiveKey="Building" type="card" size="large" style={{ padding: 20 }} animated centered tabBarGutter={20} onChange={(e) => { setType(e); setError(null) }}>
                            <TabPane tab="Building Owner" key="Building">
                                {error != null &&
                                    error.map(el => (
                                        <Form.Item>
                                            <Alert closable message={el} type="error" onClose={() => setError(null)} />
                                        </Form.Item>
                                    ))
                                }
                                <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                                    <Input size="large" type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="surname" rules={[{ required: true, message: 'Please input your surname!' }]}>
                                    <Input size="large" type="text" placeholder="Surname" onChange={e => setSurname(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                    <Input size="large" type="email" placeholder="Email" onChange={e => setName(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password size="large" type="password" placeholder="Password" onChange={e => setName(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="passwordConf" rules={[{ required: true, message: 'Confirm your password!' }]}>
                                    <Input.Password size="large" placeholder="Confirm Password" onChange={e => setPasswordConf(e.target.value)} />
                                </Form.Item>
                            </TabPane>
                            <TabPane tab="Vendor Profile" key="Vendor">
                                {error != null &&
                                    error.map(el => (
                                        <Form.Item>
                                            <Alert closable message={el} type="error" onClose={() => setError(null)} />
                                        </Form.Item>
                                    ))
                                }
                                <Form.Item name="name" rules={[{ required: true, message: 'Please input your Company name!' }]}>
                                    <Input size="large" placeholder="Company Name" onChange={e => setCompany(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="surname" rules={[{ required: true, message: 'Please input Owner surname!' }]}>
                                    <Input size="large" placeholder="Owner Name" onChange={e => setName(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="surname" rules={[{ required: true, message: 'Please input Owner surname!' }]}>
                                    <Input size="large" placeholder="Owner Name" onChange={e => setSurname(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                    <Input size="large" placeholder="Company Email" onChange={e => setEmail(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password size="large" placeholder="Type Password" onChange={e => setPassword(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="passwordConf" rules={[{ required: true, message: 'Confirm your password!' }]}>
                                    <Input.Password size="large" placeholder="Confirm Password" onChange={e => setPasswordConf(e.target.value)} />
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                        <button onClick={handleSignUpSubmit}>Sign Up</button>
                    </Form>
                </div>
                <div className="form-container sign-in-container">
                    <Form action="#">
                        {error != null &&
                            error.map(el => (
                                <Form.Item>
                                    <Alert closable message={el} type="error" onClose={() => setError(null)} />
                                </Form.Item>
                            ))
                        }
                        <h1>Sign in</h1>
                        <Form.Item style={{ width: "70%", marginTop: 22 }} name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input size="large" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item style={{ width: "70%" }} name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password size="large" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                        <Row justify="end" style={{ marginTop: 10, width: "70%" }}>
                            <Link className="basic-form-forgot" to="/forgot-password">Forgot Password?</Link>
                        </Row>
                        <button style={{ marginTop: 10 }} onClick={handleLoginSubmit}>Sign In</button>
                    </Form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 style={{ color: "white" }}>Welcome Back!</h1>
                            <p>
                                To check you data and keep connected with us please login with your personal information
                            </p>
                            <Divider type="horizontal" >Or</Divider>
                            <button
                                type="button"
                                onClick={signUpButton}
                                className="ghost"
                                id="signIn"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="overlay-panel overlay-left">
                            <h1 style={{ color: "white" }}>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Divider type="horizontal" >Or</Divider>
                            <button
                                type="button"
                                onClick={signInButton}
                                className="ghost"
                                id="signUp"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
