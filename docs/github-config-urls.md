# GitHub Actions 配置链接 - 快速访问

## 🔐 第一步：配置 Secrets

点击下方链接直接访问配置页面：
👉 https://github.com/jinkeep/family-points-system/settings/secrets/actions

### 添加以下 Secrets：

#### Secret 1: TENCENT_DOCS_TOKEN
```
Name: TENCENT_DOCS_TOKEN
Secret: [你的腾讯文档API Token]
```
💡 如果暂时没有，可以先填写: `placeholder`

#### Secret 2: GITHUB_TOKEN（可选）
GitHub Actions 会自动提供 GITHUB_TOKEN，无需手动配置！

---

## ⚙️ 第二步：启用 Actions 权限

点击下方链接直接访问：
👉 https://github.com/jinkeep/family-points-system/settings/actions

### 配置选项：

#### Actions permissions
```
✅ Allow all actions and reusable workflows
```

#### Workflow permissions
```
✅ Read and write permissions
✅ Allow GitHub Actions to create and approve pull requests
```

点击页面底部的 **Save** 按钮保存。

---

## 🌐 第三步：配置 GitHub Pages

点击下方链接直接访问：
👉 https://github.com/jinkeep/family-points-system/settings/pages

### 配置选项：

#### Build and deployment
```
Source: Deploy from a branch
```

#### Branch
```
Branch: gh-pages
Folder: / (root)
```

点击 **Save** 按钮保存。

⚠️ **注意**：首次配置时，gh-pages分支还不存在，需要先运行一次工作流！

---

## 🚀 第四步：运行工作流

点击下方链接直接访问：
👉 https://github.com/jinkeep/family-points-system/actions

### 操作步骤：

1. 点击左侧的 **Update Family Points Data** 工作流
2. 点击右侧的 **Run workflow** 按钮
3. 选择 **main** 分支
4. 点击绿色的 **Run workflow** 按钮
5. 等待工作流完成（约2-3分钟）

---

## ✅ 第五步：验证部署

### 检查工作流状态
访问: https://github.com/jinkeep/family-points-system/actions

应该看到绿色的✅表示成功。

### 检查 gh-pages 分支
访问: https://github.com/jinkeep/family-points-system/tree/gh-pages

应该能看到构建后的静态文件。

### 访问网站
等待5-10分钟后，访问：
👉 https://jinkeep.github.io/family-points-system

---

## 📊 配置进度检查表

- [ ] **步骤1**: 配置 Secrets (TENCENT_DOCS_TOKEN)
- [ ] **步骤2**: 启用 Actions 权限
- [ ] **步骤3**: 配置 Pages (首次需要先运行工作流)
- [ ] **步骤4**: 运行工作流
- [ ] **步骤5**: 验证网站访问

---

## 🆘 遇到问题？

### 问题1: 工作流运行失败
1. 进入 Actions 页面
2. 点击失败的工作流
3. 查看哪个步骤失败（红色❌）
4. 根据错误信息排查

### 问题2: Pages 404错误
1. 确认工作流已成功运行
2. 确认 gh-pages 分支存在
3. 等待5-10分钟让GitHub Pages部署
4. 清除浏览器缓存重试

### 问题3: 权限错误
确认已完成"第二步"的权限配置。

---

## 🎯 快速链接汇总

| 配置项 | 链接 |
|--------|------|
| Secrets配置 | https://github.com/jinkeep/family-points-system/settings/secrets/actions |
| Actions权限 | https://github.com/jinkeep/family-points-system/settings/actions |
| Pages配置 | https://github.com/jinkeep/family-points-system/settings/pages |
| 工作流运行 | https://github.com/jinkeep/family-points-system/actions |
| 网站访问 | https://jinkeep.github.io/family-points-system |

---

**配置完成后，你的家庭积分管理系统将每30分钟自动更新！🎉**
