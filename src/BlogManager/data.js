import projects from './data/projects'
import friends from './data/friends'

export default {
  personalInfo: {
    blogName: '<span italic-f>SakuraLong\'s</span>',
    blogDesc: '<span elysia-f>Elysian</span><span italic-f size-09-f> Fields</span>',
    hello: 'Ciallo～(∠・ω< )⌒<span style="color: #FFF200">★</span>',
    name: 'SakuraLong',
    helloName: '<span class="font" elysia-c uline >SakuraLong</span>',
    about: 'Student',
    detailAbout: 'Student',
    avatar: '',
    links: [
      ['github', './svg/github.svg', '@SakuraLong', 'https://github.com/SakuraLong'],
      ['blbl', './svg/blbl.svg', '@宵宫滴绷带', 'https://space.bilibili.com/543157486'],
      ['email', './svg/email.svg', 'sakuraloong@qq.com', 'QQ邮箱', true]
    ],
    aka: [
      '<span>SakuraLong / SakuraLoong / SakuraYoimiya</span>'
    ],
    aboutMe: [
      '大学本科生',
      '了解一点Javascript/Python/C++',
      '闲暇时发点有趣的在该博客上'
    ]
  },
  blog: {
    name: 'SakuraLong\'s Elysian Fields',
    beian: ['琼ICP备2024038765号', 'https://beian.miit.gov.cn'],
    begin: '2024',
    imageBaseUrl: 'https://cdn.jsdelivr.net/gh/SakuraLong/images/blog/',
    baseUrl: 'https://www.sakuralong.com/'
  },
  projects: projects,
  friends: friends
}
