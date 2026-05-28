'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Star } from 'lucide-react'

const MENTORS = [
  {
    name: 'Arjun Mehta', role: 'Senior Full Stack Engineer', company: 'ex-Razorpay · ex-Flipkart',
    exp: '6 years', projects: 24, avatar: 'AM', color: '#6366f1',
    techs: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    bio: 'Shipped 20+ production apps. Led teams at Razorpay. Loves clean architecture and mentoring.',
  },
  {
    name: 'Priya Sharma', role: 'AI/ML Engineer', company: 'ex-Google · ex-Startups',
    exp: '5 years', projects: 18, avatar: 'PS', color: '#06b6d4',
    techs: ['Python', 'LangChain', 'OpenAI', 'RAG'],
    bio: 'Built AI products at Google. Specializes in LLMs, RAG pipelines, and production AI systems.',
  },
  {
    name: 'Kavya Nair', role: 'Lead UI/UX Designer', company: 'ex-Swiggy · Freelance',
    exp: '7 years', projects: 40, avatar: 'KN', color: '#ec4899',
    techs: ['Figma', 'Framer', 'Design Systems', 'Prototyping'],
    bio: 'Designed products used by millions. Expert in design systems, mobile UX, and SaaS interfaces.',
  },
  {
    name: 'Rohan Das', role: 'DevOps Architect', company: 'ex-Infosys · Tech Lead',
    exp: '8 years', projects: 32, avatar: 'RD', color: '#10b981',
    techs: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    bio: 'Built infra for 10M+ user apps. Expert in cloud-native deployments, CI/CD, and IaC.',
  },
  {
    name: 'Sneha Joshi', role: 'Graphic Designer & Brand Strategist', company: 'Creative Agency Owner',
    exp: '6 years', projects: 60, avatar: 'SJ', color: '#f59e0b',
    techs: ['Illustrator', 'Photoshop', 'Branding', 'Motion'],
    bio: 'Runs a 7-figure design agency. Mentors designers on portfolio building and client acquisition.',
  },
  {
    name: 'Vikram Singh', role: 'Backend Engineer & Architect', company: 'ex-Zomato · Staff Eng.',
    exp: '9 years', projects: 28, avatar: 'VS', color: '#8b5cf6',
    techs: ['Golang', 'Kafka', 'Redis', 'System Design'],
    bio: 'Staff engineer at Zomato. Expert in distributed systems, high-scale backends, and interviews.',
  },
]

export default function MentorsSection() {
  return (
    <section id="mentors" className="section-padding relative overflow-hidden">
      {/* Dynamic Person schemas for Mentors */}
      {MENTORS.map((mentor, i) => {
        const personSchema = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": mentor.name,
          "jobTitle": mentor.role,
          "worksFor": {
            "@type": "EducationalOrganization",
            "name": "PlaceMate",
            "url": "https://www.theplacemate.in"
          },
          "description": mentor.bio,
          "knowsAbout": mentor.techs,
          "sameAs": [
            `https://www.linkedin.com/in/${mentor.name.toLowerCase().replace(/ /g, '-')}`,
            `https://github.com/${mentor.name.toLowerCase().replace(/ /g, '-')}`
          ]
        };
        return (
          <script
            key={`mentor-schema-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
        );
      })}
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">Industry Mentors</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Learn from those who've <span className="gradient-text">already made it</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            Our mentors are working professionals with real industry experience — not just teachers. They bring the real world into every session.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS.map((mentor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.14] transition-all duration-400 overflow-hidden"
            >
              {/* Glow bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top, ${mentor.color}12, transparent 60%)` }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${mentor.color}, transparent)` }} />

              <div className="relative z-10">
                {/* Avatar + meta */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white transition-all duration-300 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${mentor.color}, ${mentor.color}88)`, boxShadow: `0 0 30px ${mentor.color}40` }}
                    >
                      {mentor.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#10b981] border-2 border-[#050508]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-white">{mentor.name}</div>
                    <div className="text-xs text-[#94a3b8] truncate">{mentor.role}</div>
                    <div className="text-[10px] text-[#64748b] mt-0.5">{mentor.company}</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">{mentor.bio}</p>

                {/* Stats */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 bg-white/[0.03] rounded-xl p-2.5 text-center border border-white/[0.04]">
                    <div className="text-base font-bold" style={{ color: mentor.color }}>{mentor.exp}</div>
                    <div className="text-[9px] text-[#64748b]">Experience</div>
                  </div>
                  <div className="flex-1 bg-white/[0.03] rounded-xl p-2.5 text-center border border-white/[0.04]">
                    <div className="text-base font-bold" style={{ color: mentor.color }}>{mentor.projects}+</div>
                    <div className="text-[9px] text-[#64748b]">Projects</div>
                  </div>
                  <div className="flex-1 bg-white/[0.03] rounded-xl p-2.5 text-center border border-white/[0.04]">
                    <div className="flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3" style={{ color: '#f59e0b' }} fill="#f59e0b" />
                      <span className="text-base font-bold text-[#f59e0b]">4.9</span>
                    </div>
                    <div className="text-[9px] text-[#64748b]">Rating</div>
                  </div>
                </div>

                {/* Techs */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.techs.map(t => (
                    <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border"
                      style={{ color: mentor.color, borderColor: `${mentor.color}40`, background: `${mentor.color}10` }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-[#94a3b8] bg-white/[0.03] border border-white/[0.06] hover:border-[#6366f1]/30 hover:text-white transition-all">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs text-[#94a3b8] bg-white/[0.03] border border-white/[0.06] hover:border-[#0077b5]/40 hover:text-white transition-all">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
