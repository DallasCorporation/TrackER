import { Button, Col, Form, Input, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import api from "../../../api"
import { updateUser } from "../../../reducers/user"

const EditAccountModal = ({ visible, setVisible, user }) => {
    const dispatch = useDispatch()
    console.log(user)
    const [name, setName] = useState(user.name)
    const [surname, setSurname] = useState(user.surname)
    const [email, setEmail] = useState(user.email)
    return (
        <Modal visible={visible} style={{ borderRadius: 210 }}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="back" onClick={() => setVisible(false)}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={() => {
                    console.log(name, surname, email)
                    api.user.update(user._id, { name, surname, email })
                        .then(res => {
                            dispatch(updateUser(res.data))
                            setVisible(false)
                        })
                }}>Update</Button>
            ]}
            title="Edit your personal data">
            <Col>
                <p>Name</p>
                <Form.Item style={{ marginTop: "10px" }} rules={[{ required: true, message: 'Please input your name!' }]} >
                    <Input style={{ height: 50, borderRadius: 8 }} placeholder="Name" defaultValue={user.name} onChange={(val) => setName(val.target.value)} />
                </Form.Item>
            </Col>
            <Col>
                <p>Surname</p>
                <Form.Item rules={[{ required: true, message: 'Please input your surname!' }]}>
                    <Input allowClear style={{ height: 50, borderRadius: 8 }} placeholder="Surname" defaultValue={user.surname} onChange={(val) => setSurname(val.target.value)} />
                </Form.Item>
            </Col>
            <Col>
                <p>Email</p>
                <Form.Item rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input allowClear style={{ height: 50, borderRadius: 8 }} placeholder="Email" defaultValue={user.email} onChange={(val) => setEmail(val.target.value)} />
                </Form.Item>
            </Col>
        </Modal>)
}
export default EditAccountModal