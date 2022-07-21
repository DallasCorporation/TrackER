import React from 'react';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children: {
      logo: 'https://gw.alipayobjects.com/zos/basement_prod/b30cdc2a-d91c-4c78-be9c-7c63b308d4b3.svg',
      href: '/',
    }
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item0',
        className: 'header3-item',
        children: {
          href: '/Service',
          children: [{ children: 'Service', name: 'text' }],
        },
      },
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          href: '/About',
          children: [{ children: 'About', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '/Access',
          children: [{ children: "Join/Access", name: 'text' }],
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
    children: 'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
  },
  content: {
    className: 'banner0-content',
    children: "We provides commercial and industrial customers with a cross-industry solution to scale green energy adoption and improve operating costs driving corporate sustainability.",
  },
  button: { className: 'banner0-button', children: 'Learn More',},
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
              children: 'KPI 1',
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
              children: 'KPI 2',
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
              children: 'KPI 3',
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
  title: { className: 'content1-title', children: 'Section 2' },
  content: {
    className: 'content1-content',
    children:
      "Feeling mad hostile, ran the apostle, flowing like Christ when I speak the gospel. I'm no joker! Play me like poker! Be on you like a house on fire! Smoke ya! I leave the mic in body bags, my rap style has, the force to leave you lost, like the tribe of Shabazz.",
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
        children: 'Title',
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: 'test test test',
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
          title: { className: 'content3-title', children: 'Slammin a hype verse' },
          content: {
            className: 'content3-content',
            children:
              'Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. ',
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
          title: { className: 'content3-title', children: 'Slammin a hype verse' },
          content: {
            className: 'content3-content',
            children:
              'Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. ',
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
          title: { className: 'content3-title', children: 'Slammin a hype verse' },
          content: {
            className: 'content3-content',
            children:
              'Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. ',
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
          title: { className: 'content3-title', children: 'Slammin a hype verse' },
          content: {
            className: 'content3-content',
            children:
              'Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. ',
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
          title: { className: 'content3-title', children: 'Slammin a hype verse' },
          content: {
            className: 'content3-content',
            children:
              'Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. ',
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
          title: { className: 'content3-title', children: 'Slammin a hype verse' },
          content: {
            className: 'content3-content',
            children:
              'Rae got it going on pal, call me the rap assassinator, rhymes rugged and built like Schwarzenegger. ',
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
        children: 'Section 3',
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: "How ya sound B? You're better off a quitter cuz I'm on the mound G, and it's a no-hitter. Murderous material, made by a madman, it's the mic wrecker, Inspector, bad man. ",
      },
    ],
  },
  img: {
    children: 'https://zos.alipayobjects.com/rmsportal/VHGOVdYyBwuyqCx.png',
    className: 'content6-img',
    xs: 24,
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
        title: { className: 'content6-title', children: 'KPI 1' },
        content: {
          className: 'content6-content',
          children:
            "Well I'm a sire, I set the microphone on fire, rap styles vary and carry like Mariah.",
        },
      },
      {
        name: 'block1',
        img: {
          className: 'content6-icon',
          children:
            'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
        },
        title: { className: 'content6-title', children: 'KPI 2' },
        content: {
          className: 'content6-content',
          children:
            "Step through your section with the Force like Luke Skywalker, rhyme author, orchestrate mind torture.",
        },
      },
      {
        name: 'block2',
        img: {
          className: 'content6-icon',
          children:
            'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
        },
        title: { className: 'content6-title', children: 'KPI 3' },
        content: {
          className: 'content6-content',
          children:
            'Lyrically perform armed robbery, flee with the lottery, possibly they spotted me.',
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
      { name: 'title', children: 'People', className: 'title-h1' },
      {
        name: 'content',
        children:
          "Shame on you when you stepped through to The Ol Dirty Bastard straight from the Brooklyn Zoo.",
        className: 'title-content',
      },
      {
        name: 'content2',
        children: " My DJ the catcher, he's my man, anyway he's the one who devised the plan.",
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
            'https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: 'Slogan of TrackER.',
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
