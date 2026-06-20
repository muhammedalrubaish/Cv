export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'متوافق مع ATS',
      desc: 'نماذجنا مصممة لتجاوز فلاتر الذكاء الاصطناعي التي تستخدمها 95% من الشركات الكبرى في قراءة السير الذاتية.',
      accent: '#7acee1',
    },
    {
      icon: '⚡',
      title: 'تسليم خلال 24 ساعة',
      desc: 'فريقنا المتخصص يعمل على سيرتك الذاتية وتسليمها بصيغة PDF و Word خلال 24 ساعة من تأكيد الطلب.',
      accent: '#ffde59',
    },
    {
      icon: '💬',
      title: 'واتساب أو موقع',
      desc: 'اختر طريقتك: تعبّئ بياناتك عبر واتساب مع الوكيل الذكي، أو مباشرة من الموقع بنموذج سهل.',
      accent: '#25D366',
    },
    {
      icon: '🎨',
      title: '3 نماذج احترافية',
      desc: 'اختر من بين النموذج الكلاسيكي أو العصري أو التنفيذي — كلها مصممة بمعايير دولية.',
      accent: '#7acee1',
    },
    {
      icon: '🔒',
      title: 'بياناتك آمنة',
      desc: 'بياناتك محمية ولن تُشارك مع أي طرف ثالث. نلتزم بسياسة خصوصية صارمة.',
      accent: '#ffde59',
    },
    {
      icon: '✏️',
      title: 'تعديلات مجانية',
      desc: 'تعديل مجاني واحد خلال 7 أيام من الاستلام. رضاك التام هو هدفنا.',
      accent: '#7acee1',
    },
  ]

  return (
    <section id="features" className="py-20 section-dark section-animate">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[#7acee1]/10 text-[#7acee1] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#7acee1]/20">لماذا نحن؟</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            سيرة ذاتية تميزك عن
            <span className="gradient-text"> المنافسين</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            نحن لا نصمم فقط — نضع سيرتك في المسار الصحيح للوصول لصاحب القرار
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="animate-on-scroll card-dark rounded-2xl p-6 card-hover" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md"
                style={{ backgroundColor: `${feature.accent}15`, border: `1px solid ${feature.accent}30` }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* ATS Explanation */}
        <div className="mt-14 bg-[#2a2928] rounded-3xl p-8 border border-[#7acee1]/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-right">
              <h3 className="text-2xl font-black text-white mb-3">ما هو نظام ATS؟</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                نظام ATS (Applicant Tracking System) هو برنامج يستخدمه 95% من أصحاب العمل الكبار لفرز وتحليل السير الذاتية تلقائياً قبل أن يراها أي إنسان.
              </p>
              <p className="text-gray-400 leading-relaxed">
                <strong className="text-[#ffde59]">75% من السير الذاتية</strong> يتم رفضها من قِبل ATS قبل وصولها لمسؤول التوظيف! نصمم سيرتك بالأسلوب الصحيح لتجاوز هذا الفلتر.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 bg-[#393837] border border-[#4a4948] rounded-3xl shadow-lg flex flex-col items-center justify-center p-4">
                <div className="text-5xl mb-2">📋</div>
                <div className="text-center">
                  <div className="text-red-400 font-bold text-sm">75% مرفوضة</div>
                  <div className="text-xs text-gray-500 mt-1">بدون قراءة بشرية</div>
                </div>
                <div className="w-full h-px bg-[#4a4948] my-3" />
                <div className="text-center">
                  <div className="text-[#7acee1] font-bold text-sm">✓ نضمن وصولك</div>
                  <div className="text-xs text-gray-500 mt-1">لمسؤول التوظيف</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
