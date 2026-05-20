'use client'

import { motion } from 'framer-motion'

const KANBAN_COLUMNS = [
  {
    title: 'In Sprint', color: '#6366f1',
    tasks: [
      { label: 'feat: implement auth flow', type: 'PR', user: 'AS' },
      { label: 'Review: Payment gateway integration', type: 'Review', user: 'PK' },
    ],
  },
  {
    title: 'In Review', color: '#f59e0b',
    tasks: [
      { label: 'feat: RAG pipeline v2', type: 'PR', user: 'RJ' },
      { label: 'fix: mobile layout overflow', type: 'Bug', user: 'AS' },
    ],
  },
  {
    title: 'Done ✓', color: '#10b981',
    tasks: [
      { label: 'Deploy: production release', type: 'Deploy', user: 'PK' },
      { label: 'docs: API documentation', type: 'Docs', user: 'RJ' },
    ],
  },
]

const COMMITS = [
  { hash: 'a3f8c2d', msg: 'feat: implement AI chatbot with streaming responses', user: 'Aarav S.', time: '2m ago' },
  { hash: 'b7e1a9f', msg: 'fix: resolve CORS issues in production build', user: 'Priya K.', time: '15m ago' },
  { hash: 'c4d2b8e', msg: 'chore: upgrade dependencies & security patches', user: 'Rohan J.', time: '1h ago' },
  { hash: 'e9f3a1c', msg: 'feat: add vector database integration with Pinecone', user: 'Aarav S.', time: '2h ago' },
]

const STANDUPS = [
  { emoji: '☀️', name: 'Daily Standup', time: '10:00 AM', active: true },
  { emoji: '🔁', name: 'Sprint Retrospective', time: 'Friday 4PM', active: false },
  { emoji: '📋', name: 'Code Review Session', time: 'Tues 3PM', active: false },
  { emoji: '🎯', name: 'Mentor 1:1', time: 'Mon/Wed', active: false },
]

export default function InternshipSection() {
  return (
    <section id="internship" className="section-padding relative overflow-hidden bg-[#0a0a12]">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">Internship Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Experience real <span className="gradient-text">engineering culture</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            Work like you're already employed. Agile sprints, GitHub PRs, code reviews, and daily standups — from day one.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Kanban board */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-sm font-semibold text-white">Sprint Board — Week 8</span>
                </div>
                <span className="text-xs text-[#64748b] font-mono">4 tasks active</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {KANBAN_COLUMNS.map((col, ci) => (
                  <div key={ci}>
                    <div className="text-[10px] font-semibold mb-2 flex items-center gap-1.5" style={{ color: col.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
                      {col.title}
                    </div>
                    <div className="space-y-2">
                      {col.tasks.map((task, ti) => (
                        <div key={ti} className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.04] hover:border-white/[0.08] transition-all">
                          <div className="text-[9px] text-[#94a3b8] mb-1.5 leading-relaxed">{task.label}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: `${col.color}20`, color: col.color }}>{task.type}</span>
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-[6px] text-white font-bold">{task.user}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="glass rounded-2xl p-5 border border-white/[0.08]">
              <div className="text-sm font-semibold text-white mb-3">This Week's Schedule</div>
              <div className="space-y-2">
                {STANDUPS.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${s.active ? 'bg-[#6366f1]/10 border border-[#6366f1]/20' : 'bg-white/[0.02] border border-transparent'}`}>
                    <span className="text-lg">{s.emoji}</span>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-white">{s.name}</div>
                      <div className="text-[10px] text-[#64748b]">{s.time}</div>
                    </div>
                    {s.active && <span className="text-[9px] text-[#10b981] font-semibold bg-[#10b981]/10 px-2 py-0.5 rounded-full">Live</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Git commits + features */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">🔀</span>
                <span className="text-sm font-semibold text-white">Recent Commits</span>
                <span className="ml-auto text-xs text-[#64748b] font-mono">main branch</span>
              </div>
              <div className="space-y-3">
                {COMMITS.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-[#6366f1]/20 transition-all group"
                  >
                    <div className="w-6 h-6 rounded bg-[#6366f1]/20 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-[10px] text-[#6366f1]">⬡</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-[#a78bfa] mb-0.5">{c.hash}</div>
                      <div className="text-xs text-[#94a3b8] truncate">{c.msg}</div>
                      <div className="text-[10px] text-[#475569] mt-0.5">{c.user} · {c.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '👥', title: 'Team Collaboration', desc: '3-5 member squads on real projects' },
                { icon: '🧑‍💻', title: 'Mentor Feedback', desc: 'Daily async feedback from industry mentors' },
                { icon: '📝', title: 'Code Reviews', desc: 'PR reviews just like a real company' },
                { icon: '🏃', title: 'Agile Sprints', desc: '2-week sprint cycles with retrospectives' },
              ].map((f, i) => (
                <div key={i} className="glass rounded-xl p-4 border border-white/[0.06] hover:border-[#6366f1]/20 transition-all">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="text-xs font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-[10px] text-[#64748b]">{f.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
