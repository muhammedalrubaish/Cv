'use client'

export default function HowItWorks() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966581008879'

  const steps = [
    {
      icon: '💬',
      title: 'تواصل أو عبّئ الموقع',
      desc: 'ابدأ بواتساب مع الوكيل الذكي، أو افتح نموذج التعبئة مباشرة في الموقع.',
      accent: '#25D366',
    },
    {
      icon: '📝',
      title: 'أدخل بياناتك',
      desc: 'أدخل معلوماتك الشخصية، خبراتك، تعليمك ومهاراتك خطوة بخطوة.',
      accent: '#7acee1',
    },
    {
      icon: '🎨',
      title: 'اختر النموذج',
      desc: 'اختر من بين 3 نماذج احترافية: الكلاسيكي، العصري، أو التنفيذي.',
      accent: '#ffde59',
    },
    {
      icon: '💰',
      title: 'الدفع بالتحويل',
      desc: 'حوّل 50 ريال وأرسل الإيصال عبر واتساب. بسيط وآمن.',
      accent: '#ffde59',
    },
    {
      icon: '📄',
      title: 'استلم سيرتك',
      desc: 'خلال 24 ساعة تصلك سيرتك بصيغة PDF و Word جاهزة للإرسال.',
      accent: '#7acee1',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 section-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#25D366]/10 text-[#25D366] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#25D366]/20">
            العملية
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            كيف يعمل؟
            <span className="gradient-text"> خمس خطوات بسيطة</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            من المحادثة الأولى إلى سيرتك الذاتية الجاهزة — عبر واتساب أو الموقع مباشرة
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                  style={{ backgroundColor: `${step.accent}15`, border: `1px solid ${step.accent}30` }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[#2a2928] text-xs font-black shadow"
                  style={{ backgroundColor: step.accent }}
                >
                  {i + 1}
                </div>
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Two Paths */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {/* WhatsApp Path */}
          <div className="bg-[#2a2928] border border-[#25D366]/30 rounded-2xl p-6 text-right">
            <div className="flex items-center gap-3 mb-4 justify-end">
              <div>
                <h3 className="text-white font-black text-lg">الطريقة الأولى</h3>
                <p className="text-[#25D366] text-sm font-semibold">عبر واتساب</p>
              </div>
              <div className="w-12 h-12 bg-[#25D366]/15 rounded-xl flex items-center justify-center text-2xl border border-[#25D366]/30">
                💬
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              تحدث مع الوكيل الذكي مباشرة. هو سيسألك عن كل شيء ويجمع بياناتك تلقائياً.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية احترافية`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all w-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              ابدأ عبر واتساب
            </a>
          </div>

          {/* Website Form Path */}
          <div className="bg-[#2a2928] border border-[#7acee1]/30 rounded-2xl p-6 text-right">
            <div className="flex items-center gap-3 mb-4 justify-end">
              <div>
                <h3 className="text-white font-black text-lg">الطريقة الثانية</h3>
                <p className="text-[#7acee1] text-sm font-semibold">تعبئة النموذج بالموقع</p>
              </div>
              <div className="w-12 h-12 bg-[#7acee1]/15 rounded-xl flex items-center justify-center text-2xl border border-[#7acee1]/30">
                🖥️
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              عبّئ بياناتك مباشرة في النموذج الإلكتروني خطوة بخطوة واختر نموذجك المفضل.
            </p>
            <a
              href="/builder"
              className="flex items-center justify-center gap-2 bg-[#7acee1] hover:bg-[#5bbdd4] text-[#2a2928] px-5 py-3 rounded-xl font-bold text-sm transition-all w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              ابدأ تعبئة النموذج
            </a>
          </div>
        </div>

        {/* WhatsApp Demo */}
        <div className="bg-[#2a2928] rounded-3xl p-8 overflow-hidden relative border border-[#4a4948]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl" />
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div className="text-right order-2 md:order-1">
              <h3 className="text-2xl font-black text-white mb-3">محادثة واتساب توضيحية</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                هكذا تبدو محادثتك مع الوكيل الذكي. سريع، سهل، ولا يحتاج خبرة تقنية.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=مرحباً`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                جرب الآن مجاناً
              </a>
            </div>

            {/* Fake WhatsApp Chat */}
            <div className="order-1 md:order-2">
              <div className="bg-[#ECE5DD] rounded-2xl overflow-hidden max-w-xs mx-auto shadow-2xl">
                <div className="bg-[#075E54] text-white p-3 flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-300 rounded-full flex items-center justify-center text-sm font-bold text-green-900">CV</div>
                  <div>
                    <div className="font-semibold text-sm">iDes — مصمم السيرة</div>
                    <div className="text-green-200 text-xs">متصل الآن ⚡</div>
                  </div>
                </div>
                <div className="p-3 space-y-2 max-h-72 overflow-y-auto">
                  <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm text-right">
                    <p className="text-gray-800 text-xs leading-relaxed">🌟 أهلاً! أنا الوكيل الذكي لتصميم السيرة الذاتية. سأساعدك في إنشاء سيرة احترافية متوافقة مع ATS بسعر 50 ريال فقط!</p>
                    <p className="text-gray-800 text-xs mt-2">للبدء، أخبرني باسمك الكامل:</p>
                    <span className="text-[10px] text-gray-400 float-left mt-1">10:30 ✓✓</span>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-2.5 max-w-[75%] mr-auto shadow-sm text-right">
                    <p className="text-gray-800 text-xs">محمد عبدالله الأحمدي</p>
                    <span className="text-[10px] text-gray-500 float-left">10:31 ✓✓</span>
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm text-right">
                    <p className="text-gray-800 text-xs">👋 أهلاً محمد! ما هو المسمى الوظيفي المطلوب؟</p>
                    <span className="text-[10px] text-gray-400 float-left mt-1">10:31 ✓✓</span>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-2.5 max-w-[75%] mr-auto shadow-sm text-right">
                    <p className="text-gray-800 text-xs">مهندس برمجيات أول</p>
                    <span className="text-[10px] text-gray-500 float-left">10:32 ✓✓</span>
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm text-right">
                    <p className="text-gray-800 text-xs">💼 ممتاز! الآن أحتاج بريدك الإلكتروني:</p>
                    <span className="text-[10px] text-gray-400 float-left mt-1">10:32 ✓</span>
                  </div>
                </div>
                <div className="bg-[#F0F0F0] p-2 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">اكتب رسالة...</div>
                  <div className="w-7 h-7 bg-[#075E54] rounded-full flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
