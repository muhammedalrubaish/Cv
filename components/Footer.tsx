export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966581008879'
  const year = new Date().getFullYear()

  return (
    <footer className="gradient-bg text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-4 justify-end">
              <div>
                <span className="text-white font-bold text-xl">مصمم السيرة</span>
                <span className="text-gold-400 font-bold text-xl"> الذاتية</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">CV</div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              خدمة متخصصة في تصميم السير الذاتية الاحترافية المتوافقة مع أنظمة ATS. نساعدك في الوصول لوظيفة أحلامك.
            </p>
          </div>

          {/* Links */}
          <div className="text-right">
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { label: 'الرئيسية', href: '#' },
                { label: 'المميزات', href: '#features' },
                { label: 'النماذج', href: '#templates' },
                { label: 'كيف يعمل؟', href: '#how-it-works' },
                { label: 'الأسعار', href: '#pricing' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-blue-200 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm justify-end"
              >
                <span>واتساب — خدمة فورية</span>
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            <div className="mt-6 bg-white/10 rounded-2xl p-4 text-right">
              <div className="text-gold-400 font-black text-2xl">50 ريال</div>
              <div className="text-blue-200 text-xs mt-1">سيرة ذاتية احترافية + ATS</div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center bg-[#25D366] hover:bg-[#20BA5A] text-white py-2 rounded-xl text-sm font-bold transition-colors"
              >
                اطلب الآن
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-blue-200 text-sm">
            © {year} مصمم السيرة الذاتية — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  )
}
