#!/bin/bash
# 自动更新家庭积分数据并部署到 GitHub Pages

set -e

echo "🔄 开始更新家庭积分数据..."

# 设置环境变量
export TENCENT_DOCS_TOKEN="c08cf13a910a4ca6981b7c3f4eb48868"

# 进入项目目录
cd /workspace/projects

# 读取腾讯文档数据
echo "📄 正在从腾讯文档读取数据..."
DOCUMENT_DATA=$(mcporter call tencent-docs get_content --args '{"file_id": "btUlutxnAXMY"}')

# 提取数据并生成新的 data.ts 文件
echo "📝 正在生成数据文件..."
cat > src/lib/data.ts << 'DATAEOF'
// 家庭积分数据 - 自动从腾讯文档同步
// 最后更新时间: $(date '+%Y-%m-%d %H:%M:%S')

export const familyData = {
DATAEOF

# 解析并写入数据（这里需要根据实际文档格式解析）
echo "$DOCUMENT_DATA" | node -e "
const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8');
const json = JSON.parse(data);

// 解析表格数据
const lines = json.content.split('\n').filter(l => l.trim());

// 提取积分数据
const points = { 小宝: 0, 大宝: 0, 妈妈: 0 };
const details = { 小宝: [], 大宝: [], 妈妈: [] };

let inFundTable = false;
let inRulesTable = false;
let inSummaryTable = false;

lines.forEach(line => {
  if (line.includes('家庭旅游基金')) {
    inFundTable = true;
    inRulesTable = false;
    inSummaryTable = false;
    return;
  }
  
  if (line.includes('规则')) {
    inFundTable = false;
    inRulesTable = true;
    inSummaryTable = false;
    return;
  }
  
  if (line.includes('合计')) {
    inFundTable = false;
    inRulesTable = false;
    inSummaryTable = true;
    return;
  }
  
  // 解析家庭旅游基金表
  if (inFundTable && line.includes('|')) {
    const cells = line.split('|').filter(c => c.trim());
    if (cells.length >= 4 && cells[0].match(/\d/)) {
      const date = cells[0].trim();
      ['小宝', '大宝', '妈妈'].forEach((name, i) => {
        const score = parseInt(cells[i+1]) || 0;
        if (score > 0) {
          details[name].push({
            date: date.replace(/\./g, '-'),
            item: '家庭旅游基金',
            points: score,
            description: date + '积分'
          });
        }
      });
    }
  }
  
  // 解析合计
  if (inSummaryTable && line.includes('|')) {
    const cells = line.split('|').filter(c => c.trim());
    if (cells.length >= 2) {
      const name = cells[1].trim();
      const score = parseInt(cells[2]) || 0;
      if (name in points) {
        points[name] = score;
      }
    }
  }
});

// 写入文件
const output = \`
  rules: [
    { rule: '小宝9点半之前睡觉', points: '+10' },
    { rule: '大宝10点半之前睡觉', points: '+10' },
    { rule: '妈妈12点之前睡觉', points: '+10' },
    { rule: '按时完成作业', points: '+5' },
    { rule: '帮助做家务', points: '+3' },
    { rule: '阅读30分钟', points: '+2' },
  ],
  points: \${JSON.stringify(points, null, 2)},
  details: \${JSON.stringify(details, null, 2)}
};
\`;

fs.appendFileSync('src/lib/data.ts', output);
console.log('✅ 数据文件已更新');
"

# 构建项目
echo "🔨 正在构建项目..."
pnpm build

# 部署到 GitHub Pages
echo "🚀 正在部署到 GitHub Pages..."
cd out
git init
git config user.email "family@example.com"
git config user.name "Family Points System"
git add -A
git commit -m "自动更新: $(date '+%Y-%m-%d %H:%M')"

# 使用环境变量 GITHUB_TOKEN（GitHub Actions 自动提供）
if [ -n "$GITHUB_TOKEN" ]; then
  git remote add origin https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git 2>/dev/null || true
else
  # 本地开发时，使用 git remote 的默认配置
  git remote add origin https://github.com/jinkeep/family-points-system.git 2>/dev/null || true
fi

git push -f origin master:gh-pages

echo "✅ 部署完成！"
echo "🌐 访问地址: https://jinkeep.github.io/family-points-system/"
