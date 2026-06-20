export default function Pricing() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966581008879'

  const included = [
    'سيرة ذاتية متوافقة مع ATS بنسبة 100%',
    'اختيار من 3 نماذج احترافية',
    'صيغة PDF + Word قابلة للتعديل',
    'تسليم خلال 24 ساعة',
    'تعديل مجاني واحد خلال 7 أيام',
    'استشارة مهنية مجانية عبر واتساب',
    'دعم ثنائي اللغة (عربي + إنجليزي)',
  ]

  const bankInfo = {
    bank: process.env.NEXT_PUBLIC_BANK_NAME || 'البنك الأهلي السعودي',
    iban: process.env.NEXT_PUBLIC_IBAN || 'SA00 0000 0000 0000 0000 0000',
    name: process.env.NEXT_PUBLIC_ACCOUNT_NAME || 'خدمات السيرة الذاتية',
  }

  return (
    <section id="pricing" className="py-20 section-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ffde59]/10 text-[#ffde59] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#ffde59]/20">الأسعار</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            سعر واحد
            <span className="gradient-text"> شامل كل شيء</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            لا رسوم خفية، لا اشتراكات — سيرة ذاتية احترافية بـ 50 ريال فقط
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Price Card */}
          <div className="relative bg-[#2a2928] rounded-3xl p-8 border border-[#7acee1]/30 overflow-hidden">
            <div className="absolute top-6 left-6 bg-[#ffde59] text-[#2a2928] text-xs font-bold px-3 py-1 rounded-full">
              ⭐ الأكثر طلباً
            </div>

            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7acee1]/5 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-2">السيرة الذاتية الاحترافية</div>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black text-[#ffde59]">50</span>
                  <span className="text-2xl font-bold text-gray-400 mb-2">ريال</span>
                </div>
                <div className="text-gray-500 text-sm mt-1">دفعة واحدة — بدون اشتراك</div>
              </div>

              <ul className="space-y-3 mb-8">
                {included.map((item, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2 text-right">
                    <svg className="w-4 h-4 text-[#7acee1] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Two CTA Options */}
              <div className="flex flex-col gap-3">
                <a
                  href="/builder"
                  className="flex items-center justify-center gap-2 w-full bg-[#7acee1] hover:bg-[#5bbdd4] text-[#2a2928] py-3.5 rounded-2xl font-bold transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  تعبئة من الموقع
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3.5 rounded-2xl font-bold transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  طلب عبر واتساب
                </a>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-6">
            {/* Payment method */}
            <div className="bg-[#2a2928] rounded-2xl p-6 border border-[#4a4948]">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2 justify-end">
                <span>طريقة الدفع</span>
                <span className="text-2xl">🏦</span>
              </h3>
              <p className="text-gray-400 text-sm mb-4 text-right">
                الدفع عبر التحويل البنكي المباشر. أرسل الإيصال عبر واتساب وسيتم التحقق فوراً.
              </p>
              <div className="bg-[#393837] rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-semibold">{bankInfo.bank}</span>
                  <span className="text-gray-500">البنك</span>
                </div>
                <div className="border-t border-[#4a4948]" />
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono text-gray-300 text-xs">{bankInfo.iban}</span>
                  <span className="text-gray-500">رقم الآيبان</span>
                </div>
                <div className="border-t border-[#4a4948]" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-semibold">{bankInfo.name}</span>
                  <span className="text-gray-500">اسم الحساب</span>
                </div>
                <div className="border-t border-[#4a4948]" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#ffde59] font-black text-xl">50 ريال</span>
                  <span className="text-gray-500">المبلغ</span>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-[#7acee1]/10 border border-[#7acee1]/30 rounded-2xl p-6 text-right">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-black text-xl text-white mb-2">ضمان الرضا التام</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                إذا لم تكن راضياً عن سيرتك الذاتية، نقوم بتعديلها مجاناً حتى تكون بالشكل الذي تريده تماماً.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-[#2a2928] rounded-2xl p-6 border border-[#4a4948]">
              <h3 className="font-bold text-white mb-4 text-right">أسئلة شائعة</h3>
              <div className="space-y-3">
                {[
                  { q: 'متى يتم التسليم؟', a: 'خلال 24 ساعة من تأكيد الدفع' },
                  { q: 'ما صيغة الملف؟', a: 'PDF + Word قابل للتعديل' },
                  { q: 'هل يمكن التعديل؟', a: 'نعم، تعديل مجاني واحد خلال 7 أيام' },
                ].map((faq, i) => (
                  <div key={i} className="text-right">
                    <div className="font-semibold text-gray-200 text-sm">{faq.q}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{faq.a}</div>
                    {i < 2 && <div className="border-b border-[#4a4948] mt-2" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
