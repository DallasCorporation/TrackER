import { Button, Col, Divider, Modal, Row } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../../Components/CustomComponents"
import { logout } from "../../../reducers/user"
import EditAccountModal from "./Modal/EditAccountModal"

const InfoAccount = ({ user }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <AccountTitle>Personal Information</AccountTitle>
            <GreyParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.</GreyParagraph>
            <Divider />
            <AccountSubTitle>About</AccountSubTitle>
            <GreyParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi. Suspendisse velit mi, pretium non euismod vitae Suspendisse velit mi, pretium non euismod vitae</GreyParagraph>
            <Divider />
            <Row justify="space-between">
                <AccountSubTitle>Contact</AccountSubTitle>
                <Button onClick={() => setVisible(true)} type="primary" style={{ borderRadius: "4px" }}>Edit</Button>
            </Row>
            <Col span={12}>
                <Row justify="space-between" style={{ marginTop: "16px" }}>
                    <Col >Name</Col>
                    <Col offset={8}>{user.name}</Col>
                </Row>
                <Row justify="space-between" style={{ marginTop: "16px" }}>
                    <Col >Surname</Col>
                    <Col offset={8}>{user.surname}</Col>
                </Row>
                <Row justify="space-between" style={{ marginTop: "16px" }}>
                    <Col >Email</Col>
                    <Col offset={8}>{user.email}</Col>
                </Row>
                <Row justify="space-between" style={{ marginTop: "16px" }}>
                    <Col >Account Type</Col>
                    <Col offset={8}>{user.type}</Col>
                </Row>
            </Col>
            <Divider />
            <AccountSubTitle>Preference</AccountSubTitle>
            <Button type="ghost" style={{ color: "red" }} onClick={() => dispatch(logout())}>Logout</Button>
            <EditAccountModal visible={visible} setVisible={setVisible} user={user} />
        </div>
    )
}

export default InfoAccount