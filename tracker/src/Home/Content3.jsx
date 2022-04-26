import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from './utils';

class Content3 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile } = props;
    delete props.dataSource;
    delete props.isMobile;
    let clearFloatNum = 0;
    const children = dataSource.block.children.map((item, i) => {
      const childObj = item.children;
      const delay = isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
      clearFloatNum += item.md;
      clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum;
      return (
        <TweenOne
          component={Col}
          animation={[
            { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: delay },
            { x: 0, y: 0, opacity: 1 },
          ]}
          key={item.name}
          {...item}
          componentProps={{ md: item.md, xs: item.xs }}
          className={
            !clearFloatNum
              ? `${item.className || ''} clear-both`.trim()
              : item.className
          }
        >
          <TweenOne
            animation={[
              { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: delay },
              { x: 0, y: 0, opacity: 1 },
            ]}
            key="img"
            {...childObj.icon}
          >
            <img src={childObj.icon.children} width="100%" alt="img" />
          </TweenOne>
          <div {...childObj.textWrapper}>
            <TweenOne
              key="h2"
              animation={[
                { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: delay },
                { x: 0, y: 0, opacity: 1 },
              ]}
              component="h2"
              {...childObj.title}
            >
              {childObj.title.children}
            </TweenOne>
            <TweenOne
              key="p"
              animation={[
                { x: 0, y: "+=30", duration: 200, type: 'from', opacity: 0, delay: 400 },
                { x: 0, y: 0, opacity: 1 },
              ]}
              component="div"
              {...childObj.content}
            >
              {childObj.content.children}
            </TweenOne>
          </div>
        </TweenOne>
      );
    });
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim key="u" type="bottom">
              <Row key="row" {...dataSource.block}>
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content3;
