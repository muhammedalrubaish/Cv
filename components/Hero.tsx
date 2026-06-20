'use client'

export default function Hero() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966581008879'

  return (
    <section className="relative min-h-screen flex items-center bg-[#2a2928] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7acee1]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ffde59]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7acee1]/3 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#7acee1 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#7acee1]/10 border border-[#7acee1]/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#7acee1] rounded-full animate-pulse" />
              <span className="text-[#7acee1] text-sm font-medium">متوافق 100% مع نظام ATS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              سيرة ذاتية
              <span className="block text-[#7acee1] mt-1">تفتح لك الأبواب</span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              نصمم لك سيرة ذاتية احترافية تتخطى فلاتر الذكاء الاصطناعي وتصل مباشرة لمسؤول التوظيف.
              الطلب عبر واتساب في دقائق.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-black text-[#ffde59]">+500</div>
                <div className="text-gray-500 text-xs mt-1">عميل سعيد</div>
              </div>
              <div className="w-px h-12 bg-[#4a4948]" />
              <div className="text-center">
                <div className="text-3xl font-black text-[#ffde59]">24h</div>
                <div className="text-gray-500 text-xs mt-1">وقت التسليم</div>
              </div>
              <div className="w-px h-12 bg-[#4a4948]" />
              <div className="text-center">
                <div className="text-3xl font-black text-[#ffde59]">100%</div>
                <div className="text-gray-500 text-xs mt-1">متوافق ATS</div>
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
                className="flex items-center justify-center gap-2 bg-[#393837] hover:bg-[#4a4948] border border-[#4a4948] hover:border-[#7acee1] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
              >
                شاهد النماذج
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-[#ffde59]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              السعر <strong className="text-[#ffde59]">50 ريال فقط</strong> — الدفع بعد التحويل البنكي
            </div>
          </div>

          {/* CV Preview Card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-[#393837] border border-[#4a4948] rounded-3xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* CV Header */}
                <div className="bg-[#2a2928] border border-[#7acee1]/30 rounded-2xl p-5 mb-4 text-left">
                  <h3 className="text-white font-bold text-xl">محمد عبدالله الأحمدي</h3>
                  <p className="text-[#7acee1] text-sm mt-1">مهندس برمجيات أول</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-gray-400 text-xs">📧 mohammed@email.com</span>
                    <span className="text-gray-400 text-xs">📍 الرياض</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-bold text-[#7acee1] uppercase tracking-wide border-b border-[#4a4948] pb-1 mb-2 text-right">الملخص المهني</div>
                    <div className="space-y-1">
                      <div className="h-2 bg-[#4a4948] rounded w-full" />
                      <div className="h-2 bg-[#4a4948] rounded w-5/6" />
                      <div className="h-2 bg-[#4a4948] rounded w-4/5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#7acee1] uppercase tracking-wide border-b border-[#4a4948] pb-1 mb-2 text-right">الخبرة العملية</div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="h-2 bg-[#4a4948] rounded w-24" />
                      <div className="text-xs font-semibold text-gray-300">شركة أرامكو السعودية</div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-[#4a4948] rounded w-full" />
                      <div className="h-2 bg-[#4a4948] rounded w-3/4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#7acee1] uppercase tracking-wide border-b border-[#4a4948] pb-1 mb-2 text-right">المهارات</div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {['Python', 'React', 'SQL', 'AWS', 'Agile'].map(skill => (
                        <span key={skill} className="bg-[#7acee1]/10 text-[#7acee1] text-xs px-2 py-1 rounded-full font-medium border border-[#7acee1]/20">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-[#25D366] text-white rounded-2xl px-4 py-2 shadow-lg font-bold text-sm transform -rotate-6">
                ✓ ATS Ready
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#ffde59] text-[#2a2928] rounded-2xl px-5 py-3 shadow-lg font-black text-lg transform rotate-3">
                50 ر.س فقط
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 54C120 48 240 36 360 30C480 24 600 24 720 30C840 36 960 48 1080 51C1200 54 1320 48 1380 45L1440 42V60H0Z" fill="#393837"/>
        </svg>
      </div>
    </section>
  )
}
