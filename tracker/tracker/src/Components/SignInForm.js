import "./login.css";
import { useState } from "react";
import classnames from "classnames";
import { login } from "../reducers/user";
import { fetchBuildings } from "../reducers/buildings";
import api from "../api";
import { useDispatch } from "react-redux";
import { Alert, Divider, Form, Input, message, Row, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { userPreference } from "../reducers/preference";


const SignInForm = () => {
    const navigate = useNavigate()
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
        setError(null)
        setSwapPanel(true);
    };
    const signInButton = () => {
        setError(null)
        setSwapPanel(false);
    };

    const handleLoginSubmit = () => {
        if (email === null || password === null) {
            setError(["Fill the form to continue"])
            return
        }
        let data = { email, password }
        api.user
            .login(data)
            .then((data) => {
                localStorage.setItem("token", data.token)
                api.preference.fetchPreference(data._id).then(async (res) => {
                    dispatch(userPreference(res))
                    if (res.activityLog) await api.activity.updateActivity(data._id)
                })
                api.buildings.fetchBuildings(data._id).then((res) => {
                    dispatch(fetchBuildings(res))
                })
                dispatch(login(data))
                navigate("/Dashboard")

            })
            .catch((err) => {
                console.log(err)
                message.error("Error! " + err.message)
            });
    }

    const handleSignUpSubmit = (e) => {
        if (name === null || surname === null || password === null || passwordConf === null || email === null) {
            setError(["Fill the form to continue"])
            return
        }
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
                    api.organization.create({ userId: data._id, name: company })
                api.preference.createPreference(data._id).then((res) => {
                    dispatch(userPreference(res))
                    dispatch(login(data))
                    localStorage.setItem("token", data.token)
                })
                api.activity.updateActivity(data._id)
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
                        <Tabs className="..." defaultActiveKey="Building" type="card" size="large" style={{ padding: 20 }} animated centered tabBarGutter={20} onChange={(e) => { setType(e); setError(null) }}>
                            <Tabs.TabPane tab="Building Owner" key="Building">
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
                                    <Input size="large" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password size="large" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="passwordConf" rules={[{ required: true, message: 'Confirm your password!' }]}>
                                    <Input.Password size="large" placeholder="Confirm Password" onChange={e => setPasswordConf(e.target.value)} />
                                </Form.Item>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Vendor Profile" key="Vendor">
                                {error != null &&
                                    error.map(el => (
                                        <Form.Item>
                                            <Alert closable message={el} type="error" onClose={() => setError(null)} />
                                        </Form.Item>
                                    ))
                                }
                                <Form.Item name="company" rules={[{ required: true, message: 'Please input your Company name!' }]}>
                                    <Input size="large" placeholder="Company Name" onChange={e => setCompany(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="name" rules={[{ required: true, message: 'Please input Owner name!' }]}>
                                    <Input size="large" placeholder="Owner Name" onChange={e => setName(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="surname" rules={[{ required: true, message: 'Please input Owner surname!' }]}>
                                    <Input size="large" placeholder="Owner Surname" onChange={e => setSurname(e.target.value)} />
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
                            </Tabs.TabPane>
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
                            <Link className="basic-form-forgot" to="">Forgot Password?</Link>
                        </Row>
                        <button style={{ marginTop: 10 }} onClick={handleLoginSubmit}>Sign In</button>
                    </Form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 style={{ color: "white" }}>Welcome Back!</h1>
                            <p>
                                To check your data and keep connected with us please login with your personal information
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
