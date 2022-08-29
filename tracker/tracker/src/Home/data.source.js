import React from 'react';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children: {
      logo: 'https://res.cloudinary.com/dgfnyulqh/image/upload/v1661774798/logo_1_alj01r.jpg',
      href: '/',
    }
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          href: '/Home',
          children: [{ children: 'Home', name: 'text' }],
        },
      },
      {
        name: 'item0',
        className: 'header3-item',
        children: {
          href: '/Service',
          children: [{ children: 'Service', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '/Access',
          children: [{ children: "Sign In", name: 'text' }],
        },
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Banner01DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: 'https://res.cloudinary.com/dgfnyulqh/image/upload/v1661777772/Senzanome_msgnl2.png',
  },
  content: {
    className: 'banner0-content',
    children: "We provides commercial and industrial customers with a cross-industry solution to scale green energy adoption and improve operating costs driving corporate sustainability.",
  },
  button: { className: 'banner0-button', children: 'Learn More', },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: 'Unlocking the Value of Energy Resources' }],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: 'Simple',
            },
            { name: 'content', children: "Our subscription model allows customers to register sites in a few clicks and scale up or down as needed. Our professional services, included in the subscription, guarantee a quick return of investment." },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: 'Automated',
            },
            {
              name: 'content',
              children: "The TrackER Energy Information System provides a suite of automated services to collect, standardize, and visualize 15-minute interval data and billing information so our customers can focus on their core business.",
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: 'Full-Service',
            },
            {
              name: 'content',
              children: "Demand charge management, load forecasting, utility rate comparison, net energy monitoring, setback and retrospective analysis are only a few examples of the TrackER service suite.",
            },
          ],
        },
      },
    ],
  },
};
export const Feature10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: { className: 'home-page content1', playScale: 0.3 },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: 'https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png',
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: { className: 'content1-title', children: 'We serve the entire Energy Ecosystem. Start now with no upfront cost.' },
  content: {
    className: 'content1-content',
    children:
      "Our subscription model allows customers to register sites in a few clicks and scale up or down as needed. No upfront cost makes the TrackER solution unique and easy to adopt. Our professional services, included in the subscription, guarantee a quick return of investment.",
  },
};
export const Content30DataSource = {
  wrapper: { className: 'home-page-wrapper content3-wrapper' },
  page: { className: 'home-page content3' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: 'Advanced Energy Analytics',
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: 'Businesses and residents often deal with complex monthly energy bills',
      },
    ],
  },
  block: {
    className: 'content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: 'Meter Data Collection Automation' },
          content: {
            className: 'content3-content',
            children:
              'Automated Time-of-Use energy and demand charge breakdowns are displayed for each billing period on an intuitive user-friendly dashboard, empowering you to optimize building operations intelligently.',
          },
        },
      },
      {
        name: 'block1',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: 'Advanced Energy Analytics' },
          content: {
            className: 'content3-content',
            children:
              'Demand charge management, load forecasting, utility rate comparison, net energy monitoring, setback and retrospective analysis are only a few examples of the TrackER service suite. ',
          },
        },
      },
      {
        name: 'block2',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: 'Sustainability' },
          content: {
            className: 'content3-content',
            children:
              'TrackER sustainability service suite provides the toolkit to reduce or eliminate GHG emissions, usually with a focus on Scope 1 and 2 emissions. It enables the digital monitoring of carbon emissions and the tracking of corporate sustainability goals ',
          },
        },
      },
      {
        name: 'block3',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: 'Customer Engagement' },
          content: {
            className: 'content3-content',
            children:
              'TrackER platform bridges the gap of today’s DER market inefficiencies. Our service suite includes a customer engagement tool to streamline the DER lead generation process for vendors, energy and service providers.',
          },
        },
      },
      {
        name: 'block4',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: 'Fleet Management' },
          content: {
            className: 'content3-content',
            children:
              "With the TrackER fleet manager tool, our customers can easily monitor their portfolio and run all the advanced energy analytics to optimize planning and operations. Scope 1, scope 2 and scope 3 emissions are monitored and reported over the entire portfolio supporting the customer' s sustainability goal tracking. ",
          },
        },
      },
      {
        name: 'block5',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: 'Energy Asset Optimization' },
          content: {
            className: 'content3-content',
            children:
              'The adoption of Distributed Energy Resources such as Solar PV, Fuel Cell, Energy Storage, Electric Vehicles is growing exponentially and changing the traditional commercial and industrial landscape. ',
          },
        },
      },
    ],
  },
};
export const Feature40DataSource = {
  wrapper: { className: 'home-page-wrapper content6-wrapper' },
  OverPack: { className: 'home-page content6' },
  textWrapper: { className: 'content6-text', xs: 24, md: 10 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: 'Energy Asset Optimization',
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: "The adoption of solar PV, fuel cells, energy storage systems, electric Vehicles is changing the traditional commercial and industrial site energy load. TrackER provides an AI-based algorithm to supervise and optimize your distributed energy resources.",
      },
    ],
  },
  img: {
    children: 'https://img.freepik.com/free-vector/active-people-bikes-windmills-house-with-solar-panel-rooftop-flat-illustration_74855-10477.jpg?w=2000&t=st=1661782614~exp=1661783214~hmac=e47bd15f058d891ce0bc3690cbc23dd978d82d342ae82c382f5496ec91601ee4',
    className: 'content6-img',
    xs: 24,
    sm:24,
    md: 14,
  },
  block: {
    children: [
      {
        name: 'block0',
        img: {
          children:
            'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          className: 'content6-icon',
        },
        title: { className: 'content6-title', children: '64MW OF POTENTIAL SOLAR PROJECTS' },
        content: {
          className: 'content6-content',
          children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      },
      {
        name: 'block1',
        img: {
          className: 'content6-icon',
          children:
            'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
        },
        title: { className: 'content6-title', children: '700 MONITORED SITES' },
        content: {
          className: 'content6-content',
          children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et molestie.",
        },
      },
      {
        name: 'block2',
        img: {
          className: 'content6-icon',
          children:
            'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
        },
        title: { className: 'content6-title', children: '€7M ENERGY SAVINGS' },
        content: {
          className: 'content6-content',
          children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      },
    ],
  },
};
export const Content120DataSource = {
  wrapper: { className: 'home-page-wrapper content12-wrapper' },
  page: { className: 'home-page content12' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      { name: 'title', children: 'SECTION 2', className: 'title-h1' },
    ],
  },
  block: {
    className: 'img-wrapper',
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/TFicUVisNHTOEeMYXuQF.svg',
          },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/hkLGkrlCEkGZeMQlnEkD.svg',
          },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/bqyPRSZmhvrsfJrBvASi.svg',
          },
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/UcsyszzOabdCYDkoPPnM.svg',
          },
        },
      },
      {
        name: 'block4',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/kRBeaICGexAmVjqBEqgw.svg',
          },
        },
      },
      {
        name: 'block5',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/ftBIiyJcCHpHEioRvPsV.svg',
          },
        },
      },
    ],
  },
};
export const Content110DataSource = {
  OverPack: {
    className: 'home-page-wrapper content11-wrapper',
    playScale: 0.3,
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      { name: 'title', children: 'For Our People And Earth', className: 'title-h1' },
      {
        name: 'content',
        children:
          <p>Lack of customer data digitization and automation is preventing DER vendors and project developers from scaling their customer engagement and strategies</p>,
        className: 'title-content',
      },
      {
        name: 'content2',
        children: <p>The TrackER platform bridges the gap of today’s DER market inefficiencies.</p>,
        className: 'title-content',
      },
    ],
  },
  button: {
    className: '',
    children: { a: { className: 'button', href: '/Access', children: 'Join Now' } },
  },
};
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'https://res.cloudinary.com/dgfnyulqh/image/upload/v1661776543/Senzanome_v4pxgz.png',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: '',
            },
          ],
        },
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Company' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'About us' },
            { href: '#', name: 'link0', children: 'Partnership' },
            { href: '#', name: 'link0', children: 'Team' },
            { href: '#', name: 'link0', children: 'FAQ' },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Social' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Twitter' },
            { href: '#', name: 'link0', children: 'Facebook' },
            { href: '#', name: 'link0', children: 'LinkedIn' },
            { href: '#', name: 'link1', children: 'Instagram' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Our Partners' },
        childWrapper: {
          children: [
            { href: 'https://www.dernetsoft.com/', target: "_blank", name: 'link0', children: 'DERNetSoft' },
            { href: 'https://www.osisoft.com/', target: "_blank", name: 'link1', children: 'OsiSoft' },
            { href: 'https://www.bloomenergy.com/', target: "_blank", name: 'link1', children: 'Bloom Energy' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        ©2022 by TrackER All Rights Reserved
      </span>
    ),
  },
};
