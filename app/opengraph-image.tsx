import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'PlaceMate — Industry-Focused Training & Internship Platform'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(135deg, #050508 0%, #1a0a2e 50%, #0a0a1f 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '60px',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }} />
        <div style={{
          width: 80, height: 80, borderRadius: 20, marginBottom: 24,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, fontWeight: 900, color: 'white',
        }}>P</div>
        <div style={{ color: '#a78bfa', fontSize: 28, fontWeight: 700, marginBottom: 16 }}>PlaceMate</div>
        <div style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, textAlign: 'center', lineHeight: 1.2, maxWidth: '900px' }}>
          Industry-Focused Training & Internship Platform
        </div>
        <div style={{ color: '#67e8f9', fontSize: 26, marginTop: 24, fontWeight: 500 }}>
          Learn. Build. Get Hired.
        </div>
        <div style={{ color: '#64748b', fontSize: 20, marginTop: 40 }}>
          theplacemate.in
        </div>
      </div>
    ),
    { ...size }
  )
}
