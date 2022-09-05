import { InfoCircleFilled, InfoCircleOutlined, LogoutOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Modal, Popconfirm, Row } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import { logout } from "../../reducers/user"
import EditAccountModal from "./Modal/EditAccountModal"

const InfoAccount = ({ user, socket }) => {
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
                <Button onClick={() => setVisible(true)} type="primary" style={{ borderRadius: 6, marginRight: "20px", height: 40 }}>Edit</Button>
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
            <Row justify="space-between" align="middle">
                <AccountSubTitle>Exit</AccountSubTitle>
                <Popconfirm
                    icon={<InfoCircleFilled />}
                    title="Are you sure to Logout?"
                    onConfirm={() => {
                        dispatch(logout())
                        socket?.emit("disconnect")
                    }
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <Button style={{ color: "red", borderRadius: 6, marginRight: "20px", height: 40 }}>Logout <LogoutOutlined /></Button>
                </Popconfirm>
            </Row>
            <EditAccountModal visible={visible} setVisible={setVisible} user={user} />
        </div>
    )
}

export default InfoAccount