export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, city, course } = body

    // Validate required fields
    if (!name || !phone || !email || !course) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate phone (10 digits)
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      return Response.json({ error: 'Phone number must be at least 10 digits' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const lead = {
      id: Date.now(),
      name,
      phone: cleanPhone,
      email,
      city: city || 'Not specified',
      course,
      timestamp: new Date().toISOString(),
      source: 'website',
    }

    // Send to WhatsApp webhook if configured
    const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL
    if (webhookUrl && webhookUrl !== 'your_webhook_url_here') {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        })
      } catch (err) {
        // Log webhook error but don't fail the request
        console.error('Webhook error:', err)
      }
    }

    // Log lead for now (replace with DB save in production)
    console.log('New lead captured:', lead)

    return Response.json({ success: true, message: 'Lead captured successfully' })
  } catch (err) {
    console.error('Lead API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
