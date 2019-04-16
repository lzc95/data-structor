let nav = [
  {
    id: 'course',
    title: '课程管理',
    icon: 'file',
    path: '/course'
  },
  {
    id: 'student',
    title: '学生管理',
    icon: 'user',
    path: '/student'
  },
  {
    id: 'notice',
    title: '公告管理',
    icon: 'notification',
    path: '/notice'
  },
  {
    id: 'task',
    title: '测验管理',
    icon: 'tags',
    children:[
      {
        id: 'taskAll',
        title: '全部测验',
        icon: 'mail',
        path: '/taskAll',
      },
      {
        id: 'taskAdd',
        title: '添加测验',
        path: '/taskAdd',
      }
    ]
  },
  {
    id: 'charts',
    title: '图表分析',
    icon: 'pie-chart',
    path: '/charts'
  },
  {
    id: 'setting',
    title: '其他设置',
    icon: 'setting',
    children: [
      {
        id: 'account',
        title: '账户管理',
        icon: 'mail',
        path: '/account'
      }
    ]
  }
];

export{
  nav
}