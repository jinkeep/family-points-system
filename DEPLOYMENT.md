# GitHub Pages 部署指南

## 问题已修复 ✅

### 修复内容
1. **移除客户端JavaScript依赖** - 首页改为服务端组件，不依赖JavaScript渲染
2. **移除Framer Motion动画** - 改用CSS过渡效果，兼容静态导出
3. **移除外部图片URL** - 使用emoji代替头像，避免跨域问题
4. **更新页面metadata** - 修正页面标题和描述信息

### 部署步骤

#### 方式1：自动部署（推荐）
推送到GitHub后，GitHub Actions会自动构建和部署：

```bash
git add .
git commit -m "fix: 修复GitHub Pages空白问题"
git push origin master
```

等待GitHub Actions完成后，访问：
```
https://你的用户名.github.io/family-points-system/
```

#### 方式2：手动部署
如果自动部署失败，可以手动执行：

```bash
# 1. 安装依赖
pnpm install

# 2. 构建项目
pnpm build

# 3. 部署到gh-pages分支
cd out
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f https://x-access-token:YOUR_TOKEN@github.com/USERNAME/REPO.git master:gh-pages
```

### GitHub Pages 配置
确保在GitHub仓库设置中：
1. 进入 Settings > Pages
2. Source 选择 `gh-pages` 分支
3. 文件夹选择 `/ (root)`
4. 保存后等待部署完成

### 验证部署
部署成功后，检查以下内容：
- ✅ 首页标题：家庭积分管理系统
- ✅ 积分数据正常显示
- ✅ 点击卡片可跳转到详情页
- ✅ 详情页数据正常显示

### 常见问题

**Q: 为什么之前页面显示空白？**
A: 因为使用了客户端JavaScript渲染（'use client'）和Framer Motion动画，静态导出时JavaScript无法执行，导致内容不可见。

**Q: 为什么basePath是 `/family-points-system/`？**
A: GitHub Pages的项目页面路径格式为 `https://username.github.io/repo-name/`，basePath需要匹配仓库名。

**Q: 如何更新数据？**
A: 修改 `src/lib/data.ts` 文件后重新构建部署，或配置GitHub Actions自动更新。
