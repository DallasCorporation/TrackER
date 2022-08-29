import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import "./style.css"
import { getChildrenToRender } from './utils';

class Banner extends React.PureComponent {
  render() {
    const { ...tagProps } = this.props;
    const { dataSource } = tagProps;
    delete tagProps.dataSource;
    delete tagProps.isMobile;
    const animType = {
      queue: 'bottom',
      one: [
        { x: 0, y: "+=30", duration: 1000, type: 'from', opacity: 0, delay: 80 },
        { x: 0, y: 0, opacity: 1 },
      ]
    };
    return (
      <div {...tagProps} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <QueueAnim
            key="text"
            type={animType.queue}
            leaveReverse
            ease={['easeOutQuad', 'easeInQuad']}
            {...dataSource.childWrapper}
            componentProps={{
              md: dataSource.childWrapper.md,
              xs: dataSource.childWrapper.xs,
            }}
          >
            {dataSource.childWrapper.children.map(getChildrenToRender)}
          </QueueAnim>
          <TweenOne animation={animType.one} key="title" {...dataSource.image}>
            <img src={dataSource.image.children} width="100%" alt="img" className='shadowImage'/>
          </TweenOne>
        </div>
      </div>
    );
  }
}
export default Banner;
