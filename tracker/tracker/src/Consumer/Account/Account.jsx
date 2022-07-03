import { ProCard } from "@ant-design/pro-components"
import { Avatar, Breadcrumb, Col, Divider, Dropdown, Layout, Menu, Row, Space, Tooltip } from "antd"
import { useLocation } from "react-router-dom";
import AccountActivity from "./RightSide/AccountActivity";
import ChangePassword from "./RightSide/ChangePassword";
import InfoAccount from "./RightSide/InfoAccount";
import SecuritySettings from "./RightSide/SecuritySettings";
import { MoreOutlined } from '@ant-design/icons';
import { useState } from "react";
import AvatarDrawer from "./AvatarDrawer";
import AccountNotification from "./RightSide/AccountNotification";

const Account = ({ updateRoute, user, avatar }) => {
    function getItem(label, key, icon, children, type, style) {
        return {
            key,
            icon,
            children,
            label,
            type,
            style
        };
    }
    const items = [
        getItem('Personal Information', '/Profile/Edit', <span className="iconfont anticon ">&#x100e5;</span>,),
        getItem('Notification', '/Profile/Notification', <span className="iconfont anticon">&#x100d9;</span>),
        getItem('Activity Monitor', '/Profile/Activity', <span className="iconfont anticon">&#x100e1;</span>),
        getItem('Security Settings', '/Profile/Security', <span className="iconfont anticon">&#x100df;</span>),
        getItem('Change Password', '/Profile/Password', <span className="iconfont anticon">&#xe6a9;</span>),
    ];
    const location = useLocation()

    const menu = (
        <Menu style={{ padding: 6, borderRadius: 10, }}
            items={[
                {
                    key: '1',
                    label: "Change Avatar",
                    onClick: () => { setVisible(true) }
                },
            ]}
        />
    );


    const [visible, setVisible] = useState(false)

    return (
        <Layout
            className="site-layout-background"
            style={{
                paddingLeft: 24,
                paddingRight: 24,
            }}
        >
            <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Pages</Breadcrumb.Item>
                    <Breadcrumb.Item>Profile</Breadcrumb.Item>
                </Breadcrumb>
                <ProCard style={{ borderRadius: "10px" }}>
                    <Row>
                        <Col span={5}>
                            <Row justify="end">
                                <Dropdown overlay={menu}>
                                    <MoreOutlined style={{ fontSize: 23, fontWeight: "bold" }} />
                                </Dropdown>
                            </Row>
                            <Col style={{ textAlign: "center" }}>
                                <Avatar src={avatar} size={120} />
                                <h2 style={{ marginTop: 22, marginBottom: 2 }}>{user.name} {user.surname}</h2>
                                <p>{user.email}</p>
                            </Col>
                            <Menu
                                onClick={(el) => updateRoute(el.key)}
                                mode="inline"
                                items={items}
                                defaultSelectedKeys={['/']}
                                selectedKeys={[location.pathname]}
                            />
                        </Col>
                        <Col span={1}>
                            <Space type="vertical" style={{ width: "100%" }} />
                        </Col>
                        <Col span={18}>
                            {location.pathname === "/Profile/Edit" && <InfoAccount user={user} />}
                            {location.pathname === "/Profile/Notification" && <AccountNotification user={user} />}
                            {location.pathname === "/Profile/Activity" && <AccountActivity user={user} />}
                            {location.pathname === "/Profile/Security" && <SecuritySettings user={user} updateRoute={() => updateRoute("/Profile/Password")} />}
                            {location.pathname === "/Profile/Password" && <ChangePassword user={user} />}
                        </Col>
                    </Row>
                </ProCard>
            </Row>
            <AvatarDrawer user={user} visible={visible} onClose={()=> setVisible(false)}/>
        </Layout>
    )
}
export default Account