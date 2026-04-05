'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target,
  BarChart3,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { familyData } from '@/lib/data';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

interface PersonClientProps {
  name: string;
}

export function PersonClient({ name }: PersonClientProps) {
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative'>('all');

  const getPersonColor = () => {
    const colors = {
      小宝: 'from-blue-400 to-blue-600',
      大宝: 'from-purple-400 to-purple-600',
      妈妈: 'from-pink-400 to-pink-600'
    };
    return colors[name as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const getPersonEmoji = () => {
    const emojis = {
      小宝: '👶',
      大宝: '🧒',
      妈妈: '👩'
    };
    return emojis[name as keyof typeof emojis] || '👤';
  };

  const getPersonAvatar = (): string | undefined => {
    const avatars = {
      小宝: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260405125818_61_49.jpg&nonce=29337bac-1028-421e-bdf8-fd3590855175&project_id=7625088798543708211&sign=6b40d85f158d4398317ed5efd3e3c39041c0ac9ca4c2584329d584af7d82d9d8',
      大宝: undefined,
      妈妈: undefined
    };
    return avatars[name as keyof typeof avatars];
  };

  if (!familyData.details[name as keyof typeof familyData.details]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">未找到该成员数据</p>
      </div>
    );
  }

  const details = familyData.details[name as keyof typeof familyData.details];
  const totalPoints = familyData.points[name as keyof typeof familyData.points];
  
  const filteredDetails = details.filter(item => {
    if (filter === 'positive') return item.points > 0;
    if (filter === 'negative') return item.points < 0;
    return true;
  });

  // 计算统计数据
  const totalPositive = details.filter(d => d.points > 0).reduce((sum, d) => sum + d.points, 0);
  const totalNegative = details.filter(d => d.points < 0).reduce((sum, d) => sum + d.points, 0);
  const avgPoints = (totalPositive + totalNegative) / details.length;

  // 积分趋势数据 - 按时间顺序计算累积积分
  const trendData = details.map((item, index) => ({
    date: item.date,
    points: item.points,
    cumulative: details.slice(0, index + 1).reduce((sum, d) => sum + d.points, 0)
  }));

  // 积分类型分布
  const itemTypes = details.reduce((acc, item) => {
    acc[item.item] = (acc[item.item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(itemTypes).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* 头部 */}
      <header className={`bg-gradient-to-r ${getPersonColor()} text-white py-8 px-4 shadow-xl`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  返回首页
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
                  {getPersonAvatar() ? (
                    <img 
                      src={getPersonAvatar()} 
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <span className="text-5xl">{getPersonEmoji()}</span>
                  )}
                  {name}的积分明细
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 总积分展示 */}
        <section className="mb-8">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-around flex-wrap gap-6">
                <div className="text-center transition-transform hover:scale-105">
                  <Award className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">当前总积分</p>
                  <p className={`text-6xl font-bold bg-gradient-to-r ${getPersonColor()} bg-clip-text text-transparent`}>
                    {totalPoints}
                  </p>
                </div>

                <div className="text-center transition-transform hover:scale-105">
                  <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">获得积分</p>
                  <p className="text-4xl font-bold text-green-600">+{totalPositive}</p>
                </div>

                <div className="text-center transition-transform hover:scale-105">
                  <TrendingDown className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">扣除积分</p>
                  <p className="text-4xl font-bold text-red-600">{totalNegative}</p>
                </div>

                <div className="text-center transition-transform hover:scale-105">
                  <Target className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">平均积分/次</p>
                  <p className="text-4xl font-bold text-blue-600">{avgPoints.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 图表区域 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 积分趋势图 */}
          <div className="transition-transform hover:scale-102">
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  积分趋势
                </CardTitle>
                <CardDescription>最近积分变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 积分类型分布 */}
          <div className="transition-transform hover:scale-102">
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  积分类型分布
                </CardTitle>
                <CardDescription>各项活动占比</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 积分明细列表 */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    积分明细
                  </CardTitle>
                  <CardDescription>所有积分记录</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    全部
                  </Button>
                  <Button
                    variant={filter === 'positive' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('positive')}
                    className="text-green-600"
                  >
                    获得积分
                  </Button>
                  <Button
                    variant={filter === 'negative' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('negative')}
                    className="text-red-600"
                  >
                    扣除积分
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDetails.map((item, index) => (
                  <div
                    key={`${item.date}-${item.item}-${index}`}
                    className={`transition-transform hover:scale-102 flex items-center justify-between p-4 rounded-lg border-2 ${
                      item.points > 0
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500 w-24">
                        {item.date}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{item.item}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                    <Badge
                      variant={item.points > 0 ? 'default' : 'destructive'}
                      className={`text-lg px-3 py-1 ${
                        item.points > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {item.points > 0 ? '+' : ''}{item.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 家庭积分管理系统 - 用爱与规则陪伴成长
          </p>
        </div>
      </footer>
    </div>
  );
}
