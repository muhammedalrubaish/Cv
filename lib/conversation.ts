import { CustomerSession, ConversationStep, CVData } from '@/types/cv'
import { sendWhatsAppMessage, sendWhatsAppButtons, sendWhatsAppList } from './whatsapp'

// In-memory store (use Redis/DB in production)
const sessions = new Map<string, CustomerSession>()

const BANK_NAME = process.env.NEXT_PUBLIC_BANK_NAME || 'البنك الأهلي السعودي'
const IBAN = process.env.NEXT_PUBLIC_IBAN || 'SA00 0000 0000 0000 0000 0000'
const ACCOUNT_NAME = process.env.NEXT_PUBLIC_ACCOUNT_NAME || 'خدمات السيرة الذاتية'

export function getSession(phone: string): CustomerSession {
  if (!sessions.has(phone)) {
    sessions.set(phone, {
      phone,
      step: 'greeting',
      cvData: {
        personalInfo: {
          fullName: '',
          jobTitle: '',
          phone,
          email: '',
          city: '',
          summary: '',
        },
        experience: [],
        education: [],
        skills: [],
        languages: [],
        template: 'classic',
      },
      createdAt: new Date(),
    })
  }
  return sessions.get(phone)!
}

export function updateSession(phone: string, updates: Partial<CustomerSession>) {
  const session = getSession(phone)
  sessions.set(phone, { ...session, ...updates })
}

export async function processMessage(phone: string, message: string): Promise<void> {
  const session = getSession(phone)
  const text = message.trim()
  const lowerText = text.toLowerCase().replace(/\s+/g, '')

  // Handle restart command
  if (lowerText === 'بداية' || lowerText === 'restart' || lowerText === 'ابدأ') {
    sessions.delete(phone)
    await handleGreeting(phone)
    return
  }

  switch (session.step) {
    case 'greeting':
      await handleGreeting(phone)
      break
    case 'name':
      await handleName(phone, text)
      break
    case 'job_title':
      await handleJobTitle(phone, text)
      break
    case 'email':
      await handleEmail(phone, text)
      break
    case 'city':
      await handleCity(phone, text)
      break
    case 'summary':
      await handleSummary(phone, text)
      break
    case 'experience_count':
      await handleExperienceCount(phone, text)
      break
    case 'experience_details':
      await handleExperienceDetails(phone, text)
      break
    case 'education':
      await handleEducation(phone, text)
      break
    case 'skills':
      await handleSkills(phone, text)
      break
    case 'languages':
      await handleLanguages(phone, text)
      break
    case 'template_choice':
      await handleTemplateChoice(phone, text)
      break
    case 'confirm':
      await handleConfirm(phone, text)
      break
    case 'payment':
      await handlePayment(phone, text)
      break
    case 'completed':
      await sendWhatsAppMessage(
        phone,
        '✅ طلبك مكتمل! سيتم تسليم سيرتك الذاتية خلال 24 ساعة.\n\nللبدء من جديد أرسل: *بداية*'
      )
      break
    default:
      await handleGreeting(phone)
  }
}

async function handleGreeting(phone: string) {
  updateSession(phone, { step: 'name' })
  await sendWhatsAppMessage(
    phone,
    `🌟 *أهلاً بك في خدمة تصميم السيرة الذاتية!*

نحن نصمم لك سيرة ذاتية *احترافية متوافقة مع نظام ATS* يقرأها الذكاء الاصطناعي للشركات.

✅ تصميم احترافي
✅ متوافق مع ATS بنسبة 100%
✅ تسليم خلال 24 ساعة
✅ السعر: *50 ريال فقط* 💰

---

للبدء، أخبرني بـ *اسمك الكامل* كما تريده في السيرة الذاتية:

_(مثال: محمد عبدالله الأحمدي)_`
  )
}

async function handleName(phone: string, text: string) {
  if (text.length < 3) {
    await sendWhatsAppMessage(phone, '⚠️ الرجاء إدخال اسم صحيح (3 أحرف على الأقل)')
    return
  }

  const session = getSession(phone)
  updateSession(phone, {
    step: 'job_title',
    cvData: {
      ...session.cvData,
      personalInfo: { ...session.cvData.personalInfo!, fullName: text },
    },
  })

  await sendWhatsAppMessage(
    phone,
    `👋 أهلاً *${text}*!

الآن، ما هو *المسمى الوظيفي* الذي تريده في سيرتك الذاتية؟

_(مثال: مهندس برمجيات | مدير مبيعات | محاسب قانوني | مشرف موارد بشرية)_`
  )
}

async function handleJobTitle(phone: string, text: string) {
  if (text.length < 2) {
    await sendWhatsAppMessage(phone, '⚠️ الرجاء إدخال المسمى الوظيفي')
    return
  }

  const session = getSession(phone)
  updateSession(phone, {
    step: 'email',
    cvData: {
      ...session.cvData,
      personalInfo: { ...session.cvData.personalInfo!, jobTitle: text },
    },
  })

  await sendWhatsAppMessage(
    phone,
    `💼 ممتاز! *${text}*

الآن أحتاج *بريدك الإلكتروني*:

_(مثال: mohammed@gmail.com)_`
  )
}

async function handleEmail(phone: string, text: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(text)) {
    await sendWhatsAppMessage(phone, '⚠️ الرجاء إدخال بريد إلكتروني صحيح\n_(مثال: name@gmail.com)_')
    return
  }

  const session = getSession(phone)
  updateSession(phone, {
    step: 'city',
    cvData: {
      ...session.cvData,
      personalInfo: { ...session.cvData.personalInfo!, email: text },
    },
  })

  await sendWhatsAppMessage(phone, `📧 تم حفظ البريد الإلكتروني.\n\nما هي *مدينتك*؟\n\n_(مثال: الرياض | جدة | الدمام | مكة المكرمة)_`)
}

async function handleCity(phone: string, text: string) {
  if (text.length < 2) {
    await sendWhatsAppMessage(phone, '⚠️ الرجاء إدخال المدينة')
    return
  }

  const session = getSession(phone)
  updateSession(phone, {
    step: 'summary',
    cvData: {
      ...session.cvData,
      personalInfo: { ...session.cvData.personalInfo!, city: text },
    },
  })

  await sendWhatsAppMessage(
    phone,
    `📍 *${text}*

الآن اكتب *ملخصاً مهنياً* عن نفسك (3-5 جمل):

_(مثال: مهندس برمجيات ذو خبرة 5 سنوات في تطوير تطبيقات الويب والجوال. أتقن لغات JavaScript وPython. شغوف بالتقنيات الحديثة وحل المشكلات المعقدة...)_

💡 *نصيحة:* اذكر سنوات خبرتك وأبرز مهاراتك وما تتميز به`
  )
}

async function handleSummary(phone: string, text: string) {
  if (text.length < 20) {
    await sendWhatsAppMessage(phone, '⚠️ الرجاء كتابة ملخص أكثر تفصيلاً (20 حرف على الأقل)')
    return
  }

  const session = getSession(phone)
  updateSession(phone, {
    step: 'experience_count',
    cvData: {
      ...session.cvData,
      personalInfo: { ...session.cvData.personalInfo!, summary: text },
    },
  })

  await sendWhatsAppButtons(
    phone,
    '💼 *الخبرة العملية*\n\nكم عدد الوظائف السابقة التي تريد إضافتها؟',
    [
      { id: 'exp_0', title: '🆕 خريج جديد (بدون)' },
      { id: 'exp_1', title: '1️⃣ وظيفة واحدة' },
      { id: 'exp_2', title: '2️⃣ وظيفتان' },
    ]
  )
}

async function handleExperienceCount(phone: string, text: string) {
  const session = getSession(phone)
  let count = 0

  if (text.includes('0') || text.includes('بدون') || text.includes('خريج') || text === 'exp_0') {
    count = 0
  } else if (text.includes('1') || text === 'exp_1') {
    count = 1
  } else if (text.includes('2') || text === 'exp_2') {
    count = 2
  } else if (text.includes('3') || text === 'exp_3') {
    count = 3
  } else {
    const num = parseInt(text)
    if (!isNaN(num) && num >= 0 && num <= 10) {
      count = num
    } else {
      await sendWhatsAppMessage(phone, '⚠️ الرجاء اختيار عدد الوظائف (0-10)')
      return
    }
  }

  if (count === 0) {
    updateSession(phone, { step: 'education' })
    await handleEducationPrompt(phone)
    return
  }

  updateSession(phone, {
    step: 'experience_details',
    cvData: {
      ...session.cvData,
      experience: [],
    },
  })

  await sendWhatsAppMessage(
    phone,
    `✍️ *الوظيفة 1 من ${count}*\n\nأرسل تفاصيل الوظيفة بهذا الشكل:\n\n*الشركة | المسمى | من (سنة) | إلى (سنة) | المهام*\n\n_(مثال: شركة أرامكو | مهندس ميداني | 2020 | 2023 | إدارة المشاريع وتنسيق الفرق والإشراف على العمليات اليومية)_\n\n💡 اكتب "الحالية" إذا كانت وظيفتك الحالية`
  )

  // Store target count
  updateSession(phone, {
    cvData: {
      ...getSession(phone).cvData,
    },
  })
  // Store exp count target in a temp field via session update
  sessions.get(phone)!.cvData.experience = Array(count).fill(null).map((_, i) => ({
    id: `exp_${i}`,
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  }))
}

async function handleExperienceDetails(phone: string, text: string) {
  const session = getSession(phone)
  const experiences = session.cvData.experience || []
  const filledCount = experiences.filter(e => e.company !== '').length
  const totalCount = experiences.length

  const parts = text.split('|').map(p => p.trim())
  if (parts.length < 4) {
    await sendWhatsAppMessage(
      phone,
      '⚠️ الرجاء إرسال البيانات بالشكل الصحيح:\n*الشركة | المسمى | من (سنة) | إلى (سنة) | المهام*'
    )
    return
  }

  const [company, position, startDate, endDate, ...descParts] = parts
  const description = descParts.join(' | ')
  const isCurrent = endDate.includes('الحالية') || endDate.includes('حالي')

  experiences[filledCount] = {
    id: `exp_${filledCount}`,
    company,
    position,
    startDate,
    endDate: isCurrent ? 'الحالية' : endDate,
    current: isCurrent,
    description: description || `العمل في ${company} كـ${position}`,
  }

  updateSession(phone, { cvData: { ...session.cvData, experience: experiences } })

  if (filledCount + 1 < totalCount) {
    await sendWhatsAppMessage(
      phone,
      `✅ تم حفظ وظيفة "${company}"\n\n✍️ *الوظيفة ${filledCount + 2} من ${totalCount}*\n\nأرسل تفاصيلها بنفس الشكل:\n*الشركة | المسمى | من (سنة) | إلى (سنة) | المهام*`
    )
  } else {
    updateSession(phone, { step: 'education' })
    await handleEducationPrompt(phone)
  }
}

async function handleEducationPrompt(phone: string) {
  await sendWhatsAppMessage(
    phone,
    `🎓 *التعليم*\n\nأرسل بياناتك التعليمية:\n\n*الجامعة | الدرجة | التخصص | سنة التخرج*\n\n_(مثال: جامعة الملك فهد | بكالوريوس | هندسة الحاسب | 2021)_\n\nإذا كان لديك أكثر من شهادة أرسل كل شهادة في رسالة منفصلة ثم أرسل *"تم"* عند الانتهاء`
  )
}

async function handleEducation(phone: string, text: string) {
  const session = getSession(phone)

  if (text.toLowerCase() === 'تم' || text === 'done') {
    if ((session.cvData.education || []).length === 0) {
      await sendWhatsAppMessage(phone, '⚠️ الرجاء إضافة شهادة واحدة على الأقل')
      return
    }
    updateSession(phone, { step: 'skills' })
    await handleSkillsPrompt(phone)
    return
  }

  const parts = text.split('|').map(p => p.trim())
  if (parts.length < 3) {
    await sendWhatsAppMessage(
      phone,
      '⚠️ الرجاء إرسال البيانات بالشكل الصحيح:\n*الجامعة | الدرجة | التخصص | سنة التخرج*\n\nأو أرسل *"تم"* للمتابعة'
    )
    return
  }

  const [institution, degree, field, endDate] = parts
  const education = session.cvData.education || []
  education.push({
    id: `edu_${education.length}`,
    institution,
    degree,
    field,
    startDate: '',
    endDate: endDate || '',
  })

  updateSession(phone, { cvData: { ...session.cvData, education } })
  await sendWhatsAppMessage(
    phone,
    `✅ تم حفظ: "${degree} - ${field}"\n\nهل تريد إضافة شهادة أخرى؟ أرسلها، أو أرسل *"تم"* للمتابعة`
  )
}

async function handleSkillsPrompt(phone: string) {
  await sendWhatsAppMessage(
    phone,
    `🛠️ *المهارات*\n\nأرسل مهاراتك مفصولة بفاصلة:\n\n_(مثال: Microsoft Office, إدارة المشاريع, التفاوض, Excel, PowerPoint, العمل الجماعي)_\n\n💡 أضف من 5 إلى 10 مهارات لأفضل نتيجة`
  )
}

async function handleSkills(phone: string, text: string) {
  const session = getSession(phone)
  const skillNames = text.split(',').map(s => s.trim()).filter(s => s.length > 0)

  if (skillNames.length < 3) {
    await sendWhatsAppMessage(phone, '⚠️ الرجاء إدخال 3 مهارات على الأقل مفصولة بفاصلة')
    return
  }

  const skills = skillNames.map((name, i) => ({
    id: `skill_${i}`,
    name,
    level: 'advanced' as const,
  }))

  updateSession(phone, {
    step: 'languages',
    cvData: { ...session.cvData, skills },
  })

  await sendWhatsAppMessage(
    phone,
    `✅ تم حفظ ${skills.length} مهارة.\n\n🌐 *اللغات*\n\nأرسل اللغات ومستواها مفصولة بفاصلة:\n\n_(مثال: العربية - اللغة الأم, الإنجليزية - متقدم, الفرنسية - متوسط)_`
  )
}

async function handleLanguages(phone: string, text: string) {
  const session = getSession(phone)
  const langParts = text.split(',').map(s => s.trim()).filter(s => s.length > 0)

  const languages = langParts.map((part, i) => {
    const [name, level] = part.split('-').map(s => s.trim())
    let langLevel: 'basic' | 'intermediate' | 'fluent' | 'native' = 'fluent'
    if (level?.includes('الأم') || level?.includes('native')) langLevel = 'native'
    else if (level?.includes('متقدم') || level?.includes('advanced')) langLevel = 'fluent'
    else if (level?.includes('متوسط') || level?.includes('intermediate')) langLevel = 'intermediate'
    else if (level?.includes('مبتدئ') || level?.includes('basic')) langLevel = 'basic'

    return { id: `lang_${i}`, name: name || part, level: langLevel }
  })

  updateSession(phone, {
    step: 'template_choice',
    cvData: { ...session.cvData, languages },
  })

  await sendWhatsAppButtons(
    phone,
    '🎨 *اختر تصميم السيرة الذاتية*\n\nلدينا 3 نماذج احترافية متوافقة مع ATS:',
    [
      { id: 'tmpl_classic', title: '📋 الكلاسيكي' },
      { id: 'tmpl_modern', title: '✨ العصري' },
      { id: 'tmpl_executive', title: '👔 التنفيذي' },
    ]
  )
}

async function handleTemplateChoice(phone: string, text: string) {
  const session = getSession(phone)
  let template: 'classic' | 'modern' | 'executive' = 'classic'

  if (text.includes('modern') || text.includes('عصري') || text.includes('tmpl_modern')) {
    template = 'modern'
  } else if (text.includes('executive') || text.includes('تنفيذي') || text.includes('tmpl_executive')) {
    template = 'executive'
  }

  updateSession(phone, {
    step: 'confirm',
    cvData: { ...session.cvData, template },
  })

  const cv = getSession(phone).cvData
  const info = cv.personalInfo!

  const summary = `📋 *ملخص سيرتك الذاتية*

👤 *الاسم:* ${info.fullName}
💼 *المسمى:* ${info.jobTitle}
📍 *المدينة:* ${info.city}
📧 *البريد:* ${info.email}
🎓 *التعليم:* ${cv.education?.length || 0} شهادة
💼 *الخبرة:* ${cv.experience?.filter(e => e.company).length || 0} وظيفة
🛠️ *المهارات:* ${cv.skills?.length || 0} مهارة
🎨 *النموذج:* ${template === 'classic' ? 'الكلاسيكي' : template === 'modern' ? 'العصري' : 'التنفيذي'}

💰 *السعر: 50 ريال*

هل تريد تأكيد الطلب؟`

  await sendWhatsAppButtons(phone, summary, [
    { id: 'confirm_yes', title: '✅ تأكيد الطلب' },
    { id: 'confirm_edit', title: '✏️ تعديل البيانات' },
  ])
}

async function handleConfirm(phone: string, text: string) {
  if (text.includes('edit') || text.includes('تعديل')) {
    sessions.delete(phone)
    await sendWhatsAppMessage(phone, '✏️ سنبدأ من جديد. أرسل *"بداية"* للمتابعة')
    return
  }

  if (text.includes('yes') || text.includes('تأكيد') || text.includes('نعم')) {
    updateSession(phone, { step: 'payment' })
    await sendWhatsAppMessage(
      phone,
      `🎉 *تم تأكيد طلبك!*

للإتمام، يرجى تحويل مبلغ *50 ريال سعودي* إلى:

🏦 *البنك:* ${BANK_NAME}
🔢 *رقم الآيبان:* ${IBAN}
👤 *اسم الحساب:* ${ACCOUNT_NAME}

---

بعد التحويل، أرسل *صورة إيصال التحويل* وسيتم تسليم سيرتك الذاتية خلال *24 ساعة* ⏰

شكراً لثقتك بنا! 🌟`
    )
  }
}

async function handlePayment(phone: string, text: string) {
  updateSession(phone, { step: 'completed' })
  await sendWhatsAppMessage(
    phone,
    `✅ *تم استلام طلبك!*

سيتم التحقق من التحويل وتسليم سيرتك الذاتية خلال *24 ساعة* 📄

إذا كان لديك أي استفسار، تواصل معنا مباشرة.

شكراً لاختيارك خدمتنا! 🌟`
  )
}
