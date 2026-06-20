import { NextRequest, NextResponse } from 'next/server'
import { processMessage } from '@/lib/conversation'
import { appendMessage, ensureConversation, shouldBotReply, updateConversation } from '@/lib/store'

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN

// Webhook verification (GET) - Meta sends this to verify the endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified')
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

// Receive messages (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ error: 'Invalid object' }, { status: 400 })
    }

    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value

    if (!value?.messages || value.messages.length === 0) {
      // Could be a status update, not a message
      return NextResponse.json({ status: 'ok' })
    }

    // WhatsApp provides the customer's display name in the contacts array.
    const contactName: string | undefined = value.contacts?.[0]?.profile?.name

    for (const message of value.messages) {
      const from = message.from // phone number
      let messageText = '' // value passed to the bot (ids for buttons)
      let displayText = '' // human-readable text shown in the inbox

      // Handle different message types
      if (message.type === 'text') {
        messageText = message.text.body
        displayText = message.text.body
      } else if (message.type === 'interactive') {
        if (message.interactive.type === 'button_reply') {
          messageText = message.interactive.button_reply.id
          displayText = message.interactive.button_reply.title || messageText
        } else if (message.interactive.type === 'list_reply') {
          messageText = message.interactive.list_reply.id
          displayText = message.interactive.list_reply.title || messageText
        }
      } else if (message.type === 'image' || message.type === 'document') {
        // Customer sent a payment receipt / attachment
        messageText = 'PAYMENT_PROOF_RECEIVED'
        displayText = message.type === 'image' ? '📷 صورة (إيصال؟)' : '📎 مستند'
      } else {
        continue
      }

      // Make sure the conversation exists and capture the customer's name once.
      const conv = await ensureConversation(from)
      if (contactName && !conv.name) {
        await updateConversation(from, { name: contactName })
      }

      // Log the incoming message into the inbox history (marks it unread).
      await appendMessage(from, { dir: 'in', actor: 'customer', text: displayText })

      // Decide who answers: the bot (auto/busy) or the human owner (available/handover).
      const fresh = await ensureConversation(from)
      if (await shouldBotReply(fresh)) {
        await processMessage(from, messageText)
      }
      // Otherwise the message simply waits in the admin inbox for a manual reply.
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
