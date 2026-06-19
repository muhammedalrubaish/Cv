export default function Pricing() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000'

  const included = [
    '✅ سيرة ذاتية متوافقة مع ATS بنسبة 100%',
    '✅ اختيار من 3 نماذج احترافية',
    '✅ صيغة PDF + Word قابلة للتعديل',
    '✅ تسليم خلال 24 ساعة',
    '✅ تعديل مجاني واحد خلال 7 أيام',
    '✅ استشارة مهنية مجانية عبر واتساب',
    '✅ دعم ثنائي اللغة (عربي + إنجليزي)',
  ]

  const bankInfo = {
    bank: process.env.NEXT_PUBLIC_BANK_NAME || 'البنك الأهلي السعودي',
    iban: process.env.NEXT_PUBLIC_IBAN || 'SA00 0000 0000 0000 0000 0000',
    name: process.env.NEXT_PUBLIC_ACCOUNT_NAME || 'خدمات السيرة الذاتية',
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gold-400/20 text-gold-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">الأسعار</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            سعر واحد
            <span className="gradient-text"> شامل كل شيء</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            لا رسوم خفية، لا اشتراكات — سيرة ذاتية احترافية بـ 50 ريال فقط
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Price Card */}
          <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-primary-200 overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-6 left-6 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              ⭐ الأكثر طلباً
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="mb-6">
                <div className="text-gray-500 text-sm mb-2">السيرة الذاتية الاحترافية</div>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-black text-gray-900">50</span>
                  <span className="text-2xl font-bold text-gray-600 mb-2">ريال</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">دفعة واحدة — بدون اشتراك</div>
              </div>

              {/* What's included */}
              <ul className="space-y-3 mb-8">
                {included.map((item, i) => (
                  <li key={i} className="text-gray-700 text-sm flex items-start gap-2 text-right">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                اطلب الآن عبر واتساب
              </a>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-6">
            {/* Payment method */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                طريقة الدفع
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                الدفع عبر التحويل البنكي المباشر. أرسل الإيصال عبر واتساب وسيتم التحقق فوراً.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-semibold">{bankInfo.bank}</span>
                  <span className="text-gray-500">البنك</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono text-gray-700 font-semibold text-xs">{bankInfo.iban}</span>
                  <span className="text-gray-500">رقم الآيبان</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-semibold">{bankInfo.name}</span>
                  <span className="text-gray-500">اسم الحساب</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary-600 font-black text-lg">50 ريال</span>
                  <span className="text-gray-500">المبلغ</span>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-primary-600 rounded-2xl p-6 text-white text-right">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-black text-xl mb-2">ضمان الرضا التام</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                إذا لم تكن راضياً عن سيرتك الذاتية، نقوم بتعديلها مجاناً حتى تكون بالشكل الذي تريده تماماً.
              </p>
            </div>

            {/* FAQ quick */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">أسئلة شائعة</h3>
              <div className="space-y-3">
                {[
                  { q: 'متى يتم التسليم؟', a: 'خلال 24 ساعة من تأكيد الدفع' },
                  { q: 'ما صيغة الملف؟', a: 'PDF + Word قابل للتعديل' },
                  { q: 'هل يمكن التعديل؟', a: 'نعم، تعديل مجاني واحد خلال 7 أيام' },
                ].map((faq, i) => (
                  <div key={i} className="text-right">
                    <div className="font-semibold text-gray-800 text-sm">{faq.q}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{faq.a}</div>
                    {i < 2 && <div className="border-b border-gray-100 mt-2" />}
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
