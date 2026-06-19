'use client'

export default function Hero() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'

  return (
    <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">متوافق 100% مع نظام ATS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              سيرة ذاتية
              <span className="block text-gold-400 mt-1">تفتح لك الأبواب</span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              نصمم لك سيرة ذاتية احترافية تتخطى فلاتر الذكاء الاصطناعي وتصل مباشرة لمسؤول التوظيف.
              الطلب عبر واتساب في دقائق.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-black text-gold-400">+500</div>
                <div className="text-white/70 text-xs mt-1">عميل سعيد</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-black text-gold-400">24h</div>
                <div className="text-white/70 text-xs mt-1">وقت التسليم</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-black text-gold-400">100%</div>
                <div className="text-white/70 text-xs mt-1">متوافق ATS</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية احترافية`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                اطلب الآن عبر واتساب
              </a>
              <a
                href="#templates"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
              >
                شاهد النماذج
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Price badge */}
            <div className="mt-6 inline-flex items-center gap-2 text-white/70 text-sm">
              <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              السعر <strong className="text-gold-400">50 ريال فقط</strong> — الدفع بعد التحويل البنكي
            </div>
          </div>

          {/* CV Preview Card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* CV Header */}
                <div className="bg-primary-700 rounded-2xl p-5 mb-4 text-left">
                  <h3 className="text-white font-bold text-xl">محمد عبدالله الأحمدي</h3>
                  <p className="text-blue-200 text-sm mt-1">مهندس برمجيات أول</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-blue-200 text-xs">📧 mohammed@email.com</span>
                    <span className="text-blue-200 text-xs">📍 الرياض</span>
                  </div>
                </div>

                {/* CV Body skeleton */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-bold text-primary-700 uppercase tracking-wide border-b border-primary-100 pb-1 mb-2 text-right">الملخص المهني</div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-5/6" />
                      <div className="h-2 bg-gray-200 rounded w-4/5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-primary-700 uppercase tracking-wide border-b border-primary-100 pb-1 mb-2 text-right">الخبرة العملية</div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="h-2 bg-gray-300 rounded w-24" />
                      <div className="text-xs font-semibold text-gray-700">شركة أرامكو السعودية</div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-full" />
                      <div className="h-2 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-primary-700 uppercase tracking-wide border-b border-primary-100 pb-1 mb-2 text-right">المهارات</div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {['Python', 'React', 'SQL', 'AWS', 'Agile'].map(skill => (
                        <span key={skill} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ATS Badge */}
              <div className="absolute -top-4 -left-4 bg-green-500 text-white rounded-2xl px-4 py-2 shadow-lg font-bold text-sm transform -rotate-6">
                ✓ ATS Ready
              </div>

              {/* Price badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold-500 text-white rounded-2xl px-5 py-3 shadow-lg font-black text-lg transform rotate-3">
                50 ر.س فقط
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 40C840 48 960 64 1080 68C1200 72 1320 64 1380 60L1440 56V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  )
}
