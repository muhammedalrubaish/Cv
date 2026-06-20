export default function Testimonials() {
  const reviews = [
    {
      name: 'خالد العتيبي',
      role: 'مهندس برمجيات — جدة',
      text: 'حصلت على مقابلة عمل في أرامكو بعد يومين من إرسال السيرة الذاتية! النموذج رائع ومتوافق تماماً مع متطلباتهم.',
      initials: 'خع',
    },
    {
      name: 'سارة المالكي',
      role: 'محاسبة — الرياض',
      text: 'الخدمة سريعة جداً وسهلة. أرسلت بياناتي عبر واتساب وبعد 20 ساعة كانت سيرتي جاهزة. السعر ممتاز مقارنة بالمنافسين.',
      initials: 'سم',
    },
    {
      name: 'عمر البقمي',
      role: 'مدير مبيعات — الدمام',
      text: 'جربت خدمات كثيرة وهذه الأفضل. النموذج التنفيذي أضاف احترافية حقيقية لسيرتي. أنصح به بشدة.',
      initials: 'عب',
    },
    {
      name: 'نورة الشمري',
      role: 'موارد بشرية — الرياض',
      text: 'كمختصة في الموارد البشرية، أعرف أهمية ATS. هذه الخدمة تتقن هذا الجانب بشكل ممتاز. شكراً!',
      initials: 'نش',
    },
    {
      name: 'فهد الحربي',
      role: 'خريج جديد — مكة',
      text: 'كنت قلقاً لأنني خريج جديد بدون خبرة، لكن السيرة الذاتية التي صمموها لي أبرزت مهاراتي بشكل رائع.',
      initials: 'فح',
    },
    {
      name: 'ريم القحطاني',
      role: 'مديرة تسويق — جدة',
      text: 'خدمة احترافية بكل المقاييس. الوكيل الذكي سهّل جمع البيانات وكانت النتيجة أفضل مما توقعت.',
      initials: 'رق',
    },
  ]

  return (
    <section className="py-20 section-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ffde59]/10 text-[#ffde59] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#ffde59]/20">
            آراء العملاء
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            ماذا يقول
            <span className="gradient-text"> عملاؤنا؟</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 text-[#ffde59]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-white">5.0</span>
            <span className="text-gray-500">من 800+ تقييم</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="card-dark rounded-2xl p-6 card-hover">
              {/* Stars */}
              <div className="flex mb-4">
                {[1,2,3,4,5].map(j => (
                  <svg key={j} className="w-4 h-4 text-[#ffde59]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-5 text-right">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7acee1]/15 border border-[#7acee1]/30 rounded-full flex items-center justify-center text-[#7acee1] font-bold text-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white text-sm">{review.name}</div>
                  <div className="text-gray-500 text-xs">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
