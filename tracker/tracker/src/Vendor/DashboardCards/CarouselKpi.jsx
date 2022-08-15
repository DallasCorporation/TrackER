import { Carousel, Row, Spin, Statistic } from "antd"

const CarouselKpi = ({ loading, gasSum, kWhSum, waterSum, gasCost, kWhCost, waterCost, sold, renewable }) => {

    return (
        loading ?
            <Spin tip="Loading..." >
                <Carousel autoplay autoplaySpeed={3500} dots={false}>
                    <div>
                        <Row justify="space-between" gutter={[0, 16]}>
                            <Statistic title="Total Gas Usage" value={gasSum} suffix="m³" precision={2} />
                            <Statistic title="Total Electric Usage" value={kWhSum * 0.0833333 / 1000 > 0 ? kWhSum * 0.0833333 / 1000 : kWhSum} suffix={kWhSum * 0.0833333 / 1000 > 0 ? "kWh" : "w"} precision={2} />
                            <Statistic title="Total Water Usage" value={waterSum * 0.0001666667 > 0 ? waterSum * 0.0001666667 : waterSum} suffix="l" precision={2} />
                            <Statistic title="Energy Resources Sold" value={0} precision={0} />
                        </Row>
                    </div>
                    <div>
                        <Row justify="space-between" gutter={[0, 16]}>
                            <Statistic title="Total Gas Earnings" value={gasCost} suffix="€" precision={2} />
                            <Statistic title="Total Electric Earnings" value={kWhCost} suffix="€" precision={2} />
                            <Statistic title="Total Water Earnings" value={waterCost} suffix="€" precision={2} />
                            <Statistic title="Energy Resources Production" value={4} precision={0} />
                        </Row>
                    </div>
                </Carousel>
            </Spin> :

            <Carousel autoplay autoplaySpeed={3500} dots={false}  >
                <div>
                    <Row justify="space-between" gutter={[0, 16]}>
                        <Statistic title="Total Gas Usage" value={gasSum * 0.0454249414 / 1000 > 0 ? gasSum * 0.0454249414 / 1000 : gasSum} suffix={gasSum * 0.0454249414 / 1000? "m³": "gallon"} precision={3} />
                        <Statistic title="Total Electric Usage" value={kWhSum * 0.0833333 / 1000 > 0 ? kWhSum * 0.0833333 / 1000 : kWhSum} suffix={kWhSum * 0.0833333 / 1000 > 0 ? "kWh" : "w"} precision={3} />
                        <Statistic title="Total Water Usage" value={waterSum * 0.0001666667 > 0 ? waterSum * 0.0001666667 : waterSum} suffix="l" precision={3} />
                        <Statistic title="Energy Resources Sold" value={sold} precision={0} />
                    </Row>
                </div>
                <div>
                    <Row justify="space-between" gutter={[0, 16]}>
                        <Statistic title="Total Gas Earnings" value={gasCost} suffix="€" precision={2} />
                        <Statistic title="Total Electric Earnings" value={kWhCost} suffix="€" precision={2} />
                        <Statistic title="Total Water Earnings" value={waterCost} suffix="€" precision={2} />
                        <Statistic title="Energy Resources Production" value={renewable} suffix="kW" precision={2} />
                    </Row>
                </div>
            </Carousel>

    )
}
export default CarouselKpi