import { Col, Divider, message, Row, Switch } from "antd"
import { useDispatch } from "react-redux"
import api from "../../api"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../Components/CustomComponents"
import { updatePreference } from "../../reducers/preference"

const AccountNotification = ({ user }) => {
    const dispatch = useDispatch()
    const setNotification = (data) => {
        api.preference.updatePreference(user._id, data).then(res => {
            dispatch(updatePreference(res))
            message.success("Update Notifications Preference")
        }).catch(err => message.error("Error on Update Preference"))
    }
    return (
        <div>
            <Col>
                <AccountTitle>Notification Settings</AccountTitle>
                <GreyParagraph>Set up your notifications preferences.</GreyParagraph>
            </Col>
            <Divider />

            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Mails notifications</AccountSubTitle>
                    <GreyParagraph>Receive mails about your account operation.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch onClick={(type) => setNotification({ notification: type })} />
                </Col>
            </Row>
            <Divider />

            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Newsletter update</AccountSubTitle>
                    <GreyParagraph>Notify me by email about sales and latest news of TrackEr.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch onClick={(type) => setNotification({ news: type })} />
                </Col>
            </Row>
        </div>
    )
}
export default AccountNotification