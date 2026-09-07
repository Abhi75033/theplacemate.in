import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isSimulated,
      planTitle,
      courseTitle,
      customerName,
      customerEmail,
      customerPhone,
    } = body

    if (isSimulated) {
      return NextResponse.json({
        success: true,
        message: 'Simulated payment verified successfully',
        paymentId: `pay_simulated_${Date.now()}`,
        orderId: razorpay_order_id,
      })
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing required Razorpay payment details' }, { status: 400 })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'

    // HMAC SHA256 verification
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isSignatureValid = expectedSignature === razorpay_signature

    if (!isSignatureValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Here you can log the lead / enrollment to a database, send email confirmation, etc.
    console.log('Payment Verified Successfully:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      courseTitle,
      planTitle,
      customerName,
      customerEmail,
      customerPhone,
    })

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
