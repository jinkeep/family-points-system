# 家庭积分管理系统

一个现代化的家庭积分管理系统，用于记录和追踪家庭成员的积分，激励孩子的成长和进步。

## 功能特性

### 核心功能
- **积分规则展示** - 清晰展示所有积分获得和扣除规则
- **积分总览** - 直观展示各家庭成员的当前积分
- **积分明细** - 详细记录每一笔积分变动
- **数据可视化** - 趋势图、饼图等多种图表展示

### 技术特性
- **实时更新** - 每30分钟自动刷新数据
- **丰富动画** - 使用Framer Motion实现流畅的动画效果
- **响应式设计** - 完美适配各种设备尺寸
- **现代UI** - 基于shadcn/ui组件库

## 技术栈

- **框架**: Next.js 16 (App Router)
- **核心**: React 19
- **语言**: TypeScript 5
- **UI组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图表**: Recharts
- **包管理**: pnpm

## 项目结构

```
├── src/
│   ├── app/
│   │   ├── api/excel/route.ts      # 数据API
│   │   ├── person/[name]/page.tsx  # 个人积分详情页
│   │   ├── layout.tsx               # 根布局
│   │   └── page.tsx                 # 首页
│   ├── components/ui/               # UI组件库
│   ├── hooks/                       # 自定义Hooks
│   └── lib/                         # 工具函数
├── public/                          # 静态资源
└── package.json                     # 项目依赖
```

## 页面说明

### 首页 (/)
- 展示积分规则表
- 显示家庭成员积分总览
- 提供快速导航入口

### 个人页面 (/person/[name])
- 显示个人总积分、获得积分、扣除积分
- 积分趋势图表
- 积分类型分布饼图
- 详细积分记录列表（支持筛选）

## 数据配置

当前使用模拟数据，可在 `src/app/api/excel/route.ts` 中配置真实数据源。

### 支持的数据源
- Excel文档（通过腾讯文档、Google Sheets等）
- 数据库（通过API接口）
- 本地JSON文件

## 开发指南

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

## 部署

项目已部署到GitHub Pages：https://github.com/jinkeep/family-points-system

### 部署步骤
1. 构建项目：`pnpm build`
2. 推送代码到GitHub
3. 在GitHub仓库设置中启用GitHub Pages
4. 选择部署分支和目录

## 自定义配置

### 修改积分规则
在 `src/app/api/excel/route.ts` 中的 `mockData.rules` 数组中修改

### 修改积分数据
在 `src/app/api/excel/route.ts` 中的 `mockData.points` 和 `mockData.details` 中修改

### 修改更新频率
在 `src/app/page.tsx` 和 `src/app/person/[name]/page.tsx` 中修改 `setInterval` 的时间参数

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！

---

用爱与规则陪伴成长 ❤️
