/**
 * 从本地Excel文件更新家庭积分数据
 * 降级方案：当无法访问腾讯文档API时使用
 */

const fs = require('fs');
const path = require('path');

// 简单的CSV解析（假设Excel已导出为CSV）
const CSV_FILE = path.join(__dirname, '../assets/积分数据.csv');

function parseCSVData(csvContent) {
  const lines = csvContent.trim().split('\n');
  
  const details = {
    小宝: [],
    大宝: [],
    妈妈: []
  };
  
  const points = {
    小宝: 0,
    大宝: 0,
    妈妈: 0
  };

  // 跳过标题行
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols[0] && cols[0].trim()) {
      const date = cols[0].trim();
      
      ['小宝', '大宝', '妈妈'].forEach((name, idx) => {
        const point = parseInt(cols[idx + 1]) || 0;
        if (point !== 0) {
          details[name].push({
            date: date.replace(/\./g, '-'),
            item: '家庭旅游基金',
            points: point,
            description: `${date}积分`
          });
          points[name] += point;
        }
      });
    }
  }

  return { details, points };
}

function generateDataFile(details, points) {
  const template = `/**
 * 家庭积分数据
 * 更新时间: ${new Date().toLocaleDateString('zh-CN')}
 * 数据来源: 本地CSV文件
 */

export const familyMembers = ['小宝', '大宝', '妈妈'];

export const pointsData = ${JSON.stringify(points, null, 2)};

export const memberDetails = ${JSON.stringify(details, null, 2)};

export const rules = [
  { id: 1, rule: '小宝完成作业', points: 10, category: '学习' },
  { id: 2, rule: '小宝帮忙做家务', points: 20, category: '生活' },
  { id: 3, rule: '小宝按时睡觉', points: 5, category: '生活' },
  { id: 4, rule: '小宝主动阅读', points: 15, category: '学习' },
  { id: 5, rule: '大宝完成作业', points: 10, category: '学习' },
  { id: 6, rule: '大宝帮忙做家务', points: 20, category: '生活' },
  { id: 7, rule: '大宝按时睡觉', points: 5, category: '生活' },
  { id: 8, rule: '大宝主动阅读', points: 15, category: '学习' },
  { id: 9, rule: '妈妈12点之前睡觉', points: 100, category: '健康' },
];
`;

  return template;
}

// 主函数
function main() {
  try {
    console.log('📂 使用本地CSV文件更新数据...');
    
    if (!fs.existsSync(CSV_FILE)) {
      console.log('⚠️  CSV文件不存在，请先从腾讯文档导出数据');
      console.log(`   导出路径: ${CSV_FILE}`);
      process.exit(1);
    }

    const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
    const { details, points } = parseCSVData(csvContent);
    
    const dataContent = generateDataFile(details, points);
    
    const outputPath = path.join(__dirname, '../src/lib/data.ts');
    fs.writeFileSync(outputPath, dataContent, 'utf-8');
    
    console.log('✅ 数据更新成功！');
    console.log(`   小宝: ${points.小宝}分`);
    console.log(`   大宝: ${points.大宝}分`);
    console.log(`   妈妈: ${points.妈妈}分`);
    
  } catch (error) {
    console.error('❌ 更新失败:', error.message);
    process.exit(1);
  }
}

main();
