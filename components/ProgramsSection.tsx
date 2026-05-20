'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BarChart2, Briefcase, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PROGRAMS = [
  {
    slug: 'full-stack-web-development',
    icon: '⚛️',
    title: 'Full Stack Web Development',
    duration: '16 Weeks',
    level: 'Beginner → Advanced',
    color: '#6366f1',
    gradient: 'from-[#6366f1]/20 to-[#8b5cf6]/10',
    border: 'group-hover:border-[#6366f1]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]',
    techs: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    outcomes: ['Build 5+ production apps', 'Deploy on cloud', 'Pass FAANG-style interviews'],
    internship: 'Remote internship with startup partner',
  },
  {
    slug: 'generative-ai-engineering',
    icon: '🤖',
    title: 'Generative AI & AI Engineering',
    duration: '14 Weeks',
    level: 'Beginner → Advanced',
    color: '#06b6d4',
    gradient: 'from-[#06b6d4]/20 to-[#6366f1]/10',
    border: 'group-hover:border-[#06b6d4]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]',
    techs: ['Python', 'LangChain', 'OpenAI', 'RAG', 'Vector DBs'],
    outcomes: ['Build AI SaaS products', 'RAG pipelines', 'LLM fine-tuning'],
    internship: 'AI startup collaboration project',
  },
  {
    slug: 'graphic-designing',
    icon: '🎨',
    title: 'Graphic Designing',
    duration: '10 Weeks',
    level: 'Beginner → Pro',
    color: '#ec4899',
    gradient: 'from-[#ec4899]/20 to-[#8b5cf6]/10',
    border: 'group-hover:border-[#ec4899]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]',
    techs: ['Photoshop', 'Illustrator', 'Canva Pro', 'After Effects'],
    outcomes: ['Build design portfolio', 'Brand identity projects', 'Freelance-ready skills'],
    internship: 'Design studio internship',
  },
  {
    slug: 'ui-ux-design',
    icon: '🖥️',
    title: 'UI/UX Design',
    duration: '12 Weeks',
    level: 'Beginner → Advanced',
    color: '#f59e0b',
    gradient: 'from-[#f59e0b]/20 to-[#ec4899]/10',
    border: 'group-hover:border-[#f59e0b]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]',
    techs: ['Figma', 'Framer', 'Prototyping', 'Design Systems'],
    outcomes: ['Full product design', 'Design handoff', 'Case study portfolio'],
    internship: 'Product team internship',
  },
  {
    slug: 'backend-engineering',
    icon: '⚙️',
    title: 'Backend Engineering',
    duration: '14 Weeks',
    level: 'Intermediate',
    color: '#10b981',
    gradient: 'from-[#10b981]/20 to-[#06b6d4]/10',
    border: 'group-hover:border-[#10b981]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]',
    techs: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    outcomes: ['REST & GraphQL APIs', 'System design', 'Scalable architecture'],
    internship: 'Backend role at product company',
  },
  {
    slug: 'ai-automation',
    icon: '⚡',
    title: 'AI Automation',
    duration: '10 Weeks',
    level: 'Beginner → Advanced',
    color: '#8b5cf6',
    gradient: 'from-[#8b5cf6]/20 to-[#06b6d4]/10',
    border: 'group-hover:border-[#8b5cf6]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]',
    techs: ['n8n', 'Zapier', 'Python', 'Make.com', 'AI APIs'],
    outcomes: ['Build automation workflows', 'AI-powered tools', 'Client projects'],
    internship: 'Automation agency internship',
  },
  {
    slug: 'devops-deployment',
    icon: '🐳',
    title: 'DevOps & Deployment',
    duration: '12 Weeks',
    level: 'Intermediate',
    color: '#06b6d4',
    gradient: 'from-[#06b6d4]/20 to-[#10b981]/10',
    border: 'group-hover:border-[#06b6d4]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]',
    techs: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Terraform'],
    outcomes: ['CI/CD pipelines', 'Cloud deployment', 'Infrastructure as code'],
    internship: 'DevOps engineer role',
  },
  {
    slug: 'freelancing-accelerator',
    icon: '💰',
    title: 'Freelancing Accelerator',
    duration: '8 Weeks',
    level: 'All Levels',
    color: '#f59e0b',
    gradient: 'from-[#f59e0b]/20 to-[#ec4899]/10',
    border: 'group-hover:border-[#f59e0b]/50',
    glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]',
    techs: ['Portfolio Building', 'Client Pitching', 'Upwork', 'Fiverr', 'LinkedIn'],
    outcomes: ['Land first client', 'Build income pipeline', 'Scale freelance business'],
    internship: 'Real client project simulation',
  },
]

function ProgramCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/courses/${program.slug}`} className="block">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative glass rounded-2xl p-6 border border-white/[0.06] ${program.border} ${program.glow} transition-all duration-500 cursor-pointer overflow-hidden`}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

      {/* Glowing top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${program.color}, transparent)` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${program.color}20`, border: `1px solid ${program.color}30` }}
          >
            {program.icon}
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
              <Clock className="w-3 h-3" />
              {program.duration}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
              <BarChart2 className="w-3 h-3" />
              {program.level}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
          {program.title}
        </h3>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {program.techs.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
              style={{ color: program.color, borderColor: `${program.color}40`, background: `${program.color}10` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Outcomes */}
        <ul className="space-y-1.5 mb-4">
          {program.outcomes.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#94a3b8]">
              <span style={{ color: program.color }} className="mt-0.5 shrink-0">✓</span>
              {o}
            </li>
          ))}
        </ul>

        {/* Internship badge */}
        <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 mb-4 border border-white/[0.04]">
          <Briefcase className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
          <span className="text-[10px] text-[#94a3b8]">{program.internship}</span>
        </div>

        {/* CTA */}
        <div
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border"
          style={{
            background: hovered ? `${program.color}20` : 'transparent',
            borderColor: hovered ? `${program.color}60` : 'rgba(255,255,255,0.08)',
            color: hovered ? program.color : '#94a3b8',
          }}
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
    </Link>
  )
}

export default function ProgramsSection() {
  return (
    <section id="programs" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-flex">8 Industry Programs</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Choose your{' '}
            <span className="gradient-text">career path</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            Every program is built around real projects, industry mentors, and internship experience — not just theory.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={i} program={program} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2 relative z-10">
            <span className="relative z-10">View All Programs</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
