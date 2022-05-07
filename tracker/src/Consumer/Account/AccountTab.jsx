import { Card, Col, Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import Market from './AccountSections/Market';
const { TabPane } = Tabs;
const AccountTab = () => {
    return (
        <Card>
            <Col span={24}>
                <Tabs type='card' defaultActiveKey="2" tabPosition='top' size='large' tabBarGutter={10}>
                    <TabPane
                        tab={
                            <span>
                                <AppleOutlined />
                                Market
                            </span>
                        }
                        key="1"
                    >
                        <Market />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                Announcements
                            </span>
                        }
                        key="2"
                    >
                        Content2
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                Announcements
                            </span>
                        }
                        key="3"
                    >
                        Content3
                    </TabPane>
                </Tabs>
            </Col>
        </Card>
    )
}
export default AccountTab