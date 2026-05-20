'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '916394753801'

const COURSES = [
  'Full Stack Development',
  'AI & Machine Learning',
  'Data Science',
  'UI/UX Design',
  'DevOps Engineering',
  'Cloud Computing',
]

const BOOT_SEQUENCE = [
  { text: 'placemate init --interactive', color: '#06b6d4', prefix: '❯' },
  { text: 'Installing dependencies...', color: '#64748b', prefix: '⠋' },
  { text: 'Compiling modules...', color: '#64748b', prefix: '⠙' },
  { text: 'Connection established ✓', color: '#10b981', prefix: '✓' },
]

type LineType = 'boot' | 'prompt' | 'input' | 'error' | 'success' | 'info' | 'options' | 'divider' | 'progress'

type TerminalLine = {
  type: LineType
  text: string
  color?: string
  prefix?: string
}

type FormStep = 'boot' | 'name' | 'email' | 'phone' | 'course' | 'confirm' | 'done'

const STEP_LABELS = ['Name', 'Email', 'Phone', 'Course', 'Send']
const STEP_KEYS: FormStep[] = ['name', 'email', 'phone', 'course', 'confirm']

export default function TerminalContactForm() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [step, setStep] = useState<FormStep>('boot')
  const [input, setInput] = useState('')
  const [bootIdx, setBootIdx] = useState(0)
  const [typing, setTyping] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '' })
  const [focused, setFocused] = useState(false)
  const [activated, setActivated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentStepIndex = STEP_KEYS.indexOf(step as any)
  const progressPercent = step === 'done' ? 100 : Math.max(0, (currentStepIndex / STEP_KEYS.length) * 100)

  // Auto-scroll
  useEffect(() => {
    scrollRef.current && (scrollRef.current.scrollTop = scrollRef.current.scrollHeight)
  }, [lines, typingText, input])

  // Auto-refocus: once user has clicked, keep focus persistent across all steps
  useEffect(() => {
    if (activated && step !== 'done') {
      // Small delay to ensure the DOM has updated after step change
      const t = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(t)
    }
  }, [step, typing, activated])

  // Typewriter
  const typePrompt = useCallback((text: string, cb: () => void) => {
    setTyping(true)
    setTypingText('')
    let i = 0
    const iv = setInterval(() => {
      setTypingText(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(iv); setTyping(false); setTypingText(''); cb() }
    }, 25)
    return () => clearInterval(iv)
  }, [])

  // Boot
  useEffect(() => {
    if (step !== 'boot') return
    if (bootIdx >= BOOT_SEQUENCE.length) {
      setTimeout(() => {
        setLines(p => [...p, { type: 'divider', text: '─'.repeat(40), color: '#1e293b' }])
        setStep('name')
      }, 500)
      return
    }
    const t = setTimeout(() => {
      const b = BOOT_SEQUENCE[bootIdx]
      setLines(p => [...p, { type: 'boot', text: b.text, color: b.color, prefix: b.prefix }])
      setBootIdx(i => i + 1)
    }, bootIdx === 0 ? 400 : 600)
    return () => clearTimeout(t)
  }, [bootIdx, step])

  // Step prompts
  useEffect(() => {
    if (step === 'boot' || step === 'done') return
    const prompts: Record<string, string> = {
      name: 'Enter your full name',
      email: 'Enter your email address',
      phone: 'Enter phone number (+91...)',
      course: 'Select a course [1-6]',
      confirm: 'Send enquiry via WhatsApp? [Y/n]',
    }
    const p = prompts[step]
    if (!p) return
    return typePrompt(p, () => {
      setLines(prev => [...prev, { type: 'prompt', text: p, color: '#c4b5fd' }])
      if (step === 'course') {
        COURSES.forEach((c, i) => {
          setLines(prev => [...prev, { type: 'options', text: `  ${i + 1}. ${c}`, color: '#64748b' }])
        })
      }
    })
  }, [step, typePrompt])

  // Submit
  const submit = useCallback(() => {
    const msg = [
      `🎓 *New Enquiry — PlaceMate*`, '',
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📞 *Phone:* ${form.phone}`,
      `📚 *Course:* ${form.course}`,
    ].join('\n')
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    }, 2200)
  }, [form])

  // Process input
  const process = useCallback((val: string) => {
    const v = val.trim()
    if (!v) return
    setLines(p => [...p, { type: 'input', text: v, color: '#38bdf8' }])
    setInput('')

    switch (step) {
      case 'name':
        if (v.length < 2) { setLines(p => [...p, { type: 'error', text: 'Error: Name too short (min 2 chars)', color: '#f87171' }]); return }
        setForm(p => ({ ...p, name: v }))
        setLines(p => [...p, { type: 'success', text: `Welcome, ${v}! 👋`, color: '#34d399' }])
        setTimeout(() => setStep('email'), 500)
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setLines(p => [...p, { type: 'error', text: 'Error: Invalid email format', color: '#f87171' }]); return }
        setForm(p => ({ ...p, email: v }))
        setLines(p => [...p, { type: 'success', text: 'Email verified ✓', color: '#34d399' }])
        setTimeout(() => setStep('phone'), 500)
        break
      case 'phone':
        if (!/^[+]?[\d\s-]{7,15}$/.test(v)) { setLines(p => [...p, { type: 'error', text: 'Error: Invalid phone number', color: '#f87171' }]); return }
        setForm(p => ({ ...p, phone: v }))
        setLines(p => [...p, { type: 'success', text: 'Phone saved ✓', color: '#34d399' }])
        setTimeout(() => setStep('course'), 500)
        break
      case 'course': {
        const n = parseInt(v)
        if (isNaN(n) || n < 1 || n > 6) { setLines(p => [...p, { type: 'error', text: `Error: Pick 1-${COURSES.length}`, color: '#f87171' }]); return }
        const c = COURSES[n - 1]
        setForm(p => ({ ...p, course: c }))
        setLines(p => [...p, { type: 'success', text: `Selected: ${c} ✓`, color: '#34d399' }])
        setTimeout(() => setStep('confirm'), 500)
        break
      }
      case 'confirm': {
        const a = v.toLowerCase()
        if (a === 'y' || a === 'yes' || a === '') {
          setLines(p => [...p,
            { type: 'divider', text: '─'.repeat(40), color: '#1e293b' },
            { type: 'success', text: '🚀 Sending to WhatsApp...', color: '#34d399' },
            { type: 'progress', text: '████████████████████ 100%', color: '#10b981' },
            { type: 'success', text: '✓ Message delivered! Redirecting...', color: '#34d399' },
          ])
          setStep('done')
          submit()
        } else if (a === 'n' || a === 'no') {
          setLines(p => [...p, { type: 'info', text: '↻ Restarting...', color: '#fbbf24' }])
          setTimeout(() => { setLines([]); setForm({ name: '', email: '', phone: '', course: '' }); setBootIdx(0); setStep('boot') }, 700)
        } else {
          setLines(p => [...p, { type: 'error', text: 'Error: Type Y or N', color: '#f87171' }])
        }
        break
      }
    }
  }, [step, submit])

  const active = !typing && step !== 'boot' && step !== 'done'
  const canType = step !== 'done'

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 cursor-text group ${
        focused ? 'shadow-[0_0_60px_rgba(99,102,241,0.15),0_0_120px_rgba(139,92,246,0.05)]' : ''
      }`}
      onClick={() => { inputRef.current?.focus(); setFocused(true); setActivated(true) }}
      style={{ background: 'linear-gradient(145deg, rgba(15,15,30,0.95), rgba(8,8,20,0.98))' }}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), transparent 40%, transparent 60%, rgba(139,92,246,0.2))', padding: '1px' }}
      />

      {/* Header bar — macOS style but modern */}
      <div className="relative px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
        </div>

        {/* Tab pill */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <svg className="w-3 h-3 text-[#6366f1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] text-[#94a3b8] font-medium tracking-wide">placemate — enquiry</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[10px] text-[#10b981] font-medium">online</span>
        </div>
      </div>

      {/* Step progress bar */}
      <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center gap-2">
        {STEP_LABELS.map((label, i) => {
          const isCompleted = currentStepIndex > i || step === 'done'
          const isCurrent = currentStepIndex === i
          return (
            <div key={label} className="flex items-center gap-1.5 flex-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-500 ${
                isCompleted ? 'bg-[#10b981] text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' :
                isCurrent ? 'bg-[#6366f1] text-white shadow-[0_0_12px_rgba(99,102,241,0.5)] ring-2 ring-[#6366f1]/30' :
                'bg-white/[0.04] text-[#475569] border border-white/[0.08]'
              }`}>
                {isCompleted ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block transition-colors ${
                isCompleted ? 'text-[#10b981]' : isCurrent ? 'text-white' : 'text-[#475569]'
              }`}>{label}</span>
              {i < STEP_LABELS.length - 1 && (
                <div className={`flex-1 h-px transition-colors duration-500 ${isCompleted ? 'bg-[#10b981]/40' : 'bg-white/[0.06]'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Micro progress bar */}
      <div className="h-0.5 bg-white/[0.02] relative overflow-hidden">
        <motion.div
          className="h-full rounded-r-full"
          style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Terminal body */}
      <div ref={scrollRef} className="px-4 py-3 space-y-1.5 min-h-[160px] max-h-[200px] overflow-y-auto scrollbar-thin font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            {/* Line prefix/icon */}
            {line.type === 'boot' && (
              <span className="text-[#6366f1] shrink-0 w-4 text-center">{line.prefix}</span>
            )}
            {line.type === 'prompt' && (
              <span className="text-[#8b5cf6] shrink-0 w-4 text-center">?</span>
            )}
            {line.type === 'input' && (
              <span className="text-[#06b6d4] shrink-0 w-4 text-center">❯</span>
            )}
            {line.type === 'error' && (
              <span className="text-[#f87171] shrink-0 w-4 text-center">✗</span>
            )}
            {line.type === 'success' && (
              <span className="text-[#34d399] shrink-0 w-4 text-center">✓</span>
            )}
            {line.type === 'info' && (
              <span className="text-[#fbbf24] shrink-0 w-4 text-center">↻</span>
            )}
            {line.type === 'progress' && (
              <span className="shrink-0 w-4" />
            )}
            {line.type === 'options' && (
              <span className="shrink-0 w-4" />
            )}

            {/* Line content */}
            {line.type === 'divider' ? (
              <div className="w-full h-px my-1" style={{ background: `linear-gradient(90deg, transparent, ${line.color}, transparent)` }} />
            ) : line.type === 'progress' ? (
              <div className="flex items-center gap-2 flex-1">
                <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)' }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-[10px] text-[#10b981] font-mono">100%</span>
              </div>
            ) : (
              <span style={{ color: line.color }}>{line.text}</span>
            )}
          </motion.div>
        ))}

        {/* Typing animation */}
        {typing && (
          <div className="flex items-center gap-2">
            <span className="text-[#8b5cf6] w-4 text-center">?</span>
            <span className="text-[#c4b5fd]">{typingText}</span>
            <span className="cursor-blink text-[#6366f1]">▎</span>
          </div>
        )}

        {/* Input line */}
        {active && !typing && (
          <div className="flex items-center gap-2">
            <span className="text-[#06b6d4] w-4 text-center">❯</span>
            <span className="text-[#e2e8f0]">{input}</span>
            <span className="cursor-blink text-[#6366f1] text-sm">▎</span>
          </div>
        )}

        {step === 'done' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-[11px] text-[#475569] mt-1">session ended — opening WhatsApp</motion.div>
        )}
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2 border-t border-white/[0.04] flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.01)' }}>
        {step !== 'boot' && step !== 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[10px] text-[#475569]"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#94a3b8] font-mono text-[9px]">Enter ↵</kbd>
            <span>to submit</span>
          </motion.div>
        )}
        {step === 'boot' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="text-[10px] text-[#475569] flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-[#6366f1] animate-pulse" />
            click to start
          </motion.div>
        )}
        <div className="ml-auto flex items-center gap-2 text-[10px] text-[#475569]">
          <span>zsh</span>
          <span className="w-px h-3 bg-white/[0.08]" />
          <span>utf-8</span>
        </div>
      </div>

      {/* Hidden input — never disabled so focus persists between steps */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => { if (active) setInput(e.target.value) }}
        onKeyDown={e => { if (e.key === 'Enter' && active) { e.preventDefault(); process(input) } }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          // If user activated the terminal, immediately re-grab focus
          if (activated && step !== 'done') {
            setTimeout(() => inputRef.current?.focus(), 10)
          } else {
            setFocused(false)
          }
        }}
        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent border-0 outline-none pointer-events-none text-base"
        tabIndex={0}
        aria-label="Terminal input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
      />
    </div>
  )
}
