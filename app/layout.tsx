import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'مصمم السيرة الذاتية | نماذج ATS احترافية - ٥٠ ريال',
  description: 'احصل على سيرة ذاتية احترافية متوافقة مع أنظمة ATS. نماذج مصممة بعناية تضمن وصول سيرتك للمسؤول. الطلب عبر واتساب - ٥٠ ريال فقط.',
  keywords: 'سيرة ذاتية, CV, ATS, وظيفة, مصمم سيرة ذاتية, السعودية',
  openGraph: {
    title: 'مصمم السيرة الذاتية | نماذج ATS احترافية',
    description: 'سيرة ذاتية احترافية متوافقة مع ATS - ٥٠ ريال',
    locale: 'ar_SA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-arabic antialiased">{children}</body>
    </html>
  )
}
