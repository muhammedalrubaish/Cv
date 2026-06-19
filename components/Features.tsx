export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'متوافق مع ATS',
      desc: 'نماذجنا مصممة لتجاوز فلاتر الذكاء الاصطناعي التي تستخدمها 95% من الشركات الكبرى في قراءة السير الذاتية.',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: '⚡',
      title: 'تسليم خلال 24 ساعة',
      desc: 'فريقنا المتخصص يعمل على سيرتك الذاتية وتسليمها بصيغة PDF و Word خلال 24 ساعة من تأكيد الطلب.',
      color: 'from-orange-400 to-orange-600',
    },
    {
      icon: '💬',
      title: 'واتساب ذكي',
      desc: 'وكيل ذكي يجمع بياناتك عبر واتساب بطريقة سهلة وسلسة. لا تحتاج لملء نماذج معقدة.',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: '🎨',
      title: '3 نماذج احترافية',
      desc: 'اختر من بين النموذج الكلاسيكي أو العصري أو التنفيذي — كلها مصممة بمعايير دولية.',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: '🔒',
      title: 'بياناتك آمنة',
      desc: 'بياناتك محمية ولن تُشارك مع أي طرف ثالث. نلتزم بسياسة خصوصية صارمة.',
      color: 'from-red-500 to-red-700',
    },
    {
      icon: '✏️',
      title: 'تعديلات مجانية',
      desc: 'تعديل مجاني واحد خلال 7 أيام من الاستلام. رضاك التام هو هدفنا.',
      color: 'from-teal-500 to-teal-700',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">لماذا نحن؟</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            سيرة ذاتية تميزك عن
            <span className="gradient-text"> المنافسين</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            نحن لا نصمم فقط — نضع سيرتك في المسار الصحيح للوصول لصاحب القرار
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 bg-gray-50 hover:bg-white transition-all duration-300 card-hover"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* ATS Explanation */}
        <div className="mt-14 bg-primary-50 rounded-3xl p-8 border border-primary-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-right">
              <h3 className="text-2xl font-black text-primary-900 mb-3">ما هو نظام ATS؟</h3>
              <p className="text-primary-700 leading-relaxed mb-4">
                نظام ATS (Applicant Tracking System) هو برنامج يستخدمه 95% من أصحاب العمل الكبار لفرز وتحليل السير الذاتية تلقائياً قبل أن يراها أي إنسان.
              </p>
              <p className="text-primary-700 leading-relaxed">
                <strong>75% من السير الذاتية</strong> يتم رفضها من قِبل ATS قبل وصولها لمسؤول التوظيف! نصمم سيرتك بالأسلوب الصحيح لتجاوز هذا الفلتر.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 relative">
                {/* ATS infographic */}
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center p-4">
                  <div className="text-5xl mb-2">📋</div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-sm">75% مرفوضة</div>
                    <div className="text-xs text-gray-400 mt-1">بدون قراءة بشرية</div>
                  </div>
                  <div className="w-full h-px bg-gray-200 my-3" />
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-sm">✓ نضمن وصولك</div>
                    <div className="text-xs text-gray-400 mt-1">لمسؤول التوظيف</div>
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
