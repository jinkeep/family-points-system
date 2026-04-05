'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Clock, Users, Sparkles } from 'lucide-react';
import { familyData } from '@/lib/data';

export default function HomePage() {
  const [countdown, setCountdown] = useState(1800);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPersonColor = (name: string) => {
    const colors = {
      小宝: 'from-blue-400 to-blue-600',
      大宝: 'from-purple-400 to-purple-600',
      妈妈: 'from-pink-400 to-pink-600'
    };
    return colors[name as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const getPersonEmoji = (name: string) => {
    const emojis = {
      小宝: '👶',
      大宝: '🧒',
      妈妈: '👩'
    };
    return emojis[name as keyof typeof emojis] || '👤';
  };

  const getPersonAvatar = (name: string): string | undefined => {
    const avatars = {
      小宝: 'https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2F%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260405125818_61_49.jpg&nonce=29337bac-1028-421e-bdf8-fd3590855175&project_id=7625088798543708211&sign=6b40d85f158d4398317ed5efd3e3c39041c0ac9ca4c2584329d584af7d82d9d8',
      大宝: undefined,
      妈妈: undefined
    };
    return avatars[name as keyof typeof avatars];
  };

  const totalPoints = Object.values(familyData.points).reduce((a, b) => a + b, 0);
  const maxPoints = Math.max(...Object.values(familyData.points));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* 头部 */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-8 px-4 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
                <Sparkles className="w-10 h-10" />
                家庭积分管理系统
              </h1>
              <p className="mt-2 text-lg opacity-90">
                记录成长点滴，激励每一个进步
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>数据更新时间: 2026-04-05</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 积分总览 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            积分总览
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(familyData.points).map(([name, points], index) => (
              <div
                key={name}
                className="transition-transform hover:scale-105 hover:-translate-y-1"
              >
                <Link href={`/person/${name}`}>
                  <Card className="cursor-pointer overflow-hidden border-0 shadow-lg">
                    <div className={`h-2 bg-gradient-to-r ${getPersonColor(name)}`} />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {getPersonAvatar(name) ? (
                          <img 
                            src={getPersonAvatar(name)} 
                            alt={name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        ) : (
                          <span className="text-4xl">{getPersonEmoji(name)}</span>
                        )}
                        <span className="text-2xl">{name}</span>
                      </CardTitle>
                      <CardDescription>
                        点击查看详细积分记录
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-5xl font-bold text-center my-4">
                        <span className={`bg-gradient-to-r ${getPersonColor(name)} bg-clip-text text-transparent`}>
                          {points}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>总积分占比</span>
                          <span>{((points / totalPoints) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(points / maxPoints) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 积分规则 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-500" />
            积分规则
          </h2>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>家庭积分规则表</CardTitle>
              <CardDescription>
                遵守规则获取积分，违反规则扣除积分
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {familyData.rules.map((rule, index) => {
                  const isPositive = rule.points.startsWith('+');
                  return (
                    <div
                      key={index}
                      className={`transition-transform hover:scale-102 flex items-center justify-between p-4 rounded-lg border-2 ${
                        isPositive 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <span className="font-medium text-gray-700">{rule.rule}</span>
                      <Badge
                        variant={isPositive ? 'default' : 'destructive'}
                        className={`text-lg px-3 py-1 ${
                          isPositive ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {rule.points}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 页脚 */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            <span>家庭成员: {Object.keys(familyData.points).length} 人</span>
            <span className="mx-2">|</span>
            <span>总积分: {totalPoints} 分</span>
          </div>
          <p className="mt-2 text-gray-500">
            数据来源: 腾讯文档"家庭旅游基金"
          </p>
        </footer>
      </main>
    </div>
  );
}
