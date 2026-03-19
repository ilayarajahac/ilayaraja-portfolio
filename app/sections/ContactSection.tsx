"use client"

import { motion } from "framer-motion"
import { portfolioData } from "../data/portfolio"

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
}

export default function ContactSection() {
  return (
    <section id="contact" style={{ background: "#07090f", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "0%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(0,180,220,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ marginBottom: "4rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.62rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            <div style={{ width: 18, height: 1, background: "#00ddff" }} /> Contact
            <div style={{ width: 18, height: 1, background: "#00ddff" }} />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "#dfe4ed", marginBottom: "1rem" }}>
            Let's Build{" "}<span style={{ WebkitTextStroke: "1.5px #00ddff", color: "transparent" }}>Something Together</span>
          </h2>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: "#8494ae", lineHeight: 1.9, maxWidth: 520, margin: "0 auto" }}>
            Open to new opportunities, interesting projects, or business software needs.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: "flex", justifyContent: "center", gap: "1px", background: "rgba(255,255,255,0.04)", marginBottom: "1px" }}>
          {[
            { label: "Email Me",  href: `mailto:${portfolioData.contact.email}`,  accent: "#00ddff" },
            { label: "GitHub",    href: portfolioData.contact.github,              accent: "#7c6fff" },
            { label: "LinkedIn",  href: portfolioData.contact.linkedin,            accent: "#00ddff" },
          ].map(({ label, href, accent }) => (
            <motion.a key={label} variants={fadeUp} href={href} target="_blank" rel="noopener noreferrer"
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${accent === "#00ddff" ? "0,221,240" : "124,111,255"},0.06)`; (e.currentTarget as HTMLAnchorElement).style.color = accent }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#07090f"; (e.currentTarget as HTMLAnchorElement).style.color = "#8494ae" }}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", padding: "2rem 1.5rem", background: "#07090f", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#8494ae", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.25s" }}>
              <div style={{ width: 2, height: 20, background: accent, boxShadow: `0 0 8px ${accent}`, marginBottom: "0.3rem" }} />
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Info cards */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)", marginBottom: "4rem" }}>
          {[
            { label: "Location",      value: "Available for remote work" },
            { label: "Response Time", value: "Usually within 24 hours"   },
            { label: "Availability",  value: "Open to new projects"       },
          ].map(({ label, value }) => (
            <motion.div key={label} variants={fadeUp}
              style={{ background: "#07090f", padding: "1.8rem 2rem" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#00ddff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#8494ae" }}>{value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ textAlign: "center", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#3a5060", letterSpacing: "0.1em" }}>
            © 2025 <span style={{ color: "#00ddff" }}>Ilayaraja</span> · Built with Next.js · Three.js · TypeScript
          </p>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact { padding: 4rem 1.5rem !important; }
          #contact > div > div:nth-child(3) { flex-direction: column !important; }
          #contact > div > div:nth-child(4) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
