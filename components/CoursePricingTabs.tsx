'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Briefcase, GraduationCap, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react'
import RazorpayModal from '@/components/RazorpayModal'

interface CoursePricingTabsProps {
  courseTitle: string
  courseColor?: string
}

type TabType = 'working-professional' | 'freshers-graduates'

interface PricingPlan {
  id: string
  duration: string
  title: string
  originalPrice: string
  price: string
  numericPrice: number
  discount: string
  emiText: string
  popular?: boolean
  popularBadge?: string
  description: string
  features: string[]
}

const WORKING_PROFESSIONAL_PLANS: PricingPlan[] = [
  {
    id: 'wp-1m',
    duration: '1 Month',
    title: '1 Month Intensive',
    originalPrice: '₹12,000',
    price: '₹6,000',
    numericPrice: 6000,
    discount: '50% OFF',
    emiText: '₹3,000/mo (0% EMI)',
    description: 'Fast-track upskilling for working professionals with live weekend & evening sessions.',
    features: [
      '1 Month Live Intensive Training',
      'Flexible Weekend & Evening Cohorts',
      '1-on-1 Mentor Doubt Resolution',
      'Live Industry Micro-Project',
      'Verified Certificate of Completion',
    ],
  },
  {
    id: 'wp-2m',
    duration: '2 Months',
    title: '2 Months Career Switch',
    originalPrice: '₹18,000',
    price: '₹9,000',
    numericPrice: 9000,
    discount: '50% OFF',
    emiText: '₹4,500/mo (0% EMI)',
    popular: true,
    popularBadge: 'MOST POPULAR',
    description: 'Complete career transition track with system architecture & placement referrals.',
    features: [
      '2 Months Advanced Live Training',
      'System Architecture & Microservices',
      'Dedicated Senior Industry Mentor',
      'Real Startup Production Project',
      'ATS Resume & LinkedIn Optimization',
      'Direct Placement Referrals to MNCs',
    ],
  },
]

const FRESHERS_GRADUATES_PLANS: PricingPlan[] = [
  {
    id: 'fg-3m',
    duration: '3 Months',
    title: '3 Months Foundation',
    originalPrice: '₹10,000',
    price: '₹5,000',
    numericPrice: 5000,
    discount: '50% OFF',
    emiText: '₹2,500/mo (0% EMI)',
    description: 'Ideal for 12th pass students & freshers building strong core technical skills.',
    features: [
      '3 Months Live Interactive Training',
      '100% Beginner Friendly (No Coding Required)',
      '3 Practical Capstone Projects',
      'Daily Standups & Doubt Support',
      'Course Completion Certificate',
    ],
  },
  {
    id: 'fg-6m',
    duration: '6 Months',
    title: '6 Months Job-Ready Track',
    originalPrice: '₹18,000',
    price: '₹9,000',
    numericPrice: 9000,
    discount: '50% OFF',
    emiText: '₹3,000/mo (0% EMI)',
    popular: true,
    popularBadge: 'RECOMMENDED',
    description: 'Complete career program featuring a guaranteed 2-month startup internship.',
    features: [
      '6 Months Complete Career Track',
      'Guaranteed 2-Month Startup Internship',
      '5+ Production-Grade Live Projects',
      'ATS Resume & Mock Interviews',
      'Direct Referrals to 80+ Partner MNCs',
    ],
  },
  {
    id: 'fg-9m',
    duration: '9 Months',
    title: '9 Months Specialization',
    originalPrice: '₹30,000',
    price: '₹15,000',
    numericPrice: 15000,
    discount: '50% OFF',
    emiText: '₹5,000/mo (0% EMI)',
    description: 'Deep-dive track with extended 3-month internship and AI tools integration.',
    features: [
      '9 Months Advanced Specialization',
      'Extended 3-Month Industry Internship',
      'Generative AI & System Tools',
      'Data Structures & Algorithm Prep',
      'Dedicated 1-on-1 Career Officer',
    ],
  },
  {
    id: 'fg-12m',
    duration: '12 Months',
    title: '12 Months Master Track',
    originalPrice: '₹40,000',
    price: '₹20,000',
    numericPrice: 20000,
    discount: '50% OFF',
    emiText: '₹5,000/mo (0% EMI)',
    description: 'Full 1-year zero-to-lead engineer masterclass with unlimited placement support.',
    features: [
      '12 Months Full End-to-End Masterclass',
      'Multiple Startup & Client Internships',
      'Full Stack + AI + Cloud Syllabus',
      '100% Unlimited Placement Support',
      'Lifetime Course Recording Access',
    ],
  },
]

export default function CoursePricingTabs({ courseTitle }: CoursePricingTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('working-professional')
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null)

  const currentPlans =
    activeTab === 'working-professional' ? WORKING_PROFESSIONAL_PLANS : FRESHERS_GRADUATES_PLANS

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlanForPayment(plan)
  }

  return (
    <section id="pricing" className="py-20 relative bg-[#F8FAFC] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#0B3C6D]/10 text-[#0B3C6D] text-xs font-bold uppercase tracking-wider mb-3">
            Program Durations & Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Choose Your <span className="gradient-text">Learning Track</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Select the cohort duration that fits your schedule and career goals. Instant Razorpay checkout available for all plans.
          </p>
        </div>

        {/* ULTRA-PRO SEGMENTED TAB CONTROL */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/80 shadow-inner">
            {/* Working Professional Button */}
            <button
              type="button"
              onClick={() => setActiveTab('working-professional')}
              style={{
                backgroundColor: activeTab === 'working-professional' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'working-professional' ? '#0B3C6D' : '#475569',
              }}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'working-professional'
                  ? 'shadow-lg shadow-slate-300/70 border border-slate-200'
                  : 'hover:text-slate-900'
              }`}
            >
              <Briefcase
                style={{ color: activeTab === 'working-professional' ? '#14B8A6' : '#64748B' }}
                className="w-4 h-4 shrink-0 stroke-[2.5]"
              />
              <span
                style={{ color: activeTab === 'working-professional' ? '#0B3C6D' : '#475569' }}
                className="font-extrabold"
              >
                Working Professional
              </span>
              <span
                style={{
                  backgroundColor: activeTab === 'working-professional' ? 'rgba(20, 184, 166, 0.12)' : 'rgba(203, 213, 225, 0.6)',
                  color: activeTab === 'working-professional' ? '#0B3C6D' : '#475569',
                }}
                className="ml-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border border-slate-200/60"
              >
                2 Plans
              </span>
            </button>

            {/* Freshers & Graduates Button */}
            <button
              type="button"
              onClick={() => setActiveTab('freshers-graduates')}
              style={{
                backgroundColor: activeTab === 'freshers-graduates' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'freshers-graduates' ? '#0B3C6D' : '#475569',
              }}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'freshers-graduates'
                  ? 'shadow-lg shadow-slate-300/70 border border-slate-200'
                  : 'hover:text-slate-900'
              }`}
            >
              <GraduationCap
                style={{ color: activeTab === 'freshers-graduates' ? '#F97316' : '#64748B' }}
                className="w-4 h-4 shrink-0 stroke-[2.5]"
              />
              <span
                style={{ color: activeTab === 'freshers-graduates' ? '#0B3C6D' : '#475569' }}
                className="font-extrabold"
              >
                Freshers & Graduates
              </span>
              <span
                style={{
                  backgroundColor: activeTab === 'freshers-graduates' ? 'rgba(249, 115, 22, 0.12)' : 'rgba(194, 65, 12, 0.9)',
                  color: activeTab === 'freshers-graduates' ? '#C2410C' : '#475569',
                }}
                className="ml-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border border-slate-200/60"
              >
                4 Plans
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={`grid gap-6 ${
              activeTab === 'working-professional'
                ? 'max-w-3xl mx-auto md:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {currentPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between relative ${
                  plan.popular
                    ? 'border-2 border-[#14B8A6] shadow-xl shadow-[#14B8A6]/10'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Internal Top Badge */}
                {plan.popular ? (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded bg-[#14B8A6] text-white text-[10px] font-extrabold uppercase tracking-wider">
                      {plan.popularBadge}
                    </span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                      STANDARD PLAN
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Description */}
                  <h3 className="text-lg font-extrabold text-[#0F172A] mb-1.5">{plan.title}</h3>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed min-h-[32px]">
                    {plan.description}
                  </p>

                  {/* Price Section */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-black text-[#0B3C6D]">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                        {plan.discount}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mb-1.5">
                      Total inclusive fee
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded border border-emerald-200/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{plan.emiText}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Razorpay Trigger Action Button */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  style={{
                    color: '#FFFFFF',
                    backgroundColor: plan.popular ? '#14B8A6' : '#0B3C6D',
                  }}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 hover:opacity-95 shadow-sm cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-white shrink-0" />
                  <span style={{ color: '#FFFFFF' }} className="font-bold">
                    Pay {plan.price} via Razorpay
                  </span>
                  <ArrowRight className="w-4 h-4 text-white shrink-0" />
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Razorpay Payment Modal */}
        {selectedPlanForPayment && (
          <RazorpayModal
            isOpen={!!selectedPlanForPayment}
            onClose={() => setSelectedPlanForPayment(null)}
            courseTitle={courseTitle}
            planTitle={selectedPlanForPayment.title}
            planDuration={selectedPlanForPayment.duration}
            numericPrice={selectedPlanForPayment.numericPrice}
            formattedPrice={selectedPlanForPayment.price}
          />
        )}

      </div>
    </section>
  )
}
