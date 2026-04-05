import { PersonClient } from './client';

// 预渲染所有可能的路径
export function generateStaticParams() {
  return [
    { name: '小宝' },
    { name: '大宝' },
    { name: '妈妈' }
  ];
}

export default async function PersonPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return <PersonClient name={decodeURIComponent(name)} />;
}
