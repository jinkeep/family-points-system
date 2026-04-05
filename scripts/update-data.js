/**
 * 从腾讯文档更新家庭积分数据
 * 使用腾讯文档MCP API自动读取Excel数据
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FILE_URL = 'https://docs.qq.com/sheet/DYnRVbHV0eG5BWE1Z';
const SHEET_ID_DATA = 'BB08J2';  // 家庭旅游基金表
const SHEET_ID_RULES = 'b6v10i'; // 规则表

/**
 * 调用腾讯文档MCP API获取数据
 */
function fetchSheetData(sheetId, startRow, endRow, startCol, endCol) {
  const token = process.env.TENCENT_DOCS_TOKEN;
  if (!token) {
    throw new Error('TENCENT_DOCS_TOKEN 环境变量未设置');
  }

  const args = JSON.stringify({
    file_url: FILE_URL,
    sheet_id: sheetId,
    start_row: startRow,
    start_col: startCol,
    end_row: endRow,
    end_col: endCol,
    return_csv: true
  });

  try {
    const result = execSync(
      `export TENCENT_DOCS_TOKEN="${token}" && mcporter call tencent-sheetengine.get_cell_data --args '${args}'`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    
    const data = JSON.parse(result);
    return data.csv_data || '';
  } catch (error) {
    console.error('❌ 获取数据失败:', error.message);
    throw error;
  }
}

/**
 * 解析CSV数据为积分明细
 */
function parsePointsData(csvData) {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
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

  // 跳过标题行，从第2行开始
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

/**
 * 解析CSV数据为积分规则
 */
function parseRulesData(csvData) {
  const lines = csvData.trim().split('\n');
  const rules = [];

  // 跳过标题行
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const rule = cols[0]?.trim();
    
    if (rule && rule.includes('积') && rule.includes('分')) {
      // 提取积分值
      const match = rule.match(/积(\d+)分/);
      if (match) {
        const points = match[1];
        const ruleText = rule.replace(/积\d+分/, '').trim();
        rules.push({
          rule: ruleText,
          points: `+${points}`
        });
      }
    }
  }

  return rules;
}

/**
 * 生成数据文件内容
 */
function generateDataFile(data) {
  return `// 家庭积分数据 - 来自腾讯文档"家庭旅游基金"
// 自动更新时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

export const familyData = ${JSON.stringify(data, null, 2)};
`;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始从腾讯文档更新家庭积分数据...\n');

  try {
    // 1. 获取积分数据
    console.log('📥 正在获取积分数据...');
    const pointsCsv = fetchSheetData(SHEET_ID_DATA, 0, 100, 0, 5);
    console.log('✅ 积分数据获取成功');
    
    // 2. 获取规则数据
    console.log('📥 正在获取规则数据...');
    const rulesCsv = fetchSheetData(SHEET_ID_RULES, 0, 20, 0, 1);
    console.log('✅ 规则数据获取成功');
    
    // 3. 解析数据
    console.log('📝 正在解析数据...');
    const { details, points } = parsePointsData(pointsCsv);
    const rules = parseRulesData(rulesCsv);
    
    const data = { rules, points, details };
    
    // 4. 生成文件内容
    const fileContent = generateDataFile(data);
    
    // 5. 写入文件
    const filePath = path.join(__dirname, '../src/lib/data.ts');
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    
    console.log('\n✅ 数据更新成功！');
    console.log(`📁 文件路径: ${filePath}`);
    console.log(`\n📊 积分统计:`);
    console.log(`   - 小宝: ${points.小宝} 分`);
    console.log(`   - 大宝: ${points.大宝} 分`);
    console.log(`   - 妈妈: ${points.妈妈} 分`);
    console.log(`   - 总计: ${Object.values(points).reduce((a, b) => a + b, 0)} 分`);
    console.log(`\n📋 积分规则: ${rules.length} 条`);
    
  } catch (error) {
    console.error('\n❌ 更新失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();
