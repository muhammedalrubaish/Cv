import { NextRequest, NextResponse } from 'next/server'
import { processMessage } from '@/lib/conversation'

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

    for (const message of value.messages) {
      const from = message.from // phone number
      let messageText = ''

      // Handle different message types
      if (message.type === 'text') {
        messageText = message.text.body
      } else if (message.type === 'interactive') {
        // Button/list reply
        if (message.interactive.type === 'button_reply') {
          messageText = message.interactive.button_reply.id
        } else if (message.interactive.type === 'list_reply') {
          messageText = message.interactive.list_reply.id
        }
      } else if (message.type === 'image' || message.type === 'document') {
        // Customer sent payment receipt
        messageText = 'PAYMENT_PROOF_RECEIVED'
      } else {
        continue
      }

      // Process the message asynchronously
      await processMessage(from, messageText)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
