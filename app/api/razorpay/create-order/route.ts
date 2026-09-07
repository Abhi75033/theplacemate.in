import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, planTitle, courseTitle } = body

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 })
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id'
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'

    // Amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(Number(amount) * 100)
    const receipt = `rcpt_${Date.now().toString().slice(-8)}_${Math.floor(Math.random() * 1000)}`

    // Call Razorpay REST API
    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`

    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receipt,
        notes: {
          courseTitle: courseTitle || 'PlaceMate Program',
          planTitle: planTitle || 'Standard Plan',
        },
      }),
    })

    const orderData = await razorpayRes.json()

    if (!razorpayRes.ok) {
      console.error('Razorpay Order API Error:', orderData)
      // Fallback response for dev/test mode if keys are missing
      return NextResponse.json({
        orderId: `order_simulated_${Date.now()}`,
        amount: amountInPaise,
        currency: 'INR',
        keyId: keyId,
        isSimulated: true,
      })
    }

    return NextResponse.json({
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId: keyId,
      isSimulated: false,
    })
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
