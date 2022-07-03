import { Col, Divider, Row, Switch } from "antd"
import { AccountSubTitle, AccountTitle, GreyParagraph } from "../../../Components/CustomComponents"

const AccountNotification = () => {

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
                    <Switch />
                </Col>
            </Row>
            <Divider />

            <Row justify="space-between" align="middle">
                <Col>
                    <AccountSubTitle>Newsletter update</AccountSubTitle>
                    <GreyParagraph>Notify me by email about sales and latest news of TrackEr.</GreyParagraph>
                </Col>
                <Col style={{ marginRight: "20px" }}>
                    <Switch />
                </Col>
            </Row>
        </div>
    )
}
export default AccountNotification