import { QuestionCircleOutlined, QuestionOutlined } from "@ant-design/icons"
import { Alert, Button, Col, Divider, message, Popconfirm, Row, Spin, Switch } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../../api"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import { updatePreference } from "../../reducers/preference"
import { logout } from "../../reducers/user"
import LoadingSpinner from "../../Components/LoadingSpinner"

const SecuritySettings = ({ user, updateRoute }) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const checked = useSelector((state) => state.preference.preference.activityLog)
    const updatePref = async (value) => {
        await api.preference.updatePreference(user._id, { activityLog: value }).then(data => {
            dispatch((updatePreference(data)))
            message.success("Update Activity Log Preference")
        }).catch(err=> message.error("Error on Update Preference"))
    }
    const deleteAccount = async () => {
        await api.user.delete(user._id)
        setShow(true)
        setTimeout(() => {
            message.success('Account deleted');
            dispatch((logout()))
            setShow(false)
        }, 5000);
    }

    return (
        <div>
            {show && <LoadingSpinner message="Deleting your information..." />}
            <Col>
                <AccountTitle>Security Settings</AccountTitle>
                <GreyParagraph>These settings are helps you keep your account secure.</GreyParagraph>
            </Col>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Save my Activity Logs</AccountSubTitle>
                    <GreyParagraph>You can save your all activity logs including unusual activity detected.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch defaultChecked={checked} onChange={(val) => updatePref(val)} />
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Change Password</AccountSubTitle>
                    <GreyParagraph>Set a unique password to protect your account.</GreyParagraph>
                </Col>
                <Col>
                    <Button
                        onClick={() => { updateRoute() }}
                        type="primary" style={{ borderRadius: 6, marginRight: "20px", height: 40 }}>Change Password</Button>
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Delete your Account</AccountSubTitle>
                    <GreyParagraph>Remove your account and your personal information from the network.</GreyParagraph>
                </Col>
                <Col>
                    <Popconfirm icon={<QuestionCircleOutlined style={{ color: 'red' }} />} title="Are you sure? This action is not reversible" okText="Yes" cancelText="No" onConfirm={deleteAccount}>
                        <Button type="danger" style={{ borderRadius: 6, marginRight: "20px", height: 40 }}>Delete Account</Button>
                    </Popconfirm>
                </Col>
            </Row>

        </div >
    )
}
export default SecuritySettings