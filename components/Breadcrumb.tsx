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
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748b] flex-nowrap overflow-x-auto scrollbar-hide py-1 max-w-full">
        {allItems.map((item, i) => (
          <span key={item.href} className="flex items-center gap-1.5 shrink-0">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
            {i === allItems.length - 1 ? (
              <span className="text-[#94a3b8] font-medium truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none" title={item.label}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-white transition-colors hover:underline">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
