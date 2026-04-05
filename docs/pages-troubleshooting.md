# GitHub Pages 404/空白页面排查指南

## 🔍 问题诊断

访问 https://jinkeep.github.io/family-points-system 没有内容，可能的原因：

### 1️⃣ gh-pages 分支还未创建

**检查方法**：
访问：https://github.com/jinkeep/family-points-system/tree/gh-pages

**如果显示 404**：
- 说明 gh-pages 分支还未创建
- 需要先运行 GitHub Actions 工作流

**解决方案**：
```
1. 访问：https://github.com/jinkeep/family-points-system/actions
2. 点击 "Update Family Points Data"
3. 点击 "Run workflow"
4. 等待 2-3 分钟工作流完成
5. 再次检查 gh-pages 分支
```

---

### 2️⃣ GitHub Pages 未正确配置

**检查方法**：
访问：https://github.com/jinkeep/family-points-system/settings/pages

**正确配置应该是**：
```
Source: Deploy from a branch
Branch: gh-pages / (root)
```

**如果配置不正确**：
1. 选择 "Deploy from a branch"
2. Branch 选择 "gh-pages"
3. Folder 选择 "/ (root)"
4. 点击 "Save"

---

### 3️⃣ GitHub Pages 还在部署中

**检查方法**：
访问：https://github.com/jinkeep/family-points-system/deployments

**如果看到 "github-pages" deployment**：
- 等待状态变为 "Active"
- 通常需要 5-10 分钟

---

### 4️⃣ basePath 配置问题

**检查方法**：
查看项目的 `next.config.ts`：

```typescript
const nextConfig: NextConfig = {
  ...(isProd && {
    output: 'export',
    basePath: '/family-points-system',  // 必须有这个
  }),
  // ...
};
```

**验证**：
- 本地构建的 `out/index.html` 应该能直接访问
- 路径应该是相对路径

---

## 🛠️ 快速修复步骤

### 步骤 1: 检查 Actions 是否运行

访问：https://github.com/jinkeep/family-points-system/actions

**如果没有运行记录**：
```
点击 "Update Family Points Data" → "Run workflow" → "Run workflow"
```

**如果有失败记录**：
```
点击失败的工作流 → 查看错误日志 → 告诉我错误信息
```

---

### 步骤 2: 检查 gh-pages 分支

访问：https://github.com/jinkeep/family-points-system/tree/gh-pages

**应该看到**：
```
- index.html
- _next/ 目录
- person/ 目录
- favicon.ico
- 其他静态文件
```

**如果看到这些文件**：
- ✅ 分支创建成功
- 继续下一步

**如果是空的或 404**：
- ❌ 工作流可能失败了
- 需要检查 Actions 日志

---

### 步骤 3: 配置 GitHub Pages

访问：https://github.com/jinkeep/family-points-system/settings/pages

**配置步骤**：
```
1. Source: 选择 "Deploy from a branch"
2. Branch: 选择 "gh-pages"
3. Folder: 选择 "/ (root)"
4. 点击 "Save"
```

---

### 步骤 4: 等待部署

访问：https://github.com/jinkeep/family-points-system/deployments

等待状态从 "Building" 变为 "Active"（约5-10分钟）

---

## 📊 检查清单

请按顺序检查以下项目：

- [ ] **Actions 已运行**: https://github.com/jinkeep/family-points-system/actions
- [ ] **工作流成功**: 看到绿色的 ✅
- [ ] **gh-pages 分支存在**: https://github.com/jinkeep/family-points-system/tree/gh-pages
- [ ] **Pages 已配置**: https://github.com/jinkeep/family-points-system/settings/pages
- [ ] **部署已完成**: https://github.com/jinkeep/family-points-system/deployments
- [ ] **清除缓存**: Ctrl+Shift+R 强制刷新浏览器

---

## 🔧 常见问题解决方案

### 问题 1: Actions 运行失败

**可能原因**：
- 权限不足
- Secrets 未配置
- 构建错误

**解决方案**：
```
1. 检查 Actions 权限设置
2. 查看工作流日志中的错误信息
3. 告诉我具体的错误信息，我来帮你修复
```

### 问题 2: gh-pages 分支为空

**可能原因**：
- 工作流未运行
- 构建失败
- 部署脚本错误

**解决方案**：
```
1. 手动运行工作流
2. 检查工作流日志
3. 确认构建成功
```

### 问题 3: Pages 显示空白

**可能原因**：
- basePath 配置错误
- JavaScript 加载失败
- 路由问题

**解决方案**：
```
1. 检查浏览器控制台错误（F12）
2. 检查 next.config.ts 的 basePath 配置
3. 清除浏览器缓存
```

---

## 💡 立即执行的操作

**请告诉我以下信息**：

1. **Actions 页面状态**：
   - 访问 https://github.com/jinkeep/family-points-system/actions
   - 是否有运行记录？
   - 是成功（绿色✅）还是失败（红色❌）？

2. **gh-pages 分支状态**：
   - 访问 https://github.com/jinkeep/family-points-system/tree/gh-pages
   - 是否存在？
   - 里面有什么文件？

3. **Pages 配置状态**：
   - 访问 https://github.com/jinkeep/family-points-system/settings/pages
   - Source 是什么？
   - Branch 是什么？

**提供这些信息后，我可以精准定位问题并给出解决方案！**
