'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, BarChart2, Briefcase, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { COURSES, CourseData } from '@/lib/courses'

function ProgramCard({ program, index }: { program: CourseData; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/courses/${program.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.2] transition-all duration-500 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
      >
        {/* Background gradient on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ background: `radial-gradient(circle at top right, ${program.color}15, transparent 70%)` }}
        />

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
            {program.techs.slice(0, 5).map((tech) => (
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
            {program.outcomes.slice(0, 3).map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                <span style={{ color: program.color }} className="mt-0.5 shrink-0">✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10">
          {/* Internship badge */}
          <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 mb-4 border border-white/[0.04]">
            <Briefcase className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
            <span className="text-[10px] text-[#94a3b8] truncate">{program.internship}</span>
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
  const featuredPrograms = COURSES.slice(0, 8)

  return (
    <section id="programs" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(20,184,166,0.06),transparent_70%)]" />

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
            Choose your <span className="gradient-text">career path</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            Every program is built around real projects, industry mentors, and internship experience — not just theory.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredPrograms.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
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
