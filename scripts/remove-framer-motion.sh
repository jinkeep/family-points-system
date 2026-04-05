#!/bin/bash
# 修复 Framer Motion 静态导出问题
# 移除所有 motion 组件，改用普通 HTML 元素

echo "🔧 修复 Framer Motion 静态导出问题..."

# 备份原文件
cp src/app/page.tsx src/app/page.tsx.backup
cp src/app/person/[name]/client.tsx src/app/person/[name]/client.tsx.backup

# 修复首页：移除 motion 组件
sed -i 's/<motion\.\([^>]*\)/<\1/g' src/app/page.tsx
sed -i 's/<\/motion\.\([^>]*\)/<\/\1/g' src/app/page.tsx

# 修复详情页
sed -i 's/<motion\.\([^>]*\)/<\1/g' src/app/person/[name]/client.tsx
sed -i 's/<\/motion\.\([^>]*\)/<\/\1/g' src/app/person/[name]/client.tsx

# 移除动画属性
sed -i '/initial={{/d' src/app/page.tsx
sed -i '/animate={{/d' src/app/page.tsx
sed -i '/transition={{/d' src/app/page.tsx
sed -i '/whileHover={{/d' src/app/page.tsx

sed -i '/initial={{/d' src/app/person/[name]/client.tsx
sed -i '/animate={{/d' src/app/person/[name]/client.tsx
sed -i '/transition={{/d' src/app/person/[name]/client.tsx
sed -i '/whileHover={{/d' src/app/person/[name]/client.tsx

echo "✅ 修复完成！"
echo "📝 备份文件："
echo "  - src/app/page.tsx.backup"
echo "  - src/app/person/[name]/client.tsx.backup"
