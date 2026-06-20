function IDesLogoSmall() {
  return (
    <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="idesFlameFooter" x1="24" y1="6" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7acee1" />
          <stop offset="0.55" stopColor="#5bbdd4" />
          <stop offset="1" stopColor="#ffde59" />
        </linearGradient>
      </defs>
      <rect x="20" y="22" width="8" height="20" rx="4" fill="#ffffff" />
      <rect x="16" y="24" width="2.5" height="16" rx="1.25" fill="#ffde59" />
      <path
        d="M24 4C29 9.5 32 13 31.4 18.2C30.9 22.7 28 25.5 24 25.5C20 25.5 17.1 22.7 16.6 18.2C16 13 19 9.5 24 4Z"
        fill="url(#idesFlameFooter)"
      />
      <path
        d="M24 11C26.3 13.5 27.6 15.6 27.2 18.2C26.8 20.8 25.6 22.4 24 22.4C22.4 22.4 21.2 20.8 20.8 18.2C20.4 15.6 21.7 13.5 24 11Z"
        fill="#ffffff"
        opacity="0.55"
      />
    </svg>
  )
}

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966581008879'
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#2a2928] border-t border-[#4a4948] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="text-right">
            <div className="flex items-center gap-2.5 mb-4 justify-end">
              <div className="leading-tight">
                <div className="text-white font-black text-lg tracking-tight">
                  i<span className="text-[#7acee1]">Des</span>
                </div>
                <div className="text-[#ffde59] text-[9px] font-semibold uppercase tracking-widest -mt-0.5">
                  Designers
                </div>
              </div>
              <IDesLogoSmall />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
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
                { label: 'تعبئة النموذج', href: '/builder' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-[#7acee1] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <div className="space-y-3 mb-6">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm justify-end"
              >
                <span>واتساب — خدمة فورية</span>
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            <div className="bg-[#393837] border border-[#4a4948] rounded-2xl p-4 text-right">
              <div className="text-[#ffde59] font-black text-2xl">50 ريال</div>
              <div className="text-gray-500 text-xs mt-1">سيرة ذاتية احترافية + ATS</div>
              <div className="flex flex-col gap-2 mt-3">
                <a
                  href="/builder"
                  className="block text-center bg-[#7acee1] hover:bg-[#5bbdd4] text-[#2a2928] py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  تعبئة من الموقع
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#25D366] hover:bg-[#20BA5A] text-white py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  طلب عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4a4948] pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {year} iDes Designers — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  )
}
