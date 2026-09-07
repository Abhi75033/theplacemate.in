'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, BarChart2, Briefcase, ChevronRight, Search, Sparkles, CheckCircle2, Award, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { COURSES, CourseData } from '@/lib/courses'

type TabType = 'working-professionals' | 'freshers-graduates'

export default function CoursesPageClient() {
  const [activeTab, setActiveTab] = useState<TabType>('working-professionals')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter courses based on active tab and search query
  const filteredCourses = COURSES.filter((course) => {
    const matchesTab = course.targetAudience.includes(activeTab)
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.techs.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-10">
      {/* Tab Controls */}
      <div className="flex flex-col items-center gap-6">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('working-professionals')}
            className={`relative px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-3 ${
              activeTab === 'working-professionals'
                ? 'text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'working-professionals' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-[#0B3C6D] rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xl sm:text-2xl">💼</span>
            <div className="relative z-10 text-left">
              <div className="font-bold leading-snug text-xs sm:text-sm">Working Professionals</div>
              <div className="text-[10px] sm:text-xs opacity-85 font-normal">Upskilling & Career Switch</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('freshers-graduates')}
            className={`relative px-5 py-3 sm:px-8 sm:py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-3 ${
              activeTab === 'freshers-graduates'
                ? 'text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'freshers-graduates' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-[#0B3C6D] rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xl sm:text-2xl">🎓</span>
            <div className="relative z-10 text-left">
              <div className="font-bold leading-snug text-xs sm:text-sm">Freshers & Graduates</div>
              <div className="text-[10px] sm:text-xs opacity-85 font-normal">For Students, 12th Pass & Grads</div>
            </div>
          </button>
        </div>

        {/* Tab Feature Highlights */}
        <AnimatePresence mode="wait">
          {activeTab === 'working-professionals' ? (
            <motion.div
              key="working-pro-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl glass rounded-2xl p-4 sm:p-6 border border-[#14B8A6]/20 bg-gradient-to-r from-[#14B8A6]/10 via-[#0B3C6D]/10 to-transparent"
            >
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#14B8A6]/20 flex items-center justify-center shrink-0 text-[#14B8A6]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Flexible Schedules</div>
                    <div className="text-[11px] text-slate-400">Weekend & Evening Live Batches</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#14B8A6]/20 flex items-center justify-center shrink-0 text-[#14B8A6]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">1:1 Mentorship</div>
                    <div className="text-[11px] text-slate-400">Domain Switch & Resume Prep</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#14B8A6]/20 flex items-center justify-center shrink-0 text-[#14B8A6]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">High Salary Growth</div>
                    <div className="text-[11px] text-slate-400">Target Top Product Companies</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="freshers-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl glass rounded-2xl p-4 sm:p-6 border border-[#F97316]/20 bg-gradient-to-r from-[#F97316]/10 via-[#0B3C6D]/10 to-transparent"
            >
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F97316]/20 flex items-center justify-center shrink-0 text-[#F97316]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Zero Coding/Degree Needed</div>
                    <div className="text-[11px] text-slate-400">12th Pass, Diploma & Any Graduate</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F97316]/20 flex items-center justify-center shrink-0 text-[#F97316]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Guaranteed Internship</div>
                    <div className="text-[11px] text-slate-400">Work on Real Partner Projects</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F97316]/20 flex items-center justify-center shrink-0 text-[#F97316]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Direct Placements</div>
                    <div className="text-[11px] text-slate-400">80+ Partner Companies Hiring</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mt-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search programs by name or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#14B8A6] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/[0.06] pb-4">
        <span>
          Showing <strong className="text-white font-semibold">{filteredCourses.length}</strong> programs for{' '}
          <strong className="text-[#14B8A6] font-semibold">
            {activeTab === 'working-professionals' ? 'Working Professionals' : 'Freshers & Graduates'}
          </strong>
        </span>
        {searchQuery && <span>Filtered by "{searchQuery}"</span>}
      </div>

      {/* Programs Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass rounded-2xl border border-white/[0.06]">
          <p className="text-slate-400 text-sm">No programs match your search query in this category.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs text-[#14B8A6] underline hover:text-white"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  )
}

function CourseCard({ course, index }: { course: CourseData; index: number }) {
  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        className="relative glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.2] transition-all duration-500 cursor-pointer overflow-hidden card-hover h-full flex flex-col justify-between"
      >
        {/* Glow effect */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${course.color}, transparent)` }}
        />

        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: `${course.color}20`, border: `1px solid ${course.color}30` }}
            >
              {course.icon}
            </div>
            <div className="flex flex-col items-end gap-1">
              {course.badge && (
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-1"
                  style={{
                    color: course.color,
                    borderColor: `${course.color}40`,
                    background: `${course.color}15`,
                  }}
                >
                  {course.badge}
                </span>
              )}
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <BarChart2 className="w-3 h-3" />
                {course.level}
              </div>
            </div>
          </div>

          {/* Title & Short Description */}
          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-white transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">{course.shortDesc}</p>

          {/* Audience Highlight Pill */}
          {course.audienceHighlight && (
            <div className="mb-4 bg-white/[0.03] border border-white/[0.05] rounded-lg p-2 flex items-start gap-1.5 text-[11px] text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{course.audienceHighlight}</span>
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.techs.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                style={{
                  color: course.color,
                  borderColor: `${course.color}30`,
                  background: `${course.color}08`,
                }}
              >
                {tech}
              </span>
            ))}
            {course.techs.length > 4 && (
              <span className="text-[10px] text-slate-400 px-1.5 py-0.5">
                +{course.techs.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div>
          <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 mb-4 border border-white/[0.04]">
            <Briefcase className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
            <span className="text-[10px] text-slate-400 truncate">{course.internship}</span>
          </div>

          <div
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-white/[0.08] group-hover:border-opacity-60 transition-all duration-300"
            style={{ color: course.color }}
          >
            View Program Details
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
