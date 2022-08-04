import { Alert, Breadcrumb, Button, Col, Row, Steps } from "antd"
import { useState } from "react";
import FirstStep from "./OrganizationSteps/FirstStep";
import {
    LeftCircleOutlined,
    RightCircleOutlined
} from '@ant-design/icons';
import SecondStep from "./OrganizationSteps/SecondStep";
import { useDispatch, useSelector } from "react-redux";
import ThirdStep from "./OrganizationSteps/ThirdStep";
import LoadingSpinner from "../Components/LoadingSpinner"
import api from "../api"
import { fetchOrganization } from "../reducers/organization";



const { Step } = Steps;
const CompleteOrganization = () => {
    const organization = useSelector(state => state.organization.organization)
    const user = useSelector(state => state.user.user)
    const [current, setCurrent] = useState(0);
    const [gas, setGas] = useState(false);
    const [electric, setElectric] = useState(false);
    const [water, setWater] = useState(false);
    const [distributed, setDistributed] = useState(false);
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [prices, setPrices] = useState([]);
    const [show, setShow] = useState(false);
    const [body, setData] = useState({});
    const dispatch= useDispatch()
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
        if (current === 2)
            submit()
        else
            if (checkValue())
                setCurrent(current + 1)
    }
    const previous = () => {
        if (current !== 0)
            setCurrent(current - 1)
    }

    const submit = () => {
        setShow(true)
        let arr = []

        if (distributed) arr.push("Distributed")
        if (gas) arr.push("Gas")
        if (electric) arr.push("Electric")
        if (water) arr.push("Water")

        let data = {
            icon: icon,
            type: arr,
            description: description,
            details: body
        }
        api.organization.update(organization._id, data).then((data) => {
            dispatch(fetchOrganization(data))
            setTimeout(() => {
                setShow(false)
            }, 3000);
        })
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
                <Step title="Set your organization type" description={<p>Select and fill the Organization type form</p>} />
                <Step title="Fill Organization details" description={<p>Tell us and customers more about your organization.</p>} />
                <Step title="Confirm Organization Data" description="Check and Confirm your Organization data." />
            </Steps>
            <p></p>
            {current === 0 && <FirstStep distributed={distributed} electric={electric} gas={gas} water={water} setDistributed={setDistributed} setElectric={setElectric} setGas={setGas} setWater={setWater} setPrices={setPrices} prices={prices} />}
            {current === 1 && <SecondStep setIcon={setIcon} name={organization.name} setDescription={setDescription} description={description} />}
            {current === 2 && <ThirdStep icon={icon} setData={setData} name={organization.name} owner={user.name + " " + user.surname} createdAt={organization.createdAt} prices={prices} description={description}
                type={[distributed === true && "-Distributed Energy Resources ", gas === true && "-Gas Supplier ", electric === true && "-Electric Supplier ", water === true && "-Water Supplier "]} />}



            <Row justify="space-between" style={{ padding: 24 }}>
                <Col span={12}>
                    {current !== 0 && <Button style={{ borderRadius: 10, }} onClick={() => previous()}><LeftCircleOutlined />Previous</Button>}
                </Col>
                <Col>
                    <Button style={{ borderRadius: 10, justifySelf: "end" }} onClick={() => next()}> {current === 2 ? "Submit" : "Next"}
                        <RightCircleOutlined />
                    </Button>
                </Col>
            </Row>
            {show && <LoadingSpinner message="Creating your organization..." />}
        </div >
    )
}

export default CompleteOrganization