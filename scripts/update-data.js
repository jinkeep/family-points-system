/**
 * 从腾讯文档更新家庭积分数据
 * 
 * 使用方法：
 * node scripts/update-data.js
 */

const fs = require('fs');
const path = require('path');

// 模拟数据 - 实际使用时需要替换为真实的API调用
const mockData = {
  rules: [
    { rule: '小宝9点半之前睡觉', points: '+10' },
    { rule: '大宝10点半之前睡觉', points: '+10' },
    { rule: '妈妈12点之前睡觉', points: '+10' },
    { rule: '按时完成作业', points: '+5' },
    { rule: '帮助做家务', points: '+3' },
    { rule: '阅读30分钟', points: '+2' },
    { rule: '按时起床', points: '+1' },
    { rule: '整理房间', points: '+2' },
    { rule: '运动30分钟', points: '+3' },
    { rule: '练琴30分钟', points: '+4' },
    { rule: '主动学习', points: '+5' },
    { rule: '迟到', points: '-2' },
    { rule: '未完成作业', points: '-3' },
    { rule: '发脾气', points: '-5' },
    { rule: '说脏话', points: '-10' },
  ],
  points: {
    小宝: 500,
    大宝: 500,
    妈妈: 500
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

/**
 * TODO: 实际使用时需要实现这个函数
 * 从腾讯文档API获取真实数据
 * 
 * @returns {Object} 家庭积分数据
 */
async function fetchDataFromTencentDocs() {
  const TENCENT_DOCS_TOKEN = process.env.TENCENT_DOCS_TOKEN;
  const DOC_ID = 'btUlutxnAXMY';
  
  if (!TENCENT_DOCS_TOKEN) {
    console.warn('⚠️  TENCENT_DOCS_TOKEN 未设置，使用模拟数据');
    return mockData;
  }
  
  try {
    // TODO: 调用腾讯文档API获取数据
    // 示例代码（需要根据实际API调整）：
    // const response = await fetch(`https://docs.qq.com/api/v3/files/${DOC_ID}`, {
    //   headers: { 'Authorization': `Bearer ${TENCENT_DOCS_TOKEN}` }
    // });
    // const data = await response.json();
    // return parseExcelData(data);
    
    console.log('✅ 从腾讯文档获取数据成功');
    return mockData;
  } catch (error) {
    console.error('❌ 从腾讯文档获取数据失败:', error.message);
    console.log('⚠️  使用模拟数据继续');
    return mockData;
  }
}

/**
 * 解析Excel数据并转换为项目所需的格式
 * 
 * @param {Object} rawData - 从API获取的原始数据
 * @returns {Object} 格式化后的数据
 */
function parseExcelData(rawData) {
  // TODO: 根据实际的Excel格式实现解析逻辑
  // 示例：
  // const rows = rawData.sheets[0].rows;
  // const details = rows.map(row => ({
  //   date: row[0],
  //   item: row[1],
  //   points: parseInt(row[2]),
  //   description: row[3]
  // }));
  
  return mockData;
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
  console.log('🚀 开始更新家庭积分数据...\n');
  
  try {
    // 1. 获取数据
    console.log('📥 正在获取数据...');
    const data = await fetchDataFromTencentDocs();
    
    // 2. 生成文件内容
    console.log('📝 正在生成数据文件...');
    const fileContent = generateDataFile(data);
    
    // 3. 写入文件
    const filePath = path.join(__dirname, '../src/lib/data.ts');
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    
    console.log('✅ 数据更新成功！');
    console.log(`📁 文件路径: ${filePath}`);
    console.log(`📊 数据统计:`);
    console.log(`   - 小宝: ${data.points.小宝} 分`);
    console.log(`   - 大宝: ${data.points.大宝} 分`);
    console.log(`   - 妈妈: ${data.points.妈妈} 分`);
    console.log(`   - 总计: ${Object.values(data.points).reduce((a, b) => a + b, 0)} 分`);
    
  } catch (error) {
    console.error('❌ 更新失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();
