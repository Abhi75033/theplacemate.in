import { ImageResponse } from 'next/og'
import { getCourseBySlug } from '@/lib/courses'
import { getCityBySlug } from '@/lib/cities'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateImageMetadata({ params }: { params: { slug: string; city: string } }) {
  const course = getCourseBySlug(params.slug)
  const city = getCityBySlug(params.city)
  return [{ id: 'og', alt: `${course?.title || 'Course'} Training in ${city?.name || 'City'} | PlaceMate`, size, contentType }]
}

export default async function Image({ params }: { params: { slug: string; city: string } }) {
  const course = getCourseBySlug(params.slug)
  const city = getCityBySlug(params.city)

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
        <div style={{ color: '#a78bfa', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>PlaceMate</div>
        <div style={{ color: '#ffffff', fontSize: 44, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, maxWidth: '900px' }}>
          {course?.title || 'Training Program'}
        </div>
        <div style={{ color: '#67e8f9', fontSize: 32, marginTop: 16, fontWeight: 600 }}>
          {city?.name || 'City'} — Training & Placement
        </div>
        <div style={{ color: '#94a3b8', fontSize: 22, marginTop: 20 }}>
          {course?.duration} · {course?.mode}
        </div>
        <div style={{ color: '#64748b', fontSize: 20, marginTop: 28 }}>theplacemate.in</div>
      </div>
    ),
    { ...size }
  )
}
