'use client'
import { useState } from 'react'

const templates = [
  {
    id: 'classic',
    name: 'الكلاسيكي',
    desc: 'مناسب لجميع المجالات والوظائف الحكومية',
    badge: 'الأكثر طلباً',
    accent: '#7acee1',
    suitableFor: ['حكومي', 'إداري', 'مالي', 'موارد بشرية'],
  },
  {
    id: 'modern',
    name: 'العصري',
    desc: 'مثالي للمجالات التقنية والإبداعية',
    badge: 'ترند 2025',
    accent: '#ffde59',
    suitableFor: ['تقنية', 'تسويق', 'إبداعي', 'ريادة أعمال'],
  },
  {
    id: 'executive',
    name: 'التنفيذي',
    desc: 'للمديرين والقيادات التنفيذية',
    badge: 'للقيادات',
    accent: '#ffffff',
    suitableFor: ['مدير عام', 'تنفيذي', 'استشاري', 'قيادي'],
  },
]

function CVMockup({ template }: { template: typeof templates[0] }) {
  return (
    <div className="bg-[#2a2928] border border-[#4a4948] rounded-xl shadow-lg overflow-hidden h-full">
      <div className="p-5 text-left" style={{ borderBottom: `2px solid ${template.accent}` }}>
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl flex-shrink-0" style={{ backgroundColor: `${template.accent}20`, border: `1px solid ${template.accent}40` }} />
          <div>
            <div className="text-white font-bold text-base">عبدالله محمد السالم</div>
            <div className="text-sm mt-0.5" style={{ color: template.accent }}>مدير مشاريع أول</div>
            <div className="flex gap-3 mt-2">
              <span className="text-gray-500 text-xs">📧 email@mail.com</span>
              <span className="text-gray-500 text-xs">📍 الرياض</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2 text-right" style={{ color: template.accent, borderColor: `${template.accent}30` }}>
            الملخص المهني
          </div>
          <div className="space-y-1">
            <div className="h-1.5 bg-[#4a4948] rounded w-full" />
            <div className="h-1.5 bg-[#4a4948] rounded w-4/5" />
            <div className="h-1.5 bg-[#4a4948] rounded w-5/6" />
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2 text-right" style={{ color: template.accent, borderColor: `${template.accent}30` }}>
            الخبرة العملية
          </div>
          <div className="space-y-2">
            {['شركة أرامكو السعودية', 'شركة STC'].map((company, i) => (
              <div key={i}>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">2020 - 2023</div>
                  <div className="text-xs font-semibold text-gray-300 text-right">{company}</div>
                </div>
                <div className="h-1.5 bg-[#393837] rounded w-3/4 mt-1 mr-auto" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider pb-1 border-b mb-2 text-right" style={{ color: template.accent, borderColor: `${template.accent}30` }}>
            المهارات
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {['إدارة المشاريع', 'Excel', 'تحليل البيانات', 'القيادة'].map(skill => (
              <span key={skill} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${template.accent}15`, color: template.accent, border: `1px solid ${template.accent}30` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Templates() {
  const [active, setActive] = useState(0)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966581008879'

  return (
    <section id="templates" className="py-20 section-darker section-animate">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#ffde59]/10 text-[#ffde59] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#ffde59]/20">نماذجنا</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            اختر نموذجك
            <span className="gradient-text"> المفضل</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            جميع النماذج متوافقة بالكامل مع ATS ومصممة بمعايير دولية
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {templates.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                active === i
                  ? 'text-[#2a2928] shadow-md'
                  : 'bg-[#393837] text-gray-400 border border-[#4a4948] hover:border-[#7acee1]'
              }`}
              style={active === i ? { backgroundColor: templates[i].accent } : {}}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Display */}
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <div className="max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-300">
              <CVMockup template={templates[active]} />
            </div>
          </div>

          <div className="lg:col-span-2 text-right">
            <div className="inline-block px-3 py-1 rounded-full text-[#2a2928] text-xs font-bold mb-4" style={{ backgroundColor: templates[active].accent }}>
              {templates[active].badge}
            </div>
            <h3 className="text-2xl font-black text-white mb-3">النموذج {templates[active].name}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{templates[active].desc}</p>

            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-300 mb-3">مناسب لـ:</div>
              <div className="flex flex-wrap gap-2 justify-end">
                {templates[active].suitableFor.map(item => (
                  <span key={item} className="px-3 py-1 rounded-full text-sm font-medium bg-[#393837] text-gray-300 border border-[#4a4948]">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#7acee1]/10 border border-[#7acee1]/30 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 text-[#7acee1]">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-sm">مضمون 100% التوافق مع ATS</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`/builder?template=${templates[active].id}`}
                className="flex items-center justify-center gap-2 bg-[#7acee1] hover:bg-[#5bbdd4] text-[#2a2928] px-6 py-3.5 rounded-xl font-bold transition-all w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                تعبئة بيانات في الموقع
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=مرحباً، أريد تصميم سيرة ذاتية بالنموذج ${templates[active].name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3.5 rounded-xl font-bold transition-all w-full"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                طلب عبر واتساب — ٥٠ ريال
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
