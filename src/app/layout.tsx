import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '家庭积分管理系统',
    template: '%s | 家庭积分管理系统',
  },
  description:
    '家庭积分管理系统 - 记录成长点滴，激励每一个进步',
  keywords: [
    '家庭积分',
    '积分管理',
    '成长记录',
    '家庭教育',
    '孩子激励',
  ],
  authors: [{ name: 'Family Points System' }],
  generator: 'Next.js',
  openGraph: {
    title: '家庭积分管理系统',
    description:
      '记录成长点滴，激励每一个进步',
    url: 'https://family-points-system.com',
    siteName: '家庭积分管理系统',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
