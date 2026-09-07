'use client'

import { motion } from 'framer-motion'

const AI_FEATURES = [
  { icon: '🧠', title: 'LLM Applications', desc: 'Build apps with GPT-4, Claude, Gemini & open-source models', color: '#14B8A6' },
  { icon: '🔍', title: 'RAG Systems', desc: 'Retrieval-Augmented Generation with vector databases', color: '#0B3C6D' },
  { icon: '🤖', title: 'AI Agents', desc: 'Autonomous agents with tool use and memory systems', color: '#F97316' },
  { icon: '⚡', title: 'Automation Workflows', desc: 'n8n, Zapier & custom AI automation pipelines', color: '#14B8A6' },
  { icon: '📊', title: 'AI SaaS Tools', desc: 'Production AI products with billing & multi-tenancy', color: '#0B3C6D' },
  { icon: '🗄️', title: 'Vector Databases', desc: 'Pinecone, Weaviate, Chroma for semantic search', color: '#F97316' },
]

const CODE_SNIPPET = `# Build an AI agent in minutes
from langchain import AgentExecutor
from langchain.tools import DuckDuckGoSearch

agent = AgentExecutor(
  llm=ChatOpenAI(model="gpt-4o"),
  tools=[DuckDuckGoSearch()],
  memory=ConversationBufferMemory()
)

response = agent.run(
  "Research & summarize latest AI trends"
)
print(response)  # 🚀 Production-ready`

export default function GenAISection() {
  return (
    <section id="genai" className="section-padding relative overflow-hidden bg-[#050508]">
      {/* Neural network bg */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_50%_20%,rgba(20,184,166,0.06),transparent_60%)]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(11,60,109,0.06),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(249,115,22,0.06),transparent_70%)] blur-2xl" />
        {/* Animated grid */}
        <div className="absolute inset-0 grid-overlay opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#14B8A6]/30 text-[#14B8A6] bg-[#14B8A6]/10 mb-4">
            🤖 Generative AI Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Build the future with <span className="gradient-text-cyan">AI engineering</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            Go beyond prompts. Build real AI products — agents, RAG systems, automation tools, and SaaS applications powered by LLMs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {AI_FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass rounded-xl p-4 border border-white/[0.06] hover:border-white/[0.12] transition-all card-hover"
                style={{ borderColor: `${feat.color}15` }}
              >
                <div className="text-2xl mb-2" style={{ filter: `drop-shadow(0 0 10px ${feat.color}80)` }}>{feat.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">{feat.title}</h3>
                <p className="text-[10px] text-[#64748b] leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: code snippet */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="glass rounded-2xl overflow-hidden border border-[#14B8A6]/20">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs text-[#475569] font-mono ml-2">ai_agent.py</span>
                <span className="ml-auto text-[10px] text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded-full font-mono">Python</span>
              </div>
              <pre className="p-5 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto">
                <code>
                  {CODE_SNIPPET.split('\n').map((line, i) => (
                    <div key={i} className={
                      line.startsWith('#') ? 'text-[#64748b]' :
                      line.includes('from ') || line.includes('import ') ? 'text-[#14B8A6]' :
                      line.includes('=') && !line.includes('==') ? 'text-[#0F172A]' :
                      line.includes('"') || line.includes("'") ? 'text-[#0B3C6D]' :
                      line.includes('print') || line.includes('agent.run') ? 'text-[#F97316]' :
                      line.includes('#') ? 'text-[#64748b]' : 'text-[#475569]'
                    }>{line}</div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Stack pills */}
            <div className="glass rounded-xl p-4 border border-white/[0.06]">
              <div className="text-xs font-semibold text-white mb-3">AI Tech Stack You'll Master</div>
              <div className="flex flex-wrap gap-2">
                {['OpenAI GPT-4o', 'LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'Hugging Face', 'Ollama', 'FastAPI', 'Streamlit', 'n8n'].map(t => (
                  <span key={t} className="text-[10px] px-2.5 py-1 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/20 transition-all cursor-default">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
