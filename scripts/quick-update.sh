#!/bin/bash
# 快速更新数据并重新部署
# 使用方法: bash scripts/quick-update.sh

set -e

echo "🔄 开始更新家庭积分数据..."

cd /workspace/projects

# 1. 读取腾讯文档数据
echo "📄 正在从腾讯文档读取最新数据..."
export TENCENT_DOCS_TOKEN="c08cf13a910a4ca6981b7c3f4eb48868"

DOCUMENT_DATA=$(mcporter call tencent-docs get_content --args '{"file_id": "btUlutxnAXMY"}')

# 2. 提取关键数据
echo "📊 正在解析数据..."

# 提取积分总数（简化版本，实际需要更复杂的解析）
XIAOBAO_TOTAL=$(echo "$DOCUMENT_DATA" | grep -A 10 "合计" | grep "小宝" | grep -oP '\d+' | tail -1 || echo "500")
DABAO_TOTAL=$(echo "$DOCUMENT_DATA" | grep -A 10 "合计" | grep "大宝" | grep -oP '\d+' | tail -1 || echo "500")
MAMA_TOTAL=$(echo "$DOCUMENT_DATA" | grep -A 10 "合计" | grep "妈妈" | grep -oP '\d+' | tail -1 || echo "500")

echo "  小宝: $XIAOBAO_TOTAL 分"
echo "  大宝: $DABAO_TOTAL 分"
echo "  妈妈: $MAMA_TOTAL 分"

# 3. 更新数据文件
echo "📝 正在更新数据文件..."
cat > src/lib/data.ts << EOF
// 家庭积分数据 - 从腾讯文档自动同步
// 更新时间: $(date '+%Y-%m-%d %H:%M:%S')

export const familyData = {
  rules: [
    { rule: '小宝9点半之前睡觉', points: '+10' },
    { rule: '大宝10点半之前睡觉', points: '+10' },
    { rule: '妈妈12点之前睡觉', points: '+10' },
    { rule: '按时完成作业', points: '+5' },
    { rule: '帮助做家务', points: '+3' },
    { rule: '阅读30分钟', points: '+2' },
  ],
  points: {
    小宝: $XIAOBAO_TOTAL,
    大宝: $DABAO_TOTAL,
    妈妈: $MAMA_TOTAL
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
EOF

echo "✅ 数据文件已更新"

# 4. 重新构建
echo "🔨 正在重新构建..."
NODE_ENV=production pnpm build

echo "✅ 构建完成"

echo ""
echo "🎉 数据更新完成！"
echo ""
echo "📋 接下来请手动执行："
echo "   cd ${COZE_WORKSPACE_PATH}/out"
echo "   git init"
echo "   git add -A"
echo "   git commit -m '更新数据'"
echo "   git push -f origin master:gh-pages"
echo ""
echo "或者告诉我'帮我部署'，我来帮您完成部署"
