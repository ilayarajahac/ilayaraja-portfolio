"use client"

import { motion } from "framer-motion"
import { portfolioData } from "../data/portfolio"

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
}

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ background: "#07090f", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(0,180,220,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(124,111,255,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.62rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            <div style={{ width: 18, height: 1, background: "#00ddff" }} /> Featured Projects
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "#dfe4ed" }}>
            Real Systems,{" "}<span style={{ WebkitTextStroke: "1.5px #00ddff", color: "transparent" }}>Real Businesses</span>
          </h2>
        </motion.div>

        {/* Projects */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
          {portfolioData.projects.map((project, idx) => (
            <motion.div key={project.id} variants={fadeUp}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,221,240,0.03)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.015)" }}
              style={{ background: "rgba(255,255,255,0.015)", padding: "2.5rem", transition: "background 0.3s" }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-start", gap: "1rem", marginBottom: "1.2rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#3a5060", letterSpacing: "0.15em" }}>{String(idx + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#00ddff", letterSpacing: "0.15em", textTransform: "uppercase" }}>{project.category}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 800, color: "#dfe4ed", letterSpacing: "-0.02em" }}>{project.title}</h3>
                </div>
                {project.timeline && (
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#00ddff", border: "1px solid rgba(0,221,240,0.25)", padding: "0.3rem 0.8rem", whiteSpace: "nowrap" }}>
                    Built in {project.timeline}
                  </div>
                )}
              </div>

              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#00ddff", lineHeight: 1.7, marginBottom: "0.8rem", maxWidth: 700 }}>
                <span style={{ color: "#3a5060" }}>Problem: </span>{project.problem}
              </p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: "#8494ae", lineHeight: 1.9, marginBottom: "1.8rem", maxWidth: 700 }}>
                <span style={{ color: "#3a5060" }}>Solution: </span>{project.description}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "1.8rem" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#3a5060", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Key Features</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {project.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#8494ae" }}>
                        <span style={{ color: "#00ddff", fontSize: "0.6rem" }}>✓</span>{f}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#3a5060", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>Tech Stack</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {project.tech.map((t, i) => (
                      <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#7c6fff", border: "1px solid rgba(124,111,255,0.25)", padding: "0.2rem 0.6rem", letterSpacing: "0.04em" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.2rem", borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", gap: "0.8rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#8494ae" }}>
                  <span style={{ color: "#3a5060" }}>Impact: </span>{project.impact}
                </div>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#7c6fff", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(124,111,255,0.3)", padding: "0.5rem 1.2rem" }}>
                    GitHub
                  </a>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#00ddff", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(0,221,240,0.3)", padding: "0.5rem 1.2rem" }}>
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #projects { padding: 4rem 1.5rem !important; }
        }
        @media (max-width: 480px) {
          #projects { padding: 3rem 1rem !important; }
          #projects > div > div:nth-child(3) > div > div:nth-child(4) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
