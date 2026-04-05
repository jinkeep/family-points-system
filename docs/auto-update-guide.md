# 家庭积分系统 - 自动更新配置指南

## 当前状态

❌ **当前页面不能自动更新**
- 数据是静态的，硬编码在页面中
- 需要手动重新构建和部署

## 解决方案对比

### 方案1：手动更新（当前可用）⭐ 推荐

**操作步骤：**
```bash
# 1. 运行更新脚本
cd /workspace/projects
bash scripts/quick-update.sh

# 2. 部署到 GitHub Pages
cd out
git init
git add -A
git commit -m "更新数据"
git push -f origin master:gh-pages
```

**优点：** 简单、免费、可控
**缺点：** 需要手动操作

---

### 方案2：GitHub Actions 自动更新（推荐）

**配置步骤：**
1. 在 GitHub 仓库设置中添加 Secret：
   - 名称：`TENCENT_DOCS_TOKEN`
   - 值：`c08cf13a910a4ca6981b7c3f4eb48868`

2. 启用 GitHub Actions：
   - 访问仓库的 Actions 标签
   - 启用工作流

3. 自动运行：
   - 每30分钟自动更新一次
   - 也可以手动触发

**优点：** 全自动、免费
**缺点：** 配置稍复杂

---

### 方案3：迁移到 Vercel（最佳方案）⭐⭐⭐

**优势：**
- ✅ 支持动态 API
- ✅ 免费托管
- ✅ 自动部署
- ✅ 真正的实时更新

**迁移步骤：**
1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 配置环境变量：`TENCENT_DOCS_TOKEN`
4. 自动部署

**实现方式：**
- 创建 API 路由读取腾讯文档
- 前端实时调用 API
- 数据实时更新

---

## 立即可用的方法

**告诉我："更新数据并部署"**，我会帮您：
1. 从腾讯文档读取最新数据
2. 重新构建页面
3. 部署到 GitHub Pages

整个过程约需1分钟。

---

## 数据更新频率建议

| 更新频率 | 推荐方案 |
|---------|---------|
| 每天1-2次 | 手动更新 |
| 每小时1次 | GitHub Actions |
| 实时更新 | Vercel |

---

## 下一步

请告诉我：
1. **现在就更新** - 我立即帮您更新数据
2. **配置自动更新** - 我帮您配置 GitHub Actions
3. **迁移到 Vercel** - 我帮您实现真正的实时更新
