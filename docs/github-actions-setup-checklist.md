# GitHub Actions 配置检查清单

## 📋 配置前准备

在开始配置之前，请确保你有以下信息：

- [ ] GitHub 账号已登录
- [ ] 本地代码已准备好
- [ ] 腾讯文档 API Token（如果需要自动更新数据）
- [ ] 大约 10-15 分钟时间

---

## ✅ 第一步：创建 GitHub 仓库（2分钟）

### 操作步骤：

1. **打开 GitHub**
   - 访问：https://github.com
   - 登录你的账号

2. **创建新仓库**
   - 点击右上角的 "+" 号
   - 选择 "New repository"

3. **填写仓库信息**
   ```
   Repository name: family-points-system
   Description: 家庭积分管理系统
   Visibility: ✅ Public（公开，可使用免费GitHub Pages）
   
   ⚠️ 重要：不要勾选以下选项（因为本地已有代码）：
   [ ] Add a README file
   [ ] Add .gitignore
   [ ] Choose a license
   ```

4. **点击 "Create repository"**

### 验证：
- [ ] 仓库创建成功
- [ ] 页面显示仓库地址：`https://github.com/[你的用户名]/family-points-system`

---

## ✅ 第二步：推送代码到 GitHub（3分钟）

### 操作步骤：

在本地终端执行以下命令：

```bash
# 1. 进入项目目录
cd /workspace/projects

# 2. 初始化 Git（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: 家庭积分管理系统"

# 5. 设置主分支名称
git branch -M main

# 6. 添加远程仓库（替换 [你的用户名]）
git remote add origin https://github.com/[你的用户名]/family-points-system.git

# 7. 推送代码
git push -u origin main
```

### 验证：
- [ ] 推送成功，没有报错
- [ ] 刷新 GitHub 仓库页面，能看到所有文件

---

## ✅ 第三步：配置 GitHub Secrets（2分钟）

### 为什么需要配置 Secrets？
Secrets 用于安全存储敏感信息（如 API 密钥），不会在日志中泄露。

### 操作步骤：

1. **进入仓库设置**
   ```
   打开你的仓库 → Settings（设置）→ Secrets and variables → Actions
   ```

2. **添加 Secret**
   - 点击 "New repository secret" 按钮
   
3. **填写 Secret 信息**
   ```
   Name: TENCENT_DOCS_TOKEN
   Secret: [你的腾讯文档API Token]
   ```
   
   💡 **注意**：
   - 如果你暂时没有 Token，可以先填写任意值（如：`placeholder`）
   - 后续获取真实 Token 后再更新
   
4. **保存**
   - 点击 "Add secret" 按钮

### 验证：
- [ ] Secrets 页面显示 `TENCENT_DOCS_TOKEN`
- [ ] 值显示为 `***`（已加密）

---

## ✅ 第四步：启用 GitHub Actions（1分钟）

### 操作步骤：

1. **进入 Actions 设置**
   ```
   仓库 → Settings → Actions → General
   ```

2. **配置权限**
   ```
   Actions permissions:
   ✅ Allow all actions and reusable workflows
   
   Workflow permissions:
   ✅ Read and write permissions
   ✅ Allow GitHub Actions to create and approve pull requests
   ```

3. **保存设置**
   - 点击页面底部的 "Save" 按钮

### 验证：
- [ ] Actions 权限已设置为 "Allow all actions"
- [ ] Workflow 权限已设置为 "Read and write permissions"

---

## ✅ 第五步：配置 GitHub Pages（1分钟）

### 操作步骤：

1. **进入 Pages 设置**
   ```
   仓库 → Settings → Pages
   ```

2. **配置部署源**
   ```
   Build and deployment:
   Source: Deploy from a branch
   
   Branch:
   - 选择: gh-pages
   - 文件夹: / (root)
   ```

3. **保存设置**
   - 点击 "Save" 按钮

### 验证：
- [ ] Pages 设置已保存
- [ ] 页面顶部显示提示信息（可能需要等待几分钟）

---

## ✅ 第六步：首次运行工作流（3分钟）

### 操作步骤：

1. **进入 Actions 页面**
   ```
   仓库 → Actions 标签
   ```

2. **选择工作流**
   ```
   左侧选择: Update Family Points Data
   ```

3. **手动触发**
   ```
   点击右侧: Run workflow
   选择分支: main
   点击绿色按钮: Run workflow
   ```

4. **查看执行状态**
   ```
   等待几秒钟 → 点击正在运行的工作流 → 查看实时日志
   ```

### 预期结果：
```
✅ 每个步骤都应该显示绿色对勾
✅ 最后一步 "Deploy to GitHub Pages" 完成后
✅ 网站访问地址: https://[你的用户名].github.io/family-points-system
```

### 验证：
- [ ] 工作流执行成功
- [ ] 访问网站地址能正常显示
- [ ] 首页显示"家庭积分管理系统"

---

## 📊 配置状态检查表

完成以上步骤后，检查以下状态：

| 检查项 | 状态 | 说明 |
|--------|------|------|
| GitHub 仓库 | ⬜ | 仓库已创建并推送代码 |
| Secrets 配置 | ⬜ | TENCENT_DOCS_TOKEN 已添加 |
| Actions 权限 | ⬜ | 已启用读写权限 |
| Pages 配置 | ⬜ | 已设置 gh-pages 分支 |
| 工作流运行 | ⬜ | 首次运行成功 |
| 网站访问 | ⬜ | 能正常访问网站 |

---

## 🔍 验证部署成功

### 检查部署状态：

1. **查看 gh-pages 分支**
   ```
   仓库 → Code → 切换到 gh-pages 分支
   应该能看到构建后的静态文件（index.html 等）
   ```

2. **访问网站**
   ```
   https://[你的用户名].github.io/family-points-system
   
   预期结果：
   ✅ 显示"家庭积分管理系统"
   ✅ 能看到三个成员的积分卡片
   ✅ 点击卡片能进入详情页
   ```

3. **查看工作流徽章**
   ```
   在仓库首页应该能看到：
   ✅ 绿色的 "Update Data" 徽章（表示工作流正常）
   ```

---

## ❌ 常见问题排查

### 问题 1：工作流执行失败

**检查步骤：**
1. 进入 Actions → 点击失败的工作流
2. 展开每个步骤，查看红色❌的错误信息
3. 常见原因：
   - 权限不足 → 检查第四步配置
   - Secret 未配置 → 检查第三步配置
   - 构建错误 → 查看构建日志，修复代码

### 问题 2：网站访问 404

**检查步骤：**
1. 确认 gh-pages 分支存在且有文件
2. 确认 Pages 配置正确（第五步）
3. 等待 5-10 分钟，GitHub Pages 需要时间部署
4. 清除浏览器缓存重试

### 问题 3：Secret 配置错误

**解决方法：**
1. 进入 Settings → Secrets → Actions
2. 点击 Secret 名称 → Update
3. 输入正确的值 → Update secret
4. 重新运行工作流

### 问题 4：权限不足错误

**错误信息：**
```
remote: Permission to [username]/family-points-system.git denied to github-actions[bot].
```

**解决方法：**
1. Settings → Actions → General
2. Workflow permissions 选择 "Read and write permissions"
3. 点击 Save
4. 重新运行工作流

---

## 🎉 配置成功标志

当你看到以下内容时，说明配置成功：

✅ Actions 页面显示工作流运行成功（绿色对勾）  
✅ gh-pages 分支有文件  
✅ 网站 https://[你的用户名].github.io/family-points-system 能正常访问  
✅ 网站显示"家庭积分管理系统"和积分数据  

---

## 📝 后续操作

配置成功后，GitHub Actions 会：

- ⏰ 每 30 分钟自动检查更新
- 🔄 自动从腾讯文档获取最新数据
- 🚀 自动构建并部署网站
- 📊 保持网站数据最新

你只需要：
- 在腾讯文档中更新积分数据
- 等待最多 30 分钟
- 网站自动更新！🎊

---

## 💡 小贴士

1. **添加工作流徽章到 README**
   ```markdown
   ![Update Data](https://github.com/[你的用户名]/family-points-system/actions/workflows/update-data.yml/badge.svg)
   ```

2. **查看工作流运行历史**
   ```
   Actions → Update Family Points Data → 查看所有运行记录
   ```

3. **手动触发更新**
   ```
   Actions → Update Family Points Data → Run workflow
   ```

4. **停止自动更新**
   ```
   编辑 .github/workflows/update-data.yml
   注释掉 schedule 部分
   ```

---

## 🆘 需要帮助？

如果遇到问题：

1. 查看工作流日志（Actions → 点击具体的运行记录）
2. 检查以上配置步骤是否都完成
3. 查看 `docs/github-actions-guide.md` 详细文档
4. 在 GitHub 仓库的 Issues 中提问

---

**恭喜！按照这个清单操作，你一定能成功配置 GitHub Actions！🎊**
