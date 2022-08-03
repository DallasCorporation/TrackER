import { Avatar, Button, Card, Col, Drawer, message, Row, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { AccountSubTitle, AvatarHover } from "../Components/CustomComponents";
import { updatePreference } from "../reducers/preference";

function importAll(r) {
    let images = {};
    r.keys().map(item => { images[item.replace('./', '')] = r(item); });
    return images;
}

const component = require.context('../assets/avatars/', false, /\.svg/)
const images = importAll(component);

const AvatarDrawer = ({ user, visible, onClose }) => {
    const userPreference = useSelector((state) => state.preference.preference)
    const [current, setCurrent] = useState(userPreference.avatar)
    const dispatch = useDispatch()
    const confirm = async () => {
        if(userPreference.avatar===current)
        {
            message.warning("You cannot select the same Avatar")
            return
        }
        await api.preference.updatePreference(user._id, { avatar: current }).then(data => dispatch(updatePreference(data)))
        message.success("Avatar updated correctly")
        onClose()
    }
    return (
        <Drawer title="Change Avatar" size="large" placement="right" visible={visible} onClose={() => onClose()}>
            <Row justify="center">
                <Avatar size={200} src={current} />
            </Row>
            <AccountSubTitle style={{ textAlign: "center", marginTop: 10 }}>Avatar Preview</AccountSubTitle>
            <Card style={{ borderRadius: 20, marginTop: 20, boxShadow: "0 2px 2px #022cf7" }}>
                <Row justify="space-around" gutter={[16, 16]}>
                    <Tooltip title="Default Avatar">
                        <AvatarHover
                            style={
                                current === "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                                    ? {} :
                                    { boxShadow: "0 2px 4px #000000" }}
                            size={60} src={"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"} onClick={() => setCurrent("https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png")} />
                    </Tooltip>

                    {[...Array(38)].map((x, i) =>
                        <Tooltip title={"Avatar-" + (i + 1)}>
                            <AvatarHover
                                style={
                                    current === images['Avatar-' + (i + 1) + '.svg']
                                        ? {} :
                                        { boxShadow: "0 2px 4px #000000" }}
                                size={60} src={images['Avatar-' + (i + 1) + '.svg']} onClick={() => setCurrent(images['Avatar-' + (i + 1) + '.svg'])} />
                        </Tooltip>
                    )}
                    <Tooltip title="No Avatar">
                        <AvatarHover
                            style={
                                current === "" ? {} : { boxShadow: "0 2px 4px #000000" }}
                            size={60} src={""} onClick={() => setCurrent("")} />
                    </Tooltip>
                </Row>

            </Card>
            <Row justify="end" style={{ marginTop: 60 }}>
                <Button type="ghost" onClick={()=>onClose()}>Cancel</Button>
                <Button style={{ marginLeft: 20 }} type="primary" onClick={()=>confirm()}>Change</Button>
            </Row>
        </Drawer>
    )
}
export default AvatarDrawer;