'use client'

import { motion } from 'framer-motion'

const COMMUNITY_EVENTS = [
  { icon: '⚡', title: 'Weekly Hackathons', desc: '48-hour builds with prizes and mentor judging', color: '#6366f1' },
  { icon: '🎙️', title: 'Live Sessions', desc: 'Industry guests, AMAs, and deep-dive workshops', color: '#8b5cf6' },
  { icon: '🧠', title: 'AI Workshops', desc: 'Cutting-edge AI tools and techniques every week', color: '#06b6d4' },
  { icon: '🎨', title: 'Design Battles', desc: 'UI challenges judged by professional designers', color: '#ec4899' },
  { icon: '💻', title: 'Coding Challenges', desc: 'Daily DSA and competitive programming sprints', color: '#10b981' },
  { icon: '🤝', title: 'Networking Events', desc: 'Connect with alumni, mentors, and hiring partners', color: '#f59e0b' },
]

const ACTIVITY_FEED = [
  { user: 'Aarav S.', action: 'deployed AI chatbot to production', time: '2m ago', icon: '🚀' },
  { user: 'Preethi R.', action: 'submitted UI design challenge — 92 points', time: '8m ago', icon: '🎨' },
  { user: 'Karan M.', action: 'merged PR: RAG pipeline with Pinecone', time: '15m ago', icon: '✅' },
  { user: 'Simran K.', action: 'joined #devops channel — Kubernetes deep dive', time: '22m ago', icon: '🐳' },
  { user: 'Rohan D.', action: 'won weekly hackathon — AI productivity tool', time: '1h ago', icon: '🏆' },
]

export default function CommunitySection() {
  return (
    <section id="community" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a12]" />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.07),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">Community</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Join a community that <span className="gradient-text">grows together</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            3,000+ learners on Discord. Hackathons every week. Live sessions with industry pros. You're never learning alone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Events grid */}
          <div className="grid grid-cols-2 gap-4">
            {COMMUNITY_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] card-hover transition-all duration-300 animated-border"
              >
                <div className="text-3xl mb-3">{event.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">{event.title}</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">{event.desc}</p>
                <div className="mt-3 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${event.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>

          {/* Right: Activity feed + Discord CTA */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            {/* Activity feed */}
            <div className="glass rounded-2xl p-5 border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-sm font-semibold text-white">Community Activity</span>
                </div>
                <span className="text-[10px] text-[#64748b]">Live Feed</span>
              </div>
              <div className="space-y-3">
                {ACTIVITY_FEED.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition-all"
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-white">{item.user} </span>
                      <span className="text-xs text-[#64748b]">{item.action}</span>
                    </div>
                    <span className="text-[9px] text-[#475569] shrink-0">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Discord + socials */}
            <div className="glass rounded-2xl p-5 border border-[#5865F2]/20 bg-[#5865F2]/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Join Discord Community</div>
                  <div className="text-xs text-[#94a3b8]">3,000+ learners · Always active</div>
                </div>
                <a href="#" className="ml-auto btn-primary text-xs py-2 px-4 relative z-10">
                  <span className="relative z-10">Join Free</span>
                </a>
              </div>
              <div className="flex gap-4 text-xs text-[#64748b] pt-3 border-t border-white/[0.04]">
                <span>📢 40+ channels</span>
                <span>🧵 Daily threads</span>
                <span>🎉 Weekly events</span>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { v: '3K+', l: 'Discord Members' },
                { v: '50+', l: 'Hackathons Hosted' },
                { v: '200+', l: 'Live Sessions' },
                { v: '1K+', l: 'Coding Challenges' },
              ].map((s, i) => (
                <div key={i} className="glass px-4 py-2.5 rounded-xl border border-white/[0.06] text-center flex-1">
                  <div className="text-base font-black gradient-text">{s.v}</div>
                  <div className="text-[9px] text-[#64748b]">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
