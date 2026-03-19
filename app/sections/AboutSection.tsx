"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"
import { portfolioData } from "../data/portfolio"

/* ─────────────────────────────────────────────
   ABOUT AVATAR
   Loads avatar1.glb — different file from hero so no GLB cache conflict
───────────────────────────────────────────── */
function AboutAvatar() {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/avatar1.glb")
  const { actions } = useAnimations(animations, group)
  const ready = useRef(false)
  const animStarted = useRef(false)

  // Setup once — ref guard prevents re-runs
  if (!ready.current) {
    ready.current = true

    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())

    // Feet at y=0, centered x/z
    scene.position.set(-center.x, -box.min.y, -center.z)
    scene.rotation.y = -0.25

    scene.traverse((child: any) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        child.material.envMapIntensity = 1.2
        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace
          child.material.map.needsUpdate = true
        }
        child.material.needsUpdate = true
      }
    })
  }

  // Start animation as soon as actions are ready — also guarded
  if (actions && !animStarted.current) {
    const keys = Object.keys(actions)
    if (keys.length > 0) {
      animStarted.current = true
      // Try common animation names, fallback to first available
      const anim =
        actions["idle"] ||
        actions["Idle"] ||
        actions["Armature|mixamo.com|Layer0"] ||
        actions["mixamo.com"] ||
        actions[keys[0]]
      if (anim) {
        anim.reset()
        anim.fadeIn(0.3)
        anim.play()
      }
    }
  }

  useFrame(({ clock }) => {
    if (!group.current) return
    // Gentle sway — feels alive without being distracting
    group.current.rotation.y = -0.25 + Math.sin(clock.elapsedTime * 0.5) * 0.08
    group.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.04
  })

  return <group ref={group}><primitive object={scene} /></group>
}

function FloorGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(clock.elapsedTime * 1.4) * 0.05
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[0.9, 64]} />
      <meshBasicMaterial color="#00bbdd" transparent opacity={0.15} depthWrite={false} />
    </mesh>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
}

function StatCard({ val, label }: { val: string; label: string }) {
  return (
    <div style={{ padding: "1.4rem 1.8rem", background: "rgba(0,221,240,0.04)", border: "1px solid rgba(0,221,240,0.15)", borderTop: "2px solid #00ddff", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "#00ddff", letterSpacing: "-0.03em", lineHeight: 1 }}>{val}</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#3a5060", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
    </div>
  )
}

function ListItem({ text, accent = "#00ddff" }: { text: string; accent?: string }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#8494ae", lineHeight: 1.8 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}`, flexShrink: 0, marginTop: "0.5rem" }} />
      {text}
    </li>
  )
}

function ServiceCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <motion.div variants={fadeUp} transition={{ delay: 0.1 * index }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,221,240,0.4)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)" }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)" }}
      style={{ padding: "1.6rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s, transform 0.3s" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>{String(index + 1).padStart(2, "0")}</div>
      <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#dfe4ed", marginBottom: "0.5rem" }}>{title}</h4>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.74rem", color: "#5a6478", lineHeight: 1.85 }}>{description}</p>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" style={{ background: "#07090f", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "7rem 5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,180,220,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.62rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            <div style={{ width: 18, height: 1, background: "#00ddff" }} /> About me
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05, color: "#dfe4ed" }}>
            Who I Am &{" "}<span style={{ WebkitTextStroke: "1.5px #00ddff", color: "transparent" }}>What I Build</span>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "4rem", alignItems: "center", marginBottom: "5rem" }}>

          {/* LEFT — text content */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p variants={fadeUp} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#8494ae", lineHeight: 2, marginBottom: "2.5rem", maxWidth: 560 }}>
              {portfolioData.about.description}
            </motion.p>
            <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
              <StatCard val="3+"  label="Production apps" />
              <StatCard val="15d" label="Fastest build" />
              <StatCard val="VPS" label="Self deployed" />
            </motion.div>
            <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <motion.div variants={fadeUp}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#00ddff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(0,221,240,0.15)" }}>What I Build</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <ListItem text="Multi-tenant ERP systems" />
                  <ListItem text="Business automation tools" />
                  <ListItem text="Custom admin dashboards" />
                  <ListItem text="Full-stack web applications" />
                </ul>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#7c6fff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem", paddingBottom: "0.6rem", borderBottom: "1px solid rgba(124,111,255,0.15)" }}>My Approach</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <ListItem text="Architecture before UI" accent="#7c6fff" />
                  <ListItem text="Clean, maintainable code" accent="#7c6fff" />
                  <ListItem text="End-to-end ownership" accent="#7c6fff" />
                  <ListItem text="Fast without cutting corners" accent="#7c6fff" />
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D character, full height */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", height: 620 }}>

            <div style={{ position: "absolute", inset: "10%", background: "radial-gradient(ellipse, rgba(0,180,220,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

            <Canvas
              camera={{ position: [0, 0.9, 6.5], fov: 32 }}
              gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, outputColorSpace: THREE.SRGBColorSpace }}
              style={{ background: "transparent", width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 3]}  intensity={2.0} color="#cce8ff" castShadow />
              <directionalLight position={[-3, 3, -1]} intensity={0.8} color="#7c6fff" />
              <directionalLight position={[0, 4, -4]}  intensity={0.6} color="#00ddff" />
              <spotLight position={[0, 6, 0]} intensity={4} color="#00ddff" angle={0.2} penumbra={0.8} distance={10} />
              <Environment preset="city" background={false} />
              <Suspense fallback={null}>
                <AboutAvatar />
              </Suspense>
              <FloorGlow />
            </Canvas>

            <div style={{ position: "absolute", bottom: "0.5rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "#2a3a45", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Ilayaraja · Full Stack Dev
            </div>
          </motion.div>
        </div>

        {/* Services */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
          <motion.div variants={fadeUp} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.62rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              <div style={{ width: 18, height: 1, background: "#00ddff" }} /> Services
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#dfe4ed" }}>What I Offer</h3>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
            {portfolioData.services.map((service, idx) => (
              <ServiceCard key={idx} title={service.title} description={service.description} index={idx} />
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #about { padding: 4rem 1.5rem !important; }
          #about > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
          #about > div > div:nth-child(3) > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}

useGLTF.preload("/models/avatar1.glb")