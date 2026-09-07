import { ImageResponse } from 'next/og'
import { getCourseBySlug } from '@/lib/courses'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug)
  return [{ id: 'og', alt: `${course?.title || 'Course'} Training | PlaceMate`, size, contentType }]
}

export default async function Image({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug)

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
          width: 60, height: 60, borderRadius: 16, marginBottom: 16,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: 'white',
        }}>P</div>
        <div style={{ color: '#a78bfa', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>PlaceMate</div>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{course?.icon || '📚'}</div>
        <div style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, maxWidth: '900px' }}>
          {course?.title || 'Training Program'}
        </div>
        <div style={{ color: '#67e8f9', fontSize: 28, marginTop: 20, fontWeight: 500 }}>
          Training & Placement Program
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: 20 }}>
          <div style={{ color: '#94a3b8', fontSize: 18, background: 'rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '8px' }}>
            {course?.duration}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 18, background: 'rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '8px' }}>
            {course?.mode}
          </div>
        </div>
        <div style={{ color: '#64748b', fontSize: 20, marginTop: 28 }}>theplacemate.in</div>
      </div>
    ),
    { ...size }
  )
}
