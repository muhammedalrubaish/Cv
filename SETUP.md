# إعداد الموقع وواتساب

## 1. المتطلبات
- Node.js 18+
- حساب Meta Business
- رقم واتساب Business

## 2. إعداد المتغيرات البيئية

انسخ `.env.example` إلى `.env.local` وعدّل القيم:

```bash
cp .env.example .env.local
```

### متغيرات واتساب (من Meta Developer Console):
- `WHATSAPP_PHONE_NUMBER_ID` — ID الرقم من لوحة Meta
- `WHATSAPP_ACCESS_TOKEN` — Access Token الدائم (System User Token)
- `WHATSAPP_VERIFY_TOKEN` — كلمة سر تختارها أنت لتحقق Webhook
- `WHATSAPP_BUSINESS_ACCOUNT_ID` — WABA ID

## 3. تشغيل المشروع

```bash
npm install
npm run dev
```

## 4. إعداد Webhook على Meta

1. ادخل [Meta for Developers](https://developers.facebook.com)
2. أنشئ تطبيقاً جديداً > Business
3. أضف منتج WhatsApp
4. في Webhooks، أضف URL:
   ```
   https://YOUR_DOMAIN.com/api/whatsapp
   ```
5. Verify Token: نفس قيمة `WHATSAPP_VERIFY_TOKEN` في `.env.local`
6. اشترك في: `messages`

## 5. النشر على Vercel

```bash
npm install -g vercel
vercel --prod
```

أضف المتغيرات البيئية في لوحة Vercel تحت Settings > Environment Variables.

## 6. هيكل المشروع

```
app/
  page.tsx              — الصفحة الرئيسية
  api/whatsapp/route.ts — Webhook الواتساب
components/
  Navbar.tsx
  Hero.tsx
  Features.tsx
  Templates.tsx
  HowItWorks.tsx
  Pricing.tsx
  Testimonials.tsx
  Footer.tsx
  WhatsAppFloat.tsx
lib/
  whatsapp.ts    — إرسال رسائل واتساب عبر Meta API
  conversation.ts — منطق المحادثة الذكية
types/
  cv.ts          — أنواع TypeScript
```

## 7. تخصيص البيانات البنكية

عدّل في `.env.local`:
```
NEXT_PUBLIC_BANK_NAME=اسم البنك
NEXT_PUBLIC_IBAN=رقم الآيبان
NEXT_PUBLIC_ACCOUNT_NAME=اسم صاحب الحساب
NEXT_PUBLIC_WHATSAPP_NUMBER=966XXXXXXXXX
```
