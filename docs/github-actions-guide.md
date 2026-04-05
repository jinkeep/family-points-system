# GitHub Actions 自动更新完整指南

## 📖 目录

1. [工作原理](#工作原理)
2. [配置步骤](#配置步骤)
3. [使用流程](#使用流程)
4. [常见问题](#常见问题)

---

## 🎯 工作原理

### 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions 工作流                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├── 触发条件
                              │   ├─ 定时触发（每30分钟）
                              │   └─ 手动触发
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 1: 检出代码                                             │
│  - 克隆仓库到GitHub服务器                                      │
│  - 获得最新代码                                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: 安装Node.js环境                                      │
│  - 配置Node.js 20运行环境                                      │
│  - 安装pnpm包管理器                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 3: 获取最新数据                                          │
│  - 运行 scripts/update-data.js                                │
│  - 调用腾讯文档API获取数据                                      │
│  - 更新 src/lib/data.ts                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 4: 构建项目                                              │
│  - 安装依赖：pnpm install                                      │
│  - 构建项目：pnpm build                                        │
│  - 生成静态文件到 out/ 目录                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 5: 部署到GitHub Pages                                    │
│  - 初始化Git仓库                                               │
│  - 提交静态文件                                                 │
│  - 强制推送到 gh-pages 分支                                     │
│  - GitHub Pages自动发布                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    🌐 网站更新完成！
            访问: https://[username].github.io/family-points-system
```

### 执行时间线

```
时间轴：
├─ T+0s    : 工作流触发
├─ T+10s   : 代码检出完成
├─ T+30s   : Node.js环境配置完成
├─ T+60s   : 依赖安装完成
├─ T+70s   : 数据获取完成
├─ T+90s   : 项目构建完成
└─ T+100s  : 部署完成，网站更新
```

---

## ⚙️ 配置步骤

### 第一步：配置GitHub Secrets

GitHub Secrets用于安全地存储敏感信息（如API密钥）。

1. **进入仓库设置**
   ```
   打开GitHub仓库 → Settings → Secrets and variables → Actions
   ```

2. **添加Secret**
   - 点击 "New repository secret"
   - Name: `TENCENT_DOCS_TOKEN`
   - Value: 你的腾讯文档API密钥
   - 点击 "Add secret"

3. **验证Secret**
   ```
   Secret配置后，在工作流中通过 ${{ secrets.TENCENT_DOCS_TOKEN }} 使用
   ```

### 第二步：启用GitHub Actions

1. **检查Actions权限**
   ```
   Settings → Actions → General
   - 选择 "Allow all actions and reusable workflows"
   - 或选择 "Allow selected actions" 并添加允许的actions
   ```

2. **启用Workflow**
   ```
   Actions标签页 → 找到 "Update Family Points Data" → 点击 "Enable workflow"
   ```

### 第三步：配置GitHub Pages

1. **启用GitHub Pages**
   ```
   Settings → Pages → Source → 选择 "Deploy from a branch"
   ```

2. **选择部署分支**
   ```
   Branch: gh-pages
   Folder: / (root)
   点击 "Save"
   ```

3. **等待部署完成**
   ```
   几分钟后，访问 https://[username].github.io/family-points-system
   ```

### 第四步：配置工作流权限

1. **授予写入权限**
   ```
   Settings → Actions → General → Workflow permissions
   - 选择 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"
   - 点击 "Save"
   ```

---

## 🚀 使用流程

### 方式一：定时自动更新

**无需任何操作！**

GitHub Actions会每30分钟自动执行：
- 检查腾讯文档是否有新数据
- 自动更新网站内容
- 无需人工干预

### 方式二：手动触发更新

1. **进入Actions页面**
   ```
   GitHub仓库 → Actions → Update Family Points Data
   ```

2. **手动运行**
   ```
   点击右侧 "Run workflow" → 选择分支 → 点击 "Run workflow"
   ```

3. **查看执行日志**
   ```
   等待几秒钟 → 点击正在运行的工作流 → 查看实时日志
   ```

### 方式三：代码推送触发

如果需要代码推送时自动更新，可以在 `.github/workflows/update-data.yml` 中添加：

```yaml
on:
  push:
    branches: [ main ]  # 推送到main分支时触发
  schedule:
    - cron: '*/30 * * * *'
  workflow_dispatch:
```

---

## 🔧 高级配置

### 自定义更新频率

修改 `.github/workflows/update-data.yml` 中的cron表达式：

```yaml
schedule:
  - cron: '0 */2 * * *'   # 每2小时执行一次
  # - cron: '0 9 * * *'   # 每天早上9点执行
  # - cron: '0 9 * * 1'   # 每周一早上9点执行
```

### 添加通知功能

在工作流中添加通知步骤：

```yaml
- name: Send notification
  if: always()
  run: |
    # 发送邮件通知（示例）
    # curl -X POST "https://api.mailgun.net/v3/..." \
    #   -F from='GitHub Actions <actions@github.com>' \
    #   -F to='user@example.com' \
    #   -F subject='更新完成' \
    #   -F text='数据已成功更新！'
    
    echo "更新完成！"
```

### 添加错误处理

```yaml
- name: Update data and build
  continue-on-error: false  # 失败时停止工作流
  run: |
    # 添加错误处理逻辑
    if ! pnpm build; then
      echo "构建失败！"
      exit 1
    fi
```

---

## ❓ 常见问题

### Q1: 如何查看工作流执行日志？

**A**: 进入 Actions → 点击具体的workflow run → 展开每个step查看详细日志

### Q2: 工作流执行失败怎么办？

**A**: 
1. 查看错误日志，定位失败步骤
2. 常见原因：
   - Secret未配置或配置错误
   - 依赖安装失败
   - 构建错误
   - 权限不足
3. 修复后重新运行工作流

### Q3: 如何停止正在运行的工作流？

**A**: Actions → 点击正在运行的workflow → 点击右上角 "Cancel workflow"

### Q4: 如何临时禁用自动更新？

**A**: 
- 方式1：在workflow文件中注释掉schedule触发器
- 方式2：Settings → Actions → 禁用该workflow

### Q5: 更新后的数据没有显示怎么办？

**A**:
1. 清除浏览器缓存（Ctrl+Shift+R）
2. 检查gh-pages分支是否有最新提交
3. 等待GitHub Pages部署完成（通常几分钟）

### Q6: 如何查看部署历史？

**A**:
```
Actions → 左侧选择workflow → 查看历史运行记录
```

### Q7: Secret泄露了怎么办？

**A**:
1. 立即删除该Secret：Settings → Secrets → Remove
2. 重新生成新的密钥
3. 添加新的Secret
4. 检查工作流日志，确保没有泄露

---

## 📊 监控与调试

### 查看工作流状态徽章

在README.md中添加：

```markdown
![Update Data](https://github.com/[username]/family-points-system/actions/workflows/update-data.yml/badge.svg)
```

### 调试工作流

在workflow中添加调试步骤：

```yaml
- name: Debug
  run: |
    echo "Current directory: $(pwd)"
    echo "Files: $(ls -la)"
    echo "Node version: $(node --version)"
    echo "Environment variables:"
    env | grep -E '^(GITHUB|TENCENT)'
```

---

## 🎉 总结

GitHub Actions自动更新的优势：

✅ **自动化**：无需手动更新，定时自动执行  
✅ **可靠**：失败会自动重试，有完整的日志记录  
✅ **安全**：Secret加密存储，不会泄露  
✅ **灵活**：支持定时、手动、推送等多种触发方式  
✅ **免费**：GitHub公开仓库免费使用  
✅ **易用**：YAML配置文件，简单易懂  

现在你已经了解了GitHub Actions的完整工作原理和配置方法！🚀
