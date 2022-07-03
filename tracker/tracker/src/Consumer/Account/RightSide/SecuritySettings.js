import { Button, Col, Divider, Row, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import api from "../../../api"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../../Components/CustomComponents"
import { updatePreference } from "../../../reducers/preference"

const SecuritySettings = ({ user, updateRoute }) => {

    const dispatch = useDispatch()
    const checked= useSelector((state)=> state.preference.preference.activityLog)
    console.log(checked)
    const updatePref = async (value) => {
        await api.preference.updatePreference(user._id, { activityLog: value }).then(data => {
            dispatch((updatePreference(data)))
        })
    }

    return (
        <div>
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

        </div>
    )
}
export default SecuritySettings