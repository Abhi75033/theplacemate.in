'use client'

import { motion } from 'framer-motion'

const PROJECTS = [
  { title: 'AI SaaS Dashboard', desc: 'Multi-tenant analytics platform with AI insights', tag: 'Production Grade', color: '#6366f1', icon: '📊', techs: ['Next.js', 'OpenAI', 'Supabase'] },
  { title: 'LMS Platform', desc: 'Full-featured learning platform with video courses', tag: 'Industry-Level', color: '#8b5cf6', icon: '🎓', techs: ['React', 'Node.js', 'AWS S3'] },
  { title: 'AI Chatbot App', desc: 'Context-aware chatbot with RAG & vector search', tag: 'Team-Based Project', color: '#06b6d4', icon: '🤖', techs: ['Python', 'LangChain', 'Pinecone'] },
  { title: 'Auth System', desc: 'Enterprise-grade auth with OAuth, MFA & RBAC', tag: 'Industry-Level', color: '#10b981', icon: '🔐', techs: ['NextAuth', 'PostgreSQL', 'Redis'] },
  { title: 'Admin Panel', desc: 'Full-featured CMS & data management system', tag: 'Real Client Simulation', color: '#f59e0b', icon: '⚙️', techs: ['React', 'Prisma', 'tRPC'] },
  { title: 'Portfolio Website', desc: 'Cinematic developer portfolio with animations', tag: 'Production Grade', color: '#ec4899', icon: '✨', techs: ['Next.js', 'Framer Motion', 'Vercel'] },
  { title: 'Automation Tool', desc: 'AI-powered workflow automation with integrations', tag: 'Team-Based Project', color: '#8b5cf6', icon: '⚡', techs: ['n8n', 'Python', 'Zapier APIs'] },
  { title: 'Design System', desc: 'Complete component library with docs & Storybook', tag: 'Industry-Level', color: '#06b6d4', icon: '🎨', techs: ['Figma', 'React', 'Storybook'] },
  { title: 'E-Commerce App', desc: 'Full-stack store with payments, inventory & analytics', tag: 'Production Grade', color: '#6366f1', icon: '🛒', techs: ['Next.js', 'Stripe', 'Prisma'] },
]

const TAG_COLORS: Record<string, string> = {
  'Production Grade': '#10b981',
  'Industry-Level': '#6366f1',
  'Team-Based Project': '#f59e0b',
  'Real Client Simulation': '#ec4899',
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.06),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">Real-World Projects</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Ship projects that <span className="gradient-text">actually matter</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            Every project is production-grade, team-built, and deployed live — giving you the experience recruiters actually look for.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Glow bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${project.color}15, transparent 60%)` }} />
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                    {project.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${TAG_COLORS[project.tag]}15`, color: TAG_COLORS[project.tag], border: `1px solid ${TAG_COLORS[project.tag]}40` }}>
                    {project.tag}
                  </span>
                </div>

                {/* Mock browser frame */}
                <div className="glass rounded-xl overflow-hidden mb-4 border border-white/[0.04] group-hover:border-white/[0.08] transition-all">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04] bg-white/[0.02]">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    <div className="flex-1 mx-2 bg-white/[0.04] rounded h-3.5 flex items-center px-2">
                      <span className="text-[8px] text-[#475569] font-mono truncate">localhost:3000/{project.title.toLowerCase().replace(/ /g, '-')}</span>
                    </div>
                  </div>
                  <div className="h-24 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${project.color}08, ${project.color}04)` }}>
                    <span className="text-4xl opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300">{project.icon}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">{project.title}</h3>
                <p className="text-xs text-[#94a3b8] mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techs.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#64748b]">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
