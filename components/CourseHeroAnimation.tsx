'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
  color: string
}

function StackBuilder({ color }: { color: string }) {
  const elements = ['{ }', '</>', '[ ]', '()', '=>']
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl font-mono opacity-20 font-bold"
          style={{
            color,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        >
          {elements[i % elements.length]}
        </motion.div>
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${color}15, transparent 70%)` }} />
    </div>
  )
}

function NeuralDataStream({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={`path-${i}`}
            d={`M${50 + i * 150},500 Q${200 + i * 50},200 ${800 + i * 100},${50 + i * 50}`}
            fill="none"
            stroke={`url(#grad-${color})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={100 + Math.random() * 800}
            cy={100 + Math.random() * 300}
            r={3 + Math.random() * 4}
            fill={color}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(circle, ${color}15, transparent 60%)` }} />
    </div>
  )
}

function CreativeCanvas({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-20"
          style={{
            background: color,
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: `${10 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 30, -30, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${color}10, transparent 70%)` }} />
    </div>
  )
}

function GrowthMetrics({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.polyline
          points="0,400 200,350 400,380 600,250 800,280 1000,150 1200,100"
          fill="none"
          stroke={color}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <motion.polyline
          points="0,500 200,450 400,480 600,350 800,380 1000,250 1200,200"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 1 }}
        />
        {[...Array(4)].map((_, i) => (
          <motion.circle
            key={i}
            cx={200 + i * 200}
            cy={350 - i * 50 + (i % 2 === 0 ? 0 : 30)}
            r="6"
            fill={color}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </svg>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${color}10, transparent 70%)` }} />
    </div>
  )
}

function DefaultHero({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${color}18, transparent 70%)` }} />
    </div>
  )
}

export default function CourseHeroAnimation({ slug, color }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${color}18, transparent 70%)` }} />
  }

  if (slug.includes('full-stack') || slug.includes('backend') || slug.includes('mern') || slug.includes('mean') || slug.includes('java')) {
    return <StackBuilder color={color} />
  }
  
  if (slug.includes('ai') || slug.includes('python') || slug.includes('data') || slug.includes('automation')) {
    return <NeuralDataStream color={color} />
  }

  if (slug.includes('design') || slug.includes('video') || slug.includes('photo')) {
    return <CreativeCanvas color={color} />
  }

  if (slug.includes('marketing') || slug.includes('sales') || slug.includes('freelancing')) {
    return <GrowthMetrics color={color} />
  }

  return <DefaultHero color={color} />
}
