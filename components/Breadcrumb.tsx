import Link from 'next/link'
import { Home } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/schemas'

interface BreadcrumbItem {
  name?: string
  label?: string
  href: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: 'Home', label: 'Home', href: '/' }, ...items]
  const schemaItems = allItems.map(i => ({ 
    name: i.name || i.label || '', 
    url: `https://www.theplacemate.in${i.href.endsWith('/') ? i.href : i.href + '/'}` 
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(schemaItems)) }}
      />
      <div className="flex justify-start mb-6 md:mb-8 mt-2">
        <nav 
          aria-label="Breadcrumb" 
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-[11px] text-slate-400 flex-nowrap overflow-x-auto scrollbar-hide max-w-full transition-all duration-300 hover:border-white/15 hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
        >
          {allItems.map((item, i) => (
            <span key={item.href} className="flex items-center gap-2.5 shrink-0">
              {i > 0 && (
                <span className="text-slate-600 select-none font-light shrink-0">/</span>
              )}
              
              {i === allItems.length - 1 ? (
                <span className="text-white font-semibold truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none flex items-center gap-1.5" title={item.name || item.label}>
                  {item.name || item.label}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse shrink-0" />
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-[#14B8A6] text-slate-300 hover:underline transition-colors flex items-center gap-1.5 duration-200"
                >
                  {i === 0 && <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  {item.name || item.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </>
  )
}
