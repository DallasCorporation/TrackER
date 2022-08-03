import { ProCard } from "@ant-design/pro-components"
import { Avatar, Breadcrumb, Col, Divider, Dropdown, Layout, Menu, PageHeader, Row, Space, Tooltip } from "antd"
import { useLocation, useNavigate } from "react-router-dom";
import AccountActivity from "./RightSide/AccountActivity";
import ChangePassword from "./RightSide/ChangePassword";
import InfoAccount from "./RightSide/InfoAccount";
import SecuritySettings from "./RightSide/SecuritySettings";
import { MoreOutlined } from '@ant-design/icons';
import { useState } from "react";
import AvatarDrawer from "./AvatarDrawer";
import AccountNotification from "./RightSide/AccountNotification";
import OrganizationDrawer from "./OrganizationDrawer";

const Account = ({ updateRoute, user, avatar }) => {
    const navigate = useNavigate()
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
                    label: user.type === "Building" ? "Change Avatar" : "Change Organization Logo",
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
                    <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    <Breadcrumb.Item>{window.location.pathname.split("/")[2]}</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <PageHeader
                style={{ paddingLeft: 0 }}
                className="site-page-header"
                title="Profile"
                subTitle="Check your profile and customize your preferences"
                onBack={() => navigate("/Dashboard")}
            />
            <ProCard style={{ borderRadius: "20px" , boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
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
            {user.type === "Building" && <AvatarDrawer user={user} visible={visible} onClose={() => setVisible(false)} />}
            {user.type === "Vendor" && <OrganizationDrawer user={user} visible={visible} onClose={() => setVisible(false)} />}
        </Layout>
    )
}
export default Account