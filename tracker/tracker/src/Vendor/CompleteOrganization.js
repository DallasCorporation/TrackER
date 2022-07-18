import { CiOutlined } from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Card, Col, message, Row, Steps } from "antd"
import { useState } from "react";
import OrganizationCard from "./Organization/OrganizationCard";
import FirstStep from "./OrganizationSteps/FirstStep";
const { Step } = Steps;

const CompleteOrganization = () => {

    const [current, setCurrent] = useState(0);
    const [gas, setGas] = useState(false);
    const [electric, setElectric] = useState(false);
    const [water, setWater] = useState(false);
    const [distributed, setDistributed] = useState(false);
    const [error, setError] = useState(false);
    const onChange = (value) => {
        if (checkValue())
            setCurrent(value);
    };

    const checkValue = () => {
        setError(false)
        if (!gas && !electric && !water && !distributed) {
            setError(true)
            return false
        }
        return true
    }

    const next = () => {
        if (checkValue())
            setCurrent(current + 1)
    }
    const previous = () => {
        if (current !== 0)
            setCurrent(current - 1)
    }


    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Organization</Breadcrumb.Item>
                <Breadcrumb.Item>Create</Breadcrumb.Item>
            </Breadcrumb>
            {error && <Alert style={{ marginTop: "22px" }}
                message="Error! Cannot continue..."
                showIcon
                description="Select the organization type to continue the organization submission"
                type="error"
                closable
                onClose={() => setError(false)}
            />}
            <Steps style={{ marginTop: "22px", paddingRight: 30, paddingLeft: 30 }} current={current} size="default" type="navigation" onChange={onChange} percent={33.5 * (current + 1)}>
                <Step title="Select your organization type" description="Select and fill the form" subTitle="" />
                <Step title="Step 2" description="This is a description." />
                <Step title="Step 3" description="This is a description." />
            </Steps>

            {current === 0 &&
                <FirstStep distributed={distributed} electric={electric} gas={gas} water={water}
                    setDistributed={setDistributed} setElectric={setElectric} setGas={setGas} setWater={setWater} />}

            <Row justify="space-between" style={{ padding: 24 }}>
                <Col span={12}>
                    {current !== 0 && <Button onClick={() => previous()}> Previous</Button>}
                </Col>
                <Col>
                    <Button style={{ justifySelf: "end" }} onClick={() => next()}> {current === 2 ? "Submit" : "Next"}</Button>
                </Col>
            </Row>
        </div >
    )
}

export default CompleteOrganization