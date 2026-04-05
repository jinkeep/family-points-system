#!/bin/bash
# GitHub Actions 快速配置脚本
# 运行此脚本将帮助你完成所有配置步骤

set -e

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║       GitHub Actions 配置助手 - 家庭积分管理系统           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 步骤 1: 检查 Git 配置
echo -e "${YELLOW}步骤 1/6: 检查 Git 配置${NC}"
if [ -d .git ]; then
    echo -e "${GREEN}✓ Git 已初始化${NC}"
else
    echo "初始化 Git..."
    git init
    echo -e "${GREEN}✓ Git 初始化完成${NC}"
fi
echo ""

# 步骤 2: 检查远程仓库
echo -e "${YELLOW}步骤 2/6: 检查远程仓库配置${NC}"
if git remote | grep -q "origin"; then
    echo -e "${GREEN}✓ 远程仓库已配置${NC}"
    git remote -v
else
    echo -e "${RED}✗ 未配置远程仓库${NC}"
    echo ""
    echo "请执行以下命令："
    echo "  git remote add origin https://github.com/[你的用户名]/family-points-system.git"
    echo ""
    echo "替换 [你的用户名] 为你的 GitHub 用户名"
fi
echo ""

# 步骤 3: 检查文件状态
echo -e "${YELLOW}步骤 3/6: 检查文件状态${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo "有未提交的更改："
    git status --short
    echo ""
    echo "建议执行："
    echo "  git add ."
    echo "  git commit -m 'Update: 更新代码'"
else
    echo -e "${GREEN}✓ 工作区干净${NC}"
fi
echo ""

# 步骤 4: 检查工作流文件
echo -e "${YELLOW}步骤 4/6: 检查工作流配置${NC}"
if [ -f .github/workflows/update-data.yml ]; then
    echo -e "${GREEN}✓ 工作流文件存在${NC}"
else
    echo -e "${RED}✗ 工作流文件不存在${NC}"
fi
echo ""

# 步骤 5: 检查数据更新脚本
echo -e "${YELLOW}步骤 5/6: 检查数据更新脚本${NC}"
if [ -f scripts/update-data.js ]; then
    echo -e "${GREEN}✓ 数据更新脚本存在${NC}"
else
    echo -e "${RED}✗ 数据更新脚本不存在${NC}"
fi
echo ""

# 步骤 6: 显示后续步骤
echo -e "${YELLOW}步骤 6/6: 后续手动配置步骤${NC}"
echo ""
echo "请按顺序完成以下配置："
echo ""
echo "1️⃣  推送代码到 GitHub"
echo "   git push -u origin main"
echo ""
echo "2️⃣  配置 Secrets"
echo "   访问: https://github.com/[你的用户名]/family-points-system/settings/secrets/actions"
echo "   添加: TENCENT_DOCS_TOKEN = [你的Token]"
echo ""
echo "3️⃣  启用 Actions 权限"
echo "   访问: https://github.com/[你的用户名]/family-points-system/settings/actions"
echo "   选择: Read and write permissions"
echo ""
echo "4️⃣  配置 Pages"
echo "   访问: https://github.com/[你的用户名]/family-points-system/settings/pages"
echo "   选择: gh-pages 分支"
echo ""
echo "5️⃣  运行工作流"
echo "   访问: https://github.com/[你的用户名]/family-points-system/actions"
echo "   点击: Run workflow"
echo ""
echo "6️⃣  访问网站"
echo "   网址: https://[你的用户名].github.io/family-points-system"
echo ""

echo -e "${GREEN}配置检查完成！${NC}"
echo ""
echo "详细文档请查看: docs/github-actions-setup-checklist.md"
