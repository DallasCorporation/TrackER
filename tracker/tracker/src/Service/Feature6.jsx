import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Carousel as AntCarousel, Row, Col } from 'antd';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

class Feature6 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      current: 0,
    };
  }


  onTitleClick = (_, i) => {
    console.log(this.carouselRef.current, i)
    const carouselRef = this.carouselRef.current;
    carouselRef.goTo(i);
  };


  onBeforeChange = (_, newIndex) => {
    this.setState({ current: newIndex, });
  };

  getChildrenToRender = (dataSource) => {
    const { current } = this.state;
    const { Carousel } = dataSource;
    const {
      titleWrapper,
      children: childWrapper,
      wrapper,
      ...carouselProps
    } = Carousel;

    const {
      barWrapper,
      title: titleChild,
      ...titleWrapperProps
    } = titleWrapper;
    const titleToRender = [];

    const childrenToRender = childWrapper.map((item, ii) => {
      const { title, children, ...itemProps } = item;
      titleToRender.push(
        <div
          {...title}
          key={ii.toString()}
          onClick={(e) => {
            this.onTitleClick(e, ii);
          }}
          className={ii === current ? `${title.className || ''} active` : title.className}
        >
          {title.children}
        </div>
      );
      const childrenItem = children.map(($item, i) => {
        const { number, children: child, ...childProps } = $item;
        const numberChild = number.children.replace(/[^0-9.-]/g, '');
        const { unit, toText, ...numberProps } = number;
        console.log(number, unit)
        return (
          ii === this.state.current &&
          <Col {...childProps} >
            <TweenOne
              {...numberProps}
              animation={{
                Children: {
                  value: parseFloat(numberChild),
                  floatLength:
                    parseFloat(numberChild) -
                      Math.floor(parseFloat(numberChild)) >
                      0
                      ? 2
                      : 0,
                  formatMoney: true,
                },
                duration: 1000,
                delay: 300,
                ease: 'easeInOutCirc',
              }}
              component="span"
            >
              0
            </TweenOne>
            {unit && <span {...unit}>{unit.children}</span>}
            <p {...child}>{child.children}</p>
          </Col>
        );
      });
      return (
        <div key={ii.toString()}>
          <QueueAnim type="bottom" component={Row} {...itemProps}>
            {childrenItem}
          </QueueAnim>
        </div>
      );
    });

    const width = 100 / childrenToRender.length;
    return (
      <div>
        <div {...titleWrapperProps} key="title">
          <div {...titleChild}>
            {titleToRender}
            <div
              {...barWrapper}
              style={{
                width: `${width}%`,
                left: `${width * current}%`,
              }}
            >
              <em {...barWrapper.children} />
            </div>
          </div>
        </div>
        <AntCarousel
          ref={this.carouselRef}
          key="carousel"
          {...carouselProps}
          infinite={false}
          beforeChange={this.onBeforeChange}
        >

          {childrenToRender}
        </AntCarousel>
      </div>

    );
  };

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    return (
      <div {...props} {...dataSource.wrapper}>
        <div>
          <OverPack {...dataSource.OverPack}>
            {this.getChildrenToRender(dataSource)}
          </OverPack>
        </div>
      </div>
    );
  }
}
export default Feature6;
