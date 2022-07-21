import { Button, Col, Divider, Form, Input, message } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import api from "../../api"
import { AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import { updateUser } from "../../reducers/user"
import bcrypt from "bcryptjs"

const ChangePassword = ({ user }) => {
    const [old, setOld] = useState()
    console.log(user)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div>
            <Col>
                <AccountTitle>Change Password</AccountTitle>
                <GreyParagraph>Set a unique password to protect your account.</GreyParagraph>
            </Col>
            <Divider />

            <Col span={10}>
                <Col>
                    <p>Old Password</p>
                    <Form.Item style={{ marginTop: "10px" }} rules={[{ required: true, message: 'Please input your name!' }]} >
                        <Input.Password style={{ height: 50, borderRadius: 8 }} placeholder="Your current password" onChange={(val) => setOld(val.target.value)} />
                    </Form.Item>
                </Col>
                <Col>
                    <p>New Password</p>
                    <Form.Item rules={[{ required: true, message: 'Please input your surname!' }]}>
                        <Input.Password allowClear style={{ height: 50, borderRadius: 8 }} placeholder="Your new Password" onChange={(val) => setPassword(val.target.value)} />
                    </Form.Item>
                </Col>
                <Col>
                    <p>Confirm Password</p>
                    <Form.Item rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input.Password allowClear style={{ height: 50, borderRadius: 8 }} placeholder="Your new Password" onChange={(val) => setConfirmPassword(val.target.value)} />
                    </Form.Item>
                </Col>
                <Button
                    style={{ width: "100%", borderRadius: 8, height: 50 }}
                    type="primary"
                    onClick={() => {
                        bcrypt.compare(old, user.password).then(res => {
                            if (res)
                                if (password === confirmPassword && password.length > 5)
                                    api.user.updatePassword(user._id, { password })
                                        .then(res => { dispatch(updateUser(res.data)) })
                                else
                                    message.error("Your password must be 6 characters at least")
                            else
                                message.error("This is not your old password")
                        })
                    }
                    }>Update</Button>
            </Col>
        </div>
    )
}
export default ChangePassword