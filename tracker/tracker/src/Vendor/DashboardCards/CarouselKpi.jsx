import { Carousel, Row, Spin, Statistic } from "antd"

const CarouselKpi = ({ loading, gasSum, kWhSum, waterSum, gasCost, kWhCost, waterCost }) => {
    return (
        loading ?
            <Spin tip="Loading..." >
                <Carousel autoplay autoplaySpeed={3500}>
                    <div>
                        <Row justify="space-between" gutter={[0, 16]}>
                            <Statistic title="Total Gas Usage" value={gasSum} suffix="m³" precision={2} />
                            <Statistic title="Total Electric Usage" value={kWhSum} suffix="kWh" precision={2} />
                            <Statistic title="Total Water Usage" value={waterSum} suffix="l" precision={2} />
                            <Statistic title="Energy Resources Sold" value={10} precision={0} />
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

            <Carousel autoplay autoplaySpeed={3500}>
                <div>
                    <Row justify="space-between" gutter={[0, 16]}>
                        <Statistic title="Total Gas Usage" value={gasSum} suffix="m³" precision={2} />
                        <Statistic title="Total Electric Usage" value={kWhSum} suffix="kWh" precision={2} />
                        <Statistic title="Total Water Usage" value={waterSum} suffix="l" precision={2} />
                        <Statistic title="Energy Resources Sold" value={10} precision={0} />
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

    )
}
export default CarouselKpi