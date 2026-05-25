import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/schemas'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]
  const schemaItems = allItems.map(i => ({ name: i.label, url: `https://www.theplacemate.in${i.href}` }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(schemaItems)) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748b] flex-wrap">
        {allItems.map((item, i) => (
          <span key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {i === allItems.length - 1 ? (
              <span className="text-[#94a3b8] font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
