export default [
  {
    id: 'wiki',
    title: 'Wiki',
    children: [
  // homepage overview anchor (points to wiki overview)
  { path: '/wiki#overview', title: 'Overview' },
      { path: '/wiki/requirements', title: 'Requirements' },
      { path: '/wiki/installation', title: 'Installation' }
    ]
  },
  {
    id: 'stories',
    title: 'Stories',
    children: [
      { path: '/stories', title: 'Important Stories' },
      { path: '/stories/tianming', title: '天命之争' }
    ]
  },
  {
    id: 'characters',
    title: 'Characters',
    children: [
      { path: '/characters', title: '主要封神人物' },
      { path: '/characters/xiannu', title: '仙魔之战' }
    ]
  }
]
