"use client"

import { motion } from "framer-motion"
import { portfolioData } from "../data/portfolio"

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
}

const categories = [
  { key: "frontend" as const, label: "Frontend",  accent: "#00ddff", dim: "rgba(0,221,240,0.08)"   },
  { key: "backend"  as const, label: "Backend",   accent: "#7c6fff", dim: "rgba(124,111,255,0.08)" },
  { key: "devops"   as const, label: "DevOps",    accent: "#00ddff", dim: "rgba(0,221,240,0.08)"   },
]

export default function TechSection() {
  return (
    <section id="skills" style={{ background: "#07090f", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(124,111,255,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.62rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            <div style={{ width: 18, height: 1, background: "#00ddff" }} /> Technical Skills
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "#dfe4ed" }}>
            Tools I{" "}<span style={{ WebkitTextStroke: "1.5px #7c6fff", color: "transparent" }}>Build With</span>
          </h2>
        </motion.div>

        {/* Skill categories */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)", marginBottom: "1px" }}>
          {categories.map(({ key, label, accent, dim }) => (
            <motion.div key={key} variants={fadeUp}
              style={{ background: "#07090f", padding: "2.5rem" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}</div>
              <div style={{ width: 24, height: 2, background: accent, marginBottom: "1.8rem", boxShadow: `0 0 8px ${accent}` }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {portfolioData.skills[key].map((skill, i) => (
                  <span key={i}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.background = dim; (e.currentTarget as HTMLSpanElement).style.borderColor = accent; (e.currentTarget as HTMLSpanElement).style.color = accent }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.background = "transparent"; (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLSpanElement).style.color = "#8494ae" }}
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#8494ae", border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem 0.75rem", letterSpacing: "0.04em", cursor: "default", transition: "all 0.2s" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Strength banner */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
          style={{ background: "rgba(255,255,255,0.015)", padding: "2.5rem", borderLeft: "2px solid #00ddff", display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ width: 2, height: 40, background: "linear-gradient(to bottom, #00ddff, #7c6fff)", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>My Strength</div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", fontWeight: 700, color: "#dfe4ed", letterSpacing: "-0.01em" }}>
              Designing backend architecture and delivering complete working systems from scratch
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #skills { padding: 4rem 1.5rem !important; }
          #skills > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
