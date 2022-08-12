import { Modal, Tabs } from "antd"
import ResourcesContent from "./ResourcesContent"

const ResourcesModal = ({ building, visible, setVisible, data }) => {
    return (
        <Modal visible={visible} onCancel={() => setVisible(false)} width={1200}>
            <Tabs defaultActiveKey="1" centered size="large">
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe65f;</span>Solar</>} key="1">
                    <ResourcesContent data={data} type="Solar" building={building} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe64b;</span>Geo</>} key="2" >
                    <ResourcesContent data={data} type="Geo" building={building} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe661;</span>Windy</>} key="3">
                    <ResourcesContent data={data} type="Wind" building={building} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<><span class="anticon iconfont">&#xe650;</span>Hydro</>} key="4">
                    <ResourcesContent type="Hydro" data={data} building={building} />
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    )
}
export default ResourcesModal