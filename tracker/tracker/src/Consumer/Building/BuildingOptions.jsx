import { Row, Select } from "antd"
import { Option } from "antd/lib/mentions"

const BuildingOptions = ({ setType, placeholder="Building Type"}) => {
    return (
        <Select
            filterSort={(optionA, optionB) => optionA.value.toLowerCase().localeCompare(optionB.value.toLowerCase())}
            showSearch
            placeholder={<Row align="middle">{placeholder}</Row>} size="large" onChange={(val) => setType(val)}>
            <Option value="Residential">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i--house" /></svg>Residential</Row>
            </Option>
            <Option value="Factory">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-factory" /></svg> Factory</Row>
            </Option>
            <Option value="Skyscraper">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i--skyline" /></svg> Skyscraper</Row>
            </Option>
            <Option value="School">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-school" /></svg>School</Row>
            </Option>
            <Option value="University">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-university" /></svg> University</Row>
            </Option>
            <Option value="Hospital">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-ambulance" /></svg> Hospital</Row>
            </Option>
            <Option value="Police Station">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-police" /></svg> Police Station</Row>
            </Option>
            <Option value="Bank">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-bank" /></svg> Bank</Row>
            </Option>
            <Option value="Shopping Mall">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i--shopping-mal" /></svg> Shopping Mall</Row>
            </Option>
            <Option value="Court">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-museum" /></svg> Court</Row>
            </Option>
            <Option value="Airport">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i-airport" /></svg> Airport</Row>
            </Option>
            <Option value="City Hall">
                <Row align="middle"><svg className="iconSvg" aria-hidden="true"><use xlinkHref="#i--orthodoxian" /></svg> City Hall</Row>
            </Option>

        </Select>
    )
}
export default BuildingOptions