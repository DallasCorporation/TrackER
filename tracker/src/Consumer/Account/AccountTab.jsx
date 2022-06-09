import { Card, Col, Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined, createFromIconfontCN } from '@ant-design/icons';
import Market from './AccountSections/Market';
const { TabPane } = Tabs;


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3378177_a38j8mygyq9.js',
});

const AccountTab = () => {
    return (
        <Card>
            <Col span={24}>
                <Tabs type='card' defaultActiveKey="2" tabPosition='top' size='large' tabBarGutter={10}>
                    <TabPane
                        tab={
                            <span>
                               <IconFont type='i-a-EnergyResources' style={{fontSize:"1.6em"}}/>
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
                               <IconFont type='i-news' style={{fontSize:"1.2em"}}/>
                                Announcements
                            </span>
                        }
                        key="2"
                    >
                        Content2
                    </TabPane>
                </Tabs>
            </Col>
        </Card>
    )
}
export default AccountTab