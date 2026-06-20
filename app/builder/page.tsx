'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Experience = {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  responsibilities: string
}

type Education = {
  degree: string
  university: string
  major: string
  year: string
}

type Course = {
  name: string
  provider: string
  date: string
}

type FormData = {
  // Personal
  fullName: string
  jobTitle: string
  phone: string
  email: string
  city: string
  // Summary
  summary: string
  // Experience
  experiences: Experience[]
  // Education
  education: Education[]
  // Courses
  courses: Course[]
  // Skills
  skills: string
  // Languages
  languages: string
  // Template
  template: string
}

const initialForm: FormData = {
  fullName: '',
  jobTitle: '',
  phone: '',
  email: '',
  city: '',
  summary: '',
  experiences: [{ title: '', company: '', location: '', startDate: '', endDate: '', current: false, responsibilities: '' }],
  education: [{ degree: '', university: '', major: '', year: '' }],
  courses: [{ name: '', provider: '', date: '' }],
  skills: '',
  languages: 'العربية، الإنجليزية',
  template: 'classic',
}

const STEPS = [
  { id: 1, label: 'البيانات الشخصية', icon: '👤' },
  { id: 2, label: 'الهدف المهني', icon: '🎯' },
  { id: 3, label: 'الخبرات', icon: '💼' },
  { id: 4, label: 'التعليم', icon: '🎓' },
  { id: 5, label: 'الدورات', icon: '📜' },
  { id: 6, label: 'المهارات واللغات', icon: '⚡' },
  { id: 7, label: 'النموذج والإرسال', icon: '✨' },
]

const templates = [
  { id: 'classic', name: 'الكلاسيكي', desc: 'مناسب لجميع المجالات والوظائف الحكومية', accent: '#7acee1' },
  { id: 'modern', name: 'العصري', desc: 'مثالي للمجالات التقنية والإبداعية', accent: '#ffde59' },
  { id: 'executive', name: 'التنفيذي', desc: 'للمديرين والقيادات التنفيذية', accent: '#ffffff' },
]

function inputClass(error?: boolean) {
  return `w-full bg-[#393837] border ${error ? 'border-red-500' : 'border-[#4a4948]'} rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7acee1] transition-colors text-right`
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-gray-300 mb-1.5 text-right">{children}</label>
}

function BuilderContent() {
  const searchParams = useSearchParams()
  const initialTemplate = searchParams.get('template') || 'classic'

  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({ ...initialForm, template: initialTemplate })
  const [submitted, setSubmitted] = useState(false)

  const whatsappNumber = '966581008879'

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function setExp(i: number, key: keyof Experience, val: string | boolean) {
    const exps = [...form.experiences]
    exps[i] = { ...exps[i], [key]: val }
    set('experiences', exps)
  }

  function addExp() {
    set('experiences', [...form.experiences, { title: '', company: '', location: '', startDate: '', endDate: '', current: false, responsibilities: '' }])
  }

  function removeExp(i: number) {
    set('experiences', form.experiences.filter((_, idx) => idx !== i))
  }

  function setEdu(i: number, key: keyof Education, val: string) {
    const eds = [...form.education]
    eds[i] = { ...eds[i], [key]: val }
    set('education', eds)
  }

  function addEdu() {
    set('education', [...form.education, { degree: '', university: '', major: '', year: '' }])
  }

  function removeEdu(i: number) {
    set('education', form.education.filter((_, idx) => idx !== i))
  }

  function setCourse(i: number, key: keyof Course, val: string) {
    const cs = [...form.courses]
    cs[i] = { ...cs[i], [key]: val }
    set('courses', cs)
  }

  function addCourse() {
    set('courses', [...form.courses, { name: '', provider: '', date: '' }])
  }

  function removeCourse(i: number) {
    set('courses', form.courses.filter((_, idx) => idx !== i))
  }

  function buildWhatsAppMessage() {
    const exps = form.experiences.map((e, i) =>
      `[خبرة ${i + 1}] ${e.title} في ${e.company} (${e.startDate} - ${e.current ? 'حتى الآن' : e.endDate})\n${e.responsibilities}`
    ).join('\n\n')

    const edu = form.education.map(e =>
      `${e.degree} — ${e.university} (${e.major}) ${e.year}`
    ).join('\n')

    const courses = form.courses.filter(c => c.name).map(c =>
      `${c.name} — ${c.provider} ${c.date}`
    ).join('\n')

    return encodeURIComponent(
`مرحباً iDes Designers، أريد تصميم سيرة ذاتية احترافية.

📋 البيانات الشخصية:
الاسم: ${form.fullName}
المسمى الوظيفي: ${form.jobTitle}
الهاتف: ${form.phone}
البريد: ${form.email}
المدينة: ${form.city}

🎯 الهدف المهني:
${form.summary}

💼 الخبرات:
${exps}

🎓 التعليم:
${edu}

📜 الدورات:
${courses || 'لا يوجد'}

⚡ المهارات:
${form.skills}

🌐 اللغات:
${form.languages}

🎨 النموذج المختار: ${templates.find(t => t.id === form.template)?.name || 'الكلاسيكي'}

أرجو إتمام الطلب وإرسال تفاصيل الدفع.`
    )
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#2a2928] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-black text-white mb-4">تم استلام بياناتك!</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            انقر على الزر أدناه لإرسال بياناتك عبر واتساب. سيتواصل معك فريقنا لإتمام الطلب وإرسال تفاصيل الدفع.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl w-full mb-4"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            إرسال عبر واتساب الآن
          </a>
          <a href="/" className="text-gray-500 hover:text-[#7acee1] text-sm transition-colors">
            العودة للرئيسية
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2a2928]" dir="rtl">
      {/* Header */}
      <div className="bg-[#2a2928] border-b border-[#4a4948] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-gray-500 hover:text-[#7acee1] text-sm transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            رجوع
          </a>
          <div className="text-center">
            <div className="text-white font-black text-sm">i<span className="text-[#7acee1]">Des</span></div>
            <div className="text-[#ffde59] text-[8px] font-semibold uppercase tracking-widest">Designers</div>
          </div>
          <div className="text-[#7acee1] text-sm font-semibold">{step} / {STEPS.length}</div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#4a4948]">
          <div
            className="h-full bg-[#7acee1] transition-all duration-500"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step indicator */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {STEPS.map(s => (
            <button
              key={s.id}
              onClick={() => s.id < step && setStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                s.id === step
                  ? 'bg-[#7acee1] text-[#2a2928]'
                  : s.id < step
                  ? 'bg-[#7acee1]/20 text-[#7acee1] cursor-pointer'
                  : 'bg-[#393837] text-gray-600 cursor-not-allowed'
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">البيانات الشخصية</h2>
              <p className="text-gray-500 text-sm">هذه المعلومات ستظهر في رأس سيرتك الذاتية</p>
            </div>
            <div>
              <Label>الاسم الكامل *</Label>
              <input className={inputClass()} placeholder="مثال: محمد عبدالله الأحمدي" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
            </div>
            <div>
              <Label>المسمى الوظيفي المطلوب *</Label>
              <input className={inputClass()} placeholder="مثال: مهندس برمجيات أول" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>رقم الجوال *</Label>
                <input className={inputClass()} placeholder="05XXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} dir="ltr" />
              </div>
              <div>
                <Label>المدينة *</Label>
                <input className={inputClass()} placeholder="الرياض" value={form.city} onChange={e => set('city', e.target.value)} />
              </div>
            </div>
            <div>
              <Label>البريد الإلكتروني *</Label>
              <input className={inputClass()} placeholder="name@email.com" value={form.email} onChange={e => set('email', e.target.value)} dir="ltr" type="email" />
            </div>
          </div>
        )}

        {/* Step 2: Summary */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">الهدف المهني</h2>
              <p className="text-gray-500 text-sm">فقرة قصيرة تصف أهدافك وخبراتك الرئيسية (3-5 جمل)</p>
            </div>
            <div>
              <Label>الهدف المهني / الملخص *</Label>
              <textarea
                className={`${inputClass()} resize-none`}
                rows={6}
                placeholder="مثال: أسعى للحصول على فرصة في مجال إدارة المشاريع، باستخدام خبرتي الواسعة في تخطيط وتنفيذ المشاريع بكفاءة عالية..."
                value={form.summary}
                onChange={e => set('summary', e.target.value)}
              />
            </div>
            <div className="bg-[#393837] border border-[#7acee1]/20 rounded-xl p-4 text-right">
              <p className="text-[#7acee1] text-xs font-semibold mb-1">نصيحة ATS</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                استخدم كلمات مفتاحية من إعلان الوظيفة المستهدفة في الهدف المهني. هذا يزيد من فرص تجاوز فلتر ATS.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">الخبرات العملية</h2>
              <p className="text-gray-500 text-sm">أضف خبراتك من الأحدث للأقدم</p>
            </div>
            {form.experiences.map((exp, i) => (
              <div key={i} className="bg-[#393837] rounded-2xl p-5 border border-[#4a4948] space-y-4">
                <div className="flex items-center justify-between">
                  <button onClick={() => removeExp(i)} className={`text-red-400 hover:text-red-300 text-xs transition-colors ${form.experiences.length === 1 ? 'invisible' : ''}`}>
                    حذف
                  </button>
                  <span className="text-gray-400 text-sm font-semibold">الخبرة {i + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>المسمى الوظيفي *</Label>
                    <input className={inputClass()} placeholder="مشرف دعم فني" value={exp.title} onChange={e => setExp(i, 'title', e.target.value)} />
                  </div>
                  <div>
                    <Label>اسم الشركة *</Label>
                    <input className={inputClass()} placeholder="شركة العرض المتقن" value={exp.company} onChange={e => setExp(i, 'company', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>المدينة / الدولة</Label>
                  <input className={inputClass()} placeholder="الرياض، المملكة العربية السعودية" value={exp.location} onChange={e => setExp(i, 'location', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>تاريخ البداية *</Label>
                    <input className={inputClass()} placeholder="2023/2" value={exp.startDate} onChange={e => setExp(i, 'startDate', e.target.value)} dir="ltr" />
                  </div>
                  <div>
                    <Label>تاريخ النهاية</Label>
                    <input className={inputClass()} placeholder="حتى الآن" value={exp.endDate} disabled={exp.current} onChange={e => setExp(i, 'endDate', e.target.value)} dir="ltr" />
                  </div>
                </div>
                <label className="flex items-center gap-2 justify-end cursor-pointer">
                  <span className="text-gray-400 text-sm">لا زلت أعمل هنا</span>
                  <input type="checkbox" checked={exp.current} onChange={e => setExp(i, 'current', e.target.checked)} className="w-4 h-4 accent-[#7acee1]" />
                </label>
                <div>
                  <Label>المهام والمسؤوليات *</Label>
                  <textarea
                    className={`${inputClass()} resize-none`}
                    rows={4}
                    placeholder="• توزيع الصلاحيات على الموظفين&#10;• إدارة التواصل مع أصحاب المصلحة&#10;• متابعة مؤشرات الأداء..."
                    value={exp.responsibilities}
                    onChange={e => setExp(i, 'responsibilities', e.target.value)}
                  />
                  <p className="text-gray-600 text-xs mt-1 text-right">ابدأ كل مسؤولية بنقطة جديدة للحصول على أفضل نتيجة</p>
                </div>
              </div>
            ))}
            <button
              onClick={addExp}
              className="w-full border-2 border-dashed border-[#4a4948] hover:border-[#7acee1] text-gray-500 hover:text-[#7acee1] rounded-2xl py-3 text-sm font-semibold transition-all"
            >
              + إضافة خبرة أخرى
            </button>
          </div>
        )}

        {/* Step 4: Education */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">التعليم</h2>
              <p className="text-gray-500 text-sm">أضف مؤهلاتك التعليمية من الأحدث للأقدم</p>
            </div>
            {form.education.map((edu, i) => (
              <div key={i} className="bg-[#393837] rounded-2xl p-5 border border-[#4a4948] space-y-4">
                <div className="flex items-center justify-between">
                  <button onClick={() => removeEdu(i)} className={`text-red-400 hover:text-red-300 text-xs ${form.education.length === 1 ? 'invisible' : ''}`}>
                    حذف
                  </button>
                  <span className="text-gray-400 text-sm font-semibold">المؤهل {i + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الدرجة العلمية *</Label>
                    <input className={inputClass()} placeholder="بكالوريوس" value={edu.degree} onChange={e => setEdu(i, 'degree', e.target.value)} />
                  </div>
                  <div>
                    <Label>سنة التخرج *</Label>
                    <input className={inputClass()} placeholder="2017" value={edu.year} onChange={e => setEdu(i, 'year', e.target.value)} dir="ltr" />
                  </div>
                </div>
                <div>
                  <Label>اسم الجامعة / المعهد *</Label>
                  <input className={inputClass()} placeholder="جامعة المستقبل" value={edu.university} onChange={e => setEdu(i, 'university', e.target.value)} />
                </div>
                <div>
                  <Label>التخصص *</Label>
                  <input className={inputClass()} placeholder="هندسة حاسب آلي" value={edu.major} onChange={e => setEdu(i, 'major', e.target.value)} />
                </div>
              </div>
            ))}
            <button
              onClick={addEdu}
              className="w-full border-2 border-dashed border-[#4a4948] hover:border-[#7acee1] text-gray-500 hover:text-[#7acee1] rounded-2xl py-3 text-sm font-semibold transition-all"
            >
              + إضافة مؤهل آخر
            </button>
          </div>
        )}

        {/* Step 5: Courses */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">الدورات والشهادات</h2>
              <p className="text-gray-500 text-sm">أضف دوراتك التدريبية وشهاداتك الاحترافية</p>
            </div>
            {form.courses.map((course, i) => (
              <div key={i} className="bg-[#393837] rounded-2xl p-5 border border-[#4a4948] space-y-4">
                <div className="flex items-center justify-between">
                  <button onClick={() => removeCourse(i)} className={`text-red-400 hover:text-red-300 text-xs ${form.courses.length === 1 ? 'invisible' : ''}`}>
                    حذف
                  </button>
                  <span className="text-gray-400 text-sm font-semibold">الدورة {i + 1}</span>
                </div>
                <div>
                  <Label>اسم الدورة / الشهادة</Label>
                  <input className={inputClass()} placeholder="إدارة الجودة في المشاريع" value={course.name} onChange={e => setCourse(i, 'name', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الجهة المانحة</Label>
                    <input className={inputClass()} placeholder="هيئة المهندسين السعوديين" value={course.provider} onChange={e => setCourse(i, 'provider', e.target.value)} />
                  </div>
                  <div>
                    <Label>التاريخ</Label>
                    <input className={inputClass()} placeholder="2023/7" value={course.date} onChange={e => setCourse(i, 'date', e.target.value)} dir="ltr" />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addCourse}
              className="w-full border-2 border-dashed border-[#4a4948] hover:border-[#7acee1] text-gray-500 hover:text-[#7acee1] rounded-2xl py-3 text-sm font-semibold transition-all"
            >
              + إضافة دورة أخرى
            </button>
            <p className="text-gray-600 text-xs text-right">إذا لم يكن لديك دورات، يمكنك المتابعة بدون إضافة أي شيء.</p>
          </div>
        )}

        {/* Step 6: Skills & Languages */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">المهارات واللغات</h2>
              <p className="text-gray-500 text-sm">أضف مهاراتك الاحترافية والتقنية</p>
            </div>
            <div>
              <Label>المهارات *</Label>
              <textarea
                className={`${inputClass()} resize-none`}
                rows={5}
                placeholder="إدارة الموارد&#10;إدارة المخاطر&#10;تخطيط المشاريع&#10;Microsoft Office&#10;القيادة والتحفيز"
                value={form.skills}
                onChange={e => set('skills', e.target.value)}
              />
              <p className="text-gray-600 text-xs mt-1 text-right">أضف كل مهارة في سطر منفصل للحصول على أفضل تنسيق</p>
            </div>
            <div>
              <Label>اللغات *</Label>
              <textarea
                className={`${inputClass()} resize-none`}
                rows={3}
                placeholder="العربية — اللغة الأم&#10;الإنجليزية — متقدم"
                value={form.languages}
                onChange={e => set('languages', e.target.value)}
              />
            </div>
            <div className="bg-[#393837] border border-[#7acee1]/20 rounded-xl p-4 text-right">
              <p className="text-[#7acee1] text-xs font-semibold mb-1">نصيحة ATS</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                أضف مهارات تقنية محددة (مثل Excel, Power BI, Python) وليس مهارات عامة فقط. الأنظمة تبحث عن كلمات مفتاحية دقيقة.
              </p>
            </div>
          </div>
        )}

        {/* Step 7: Template & Submit */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="text-right mb-6">
              <h2 className="text-2xl font-black text-white mb-1">اختر النموذج وأرسل</h2>
              <p className="text-gray-500 text-sm">اختر النموذج الأنسب لمجالك المهني</p>
            </div>

            <div className="space-y-3">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => set('template', t.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-right ${
                    form.template === t.id
                      ? 'border-[#7acee1] bg-[#7acee1]/10'
                      : 'border-[#4a4948] bg-[#393837] hover:border-[#7acee1]/50'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${t.accent}20`, border: `2px solid ${t.accent}40` }}
                  />
                  <div className="flex-1">
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.desc}</div>
                  </div>
                  {form.template === t.id && (
                    <svg className="w-5 h-5 text-[#7acee1] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-[#393837] rounded-2xl p-5 border border-[#4a4948] text-right space-y-2">
              <h3 className="text-white font-bold mb-3">ملخص طلبك</h3>
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium">{form.fullName}</span>
                <span className="text-gray-500">الاسم</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium">{form.jobTitle}</span>
                <span className="text-gray-500">المسمى</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium">{form.experiences.length} خبرة</span>
                <span className="text-gray-500">الخبرات</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7acee1] font-bold">{templates.find(t => t.id === form.template)?.name}</span>
                <span className="text-gray-500">النموذج</span>
              </div>
              <div className="border-t border-[#4a4948] pt-2 flex justify-between">
                <span className="text-[#ffde59] font-black text-lg">50 ريال</span>
                <span className="text-gray-500 text-sm">السعر</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.fullName || !form.jobTitle || !form.phone}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              إرسال الطلب عبر واتساب
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 border border-[#4a4948] hover:border-[#7acee1] text-gray-400 hover:text-white py-3 rounded-xl font-semibold transition-all"
            >
              السابق
            </button>
          )}
          {step < STEPS.length && (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 bg-[#7acee1] hover:bg-[#5bbdd4] text-[#2a2928] py-3 rounded-xl font-bold transition-all"
            >
              التالي
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#2a2928] flex items-center justify-center">
        <div className="text-[#7acee1] text-lg font-bold">جاري التحميل...</div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  )
}
