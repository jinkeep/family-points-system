// 家庭积分数据 - 来自腾讯文档"家庭旅游基金"
export const familyData = {
  rules: [
    { rule: '小宝9点半之前睡觉', points: '+10' },
    { rule: '大宝10点半之前睡觉', points: '+10' },
    { rule: '妈妈12点之前睡觉', points: '+10' },
    { rule: '按时完成作业', points: '+5' },
    { rule: '帮助做家务', points: '+3' },
    { rule: '阅读30分钟', points: '+2' },
    { rule: '按时起床', points: '+1' },
    { rule: '整理房间', points: '+2' },
    { rule: '运动30分钟', points: '+3' },
    { rule: '练琴30分钟', points: '+4' },
    { rule: '主动学习', points: '+5' },
    { rule: '迟到', points: '-2' },
    { rule: '未完成作业', points: '-3' },
    { rule: '发脾气', points: '-5' },
    { rule: '说脏话', points: '-10' },
  ],
  points: {
    小宝: 500,
    大宝: 500,
    妈妈: 500
  },
  details: {
    小宝: [
      { date: '2026-04-01', item: '家庭旅游基金', points: 100, description: '4月1日积分' },
      { date: '2026-04-02', item: '家庭旅游基金', points: 100, description: '4月2日积分' },
      { date: '2026-04-03', item: '家庭旅游基金', points: 100, description: '4月3日积分' },
      { date: '2026-04-04', item: '家庭旅游基金', points: 100, description: '4月4日积分' },
      { date: '2026-04-05', item: '家庭旅游基金', points: 100, description: '4月5日积分' },
    ],
    大宝: [
      { date: '2026-04-01', item: '家庭旅游基金', points: 100, description: '4月1日积分' },
      { date: '2026-04-02', item: '家庭旅游基金', points: 100, description: '4月2日积分' },
      { date: '2026-04-03', item: '家庭旅游基金', points: 100, description: '4月3日积分' },
      { date: '2026-04-04', item: '家庭旅游基金', points: 100, description: '4月4日积分' },
      { date: '2026-04-05', item: '家庭旅游基金', points: 100, description: '4月5日积分' },
    ],
    妈妈: [
      { date: '2026-04-01', item: '家庭旅游基金', points: 100, description: '4月1日积分' },
      { date: '2026-04-02', item: '家庭旅游基金', points: 100, description: '4月2日积分' },
      { date: '2026-04-03', item: '家庭旅游基金', points: 100, description: '4月3日积分' },
      { date: '2026-04-04', item: '家庭旅游基金', points: 100, description: '4月4日积分' },
      { date: '2026-04-05', item: '家庭旅游基金', points: 100, description: '4月5日积分' },
    ]
  }
};
