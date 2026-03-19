"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Float, ContactShadows, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { motion, Variants } from "framer-motion"
import gsap from "gsap"

function LightBeam({ active }: { active: boolean }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  useFrame(({ clock }) => {
    if (!matRef.current || !active) return
    matRef.current.opacity = 0.06 + Math.sin(clock.elapsedTime * 1.2) * 0.015
  })
  if (!active) return null
  return (
    <mesh position={[0, 3.5, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[1.1, 6, 32, 1, true]} />
      <meshBasicMaterial ref={matRef} color="#00ddff" transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function FloorGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.8) * 0.04)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(clock.elapsedTime * 1.8) * 0.04
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[1.0, 64]} />
      <meshBasicMaterial color="#00bbdd" transparent opacity={0.18} depthWrite={false} />
    </mesh>
  )
}

function AvatarModel() {
  const { scene, animations } = useGLTF("/models/avatar.glb")
  const mixer = useRef<THREE.AnimationMixer | null>(null)
  const ready = useRef(false)

  if (!ready.current) {
    ready.current = true
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.set(-center.x, -box.min.y, -center.z)
    scene.rotation.y = 0.15
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (!mesh.isMesh) return
      mesh.castShadow = true; mesh.receiveShadow = true
      const mat = mesh.material as THREE.MeshStandardMaterial
      if (mat?.map) { mat.map.colorSpace = THREE.SRGBColorSpace; mat.map.needsUpdate = true }
      if (mat) mat.needsUpdate = true
    })
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene)
      mixer.current.clipAction(animations[0]).play()
    }
  }

  useFrame((_, delta) => { mixer.current?.update(delta) })
  return <group><primitive object={scene} /></group>
}

function ParticleRing() {
  const ref = useRef<THREE.Points>(null)
  const positions = useRef((() => {
    const count = 90; const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2; const r = 1.7 + Math.random() * 0.25
      arr[i*3] = Math.cos(a)*r; arr[i*3+1] = 0.02; arr[i*3+2] = Math.sin(a)*r
    }
    return arr
  })())
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.35
    ;(ref.current.material as THREE.PointsMaterial).opacity = 0.35 + Math.sin(clock.elapsedTime * 2.2) * 0.15
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions.current, 3]} /></bufferGeometry>
      <pointsMaterial color="#00ccee" size={0.022} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Scene({ beamReady }: { beamReady: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]}  intensity={1.8} color="#cce8ff" castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={0.6} color="#7c6fff" />
      <directionalLight position={[0, 3, -5]}  intensity={0.6} color="#00ddff" />
      <spotLight position={[0, 7, 0]} intensity={beamReady ? 6 : 0} color="#00ddff" angle={0.18} penumbra={0.7} distance={12} castShadow />
      <pointLight position={[0, 1, 1.5]} intensity={1.2} color="#00bbdd" distance={6} />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        <AvatarModel />
      </Float>
      <LightBeam active={beamReady} />
      <FloorGlow />
      <ParticleRing />
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={4} blur={2.5} color="#001a22" />
      <OrbitControls enableZoom={false} enablePan={false}
        target={[0, 0.9, 0]}
        minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4} maxAzimuthAngle={Math.PI / 4} />
    </>
  )
}

function WordSlide({ text, from, delay = 0, className = "" }: { text: string; from: "left"|"right"; delay?: number; className?: string }) {
  const words = text.split(" ")
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }
  const word: Variants = {
    hidden: { x: from === "left" ? -120 : 120, opacity: 0 },
    show:   { x: 0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  }
  return (
    <motion.div className={className} variants={container} initial="hidden" animate="show"
      style={{ display: "flex", flexWrap: "wrap", gap: "0.22em", overflow: "hidden" }}>
      {words.map((w, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.span variants={word} style={{ display: "block" }}>{w}</motion.span>
        </div>
      ))}
    </motion.div>
  )
}

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const [beamReady, setBeamReady] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (el) {
      gsap.timeline({ delay: 1.4 }).fromTo(el,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power3.out" }
      )
    }
    const t = setTimeout(() => setBeamReady(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{
      position: "relative",
      minHeight: "100svh",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      overflow: "hidden",
      background: "#07090f",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(0,180,220,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(100,80,255,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* LEFT — NAME */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingRight: "3rem", paddingLeft: "5rem", position: "relative", zIndex: 2 }}>
        <WordSlide text="Ilayaraja" from="left" delay={0.3} className="hero-name-text" />
        <div ref={lineRef} style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, transparent, #00ddff)", marginTop: "0.4rem", transform: "scaleX(0)" }} />
        <motion.p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a5060", marginTop: "0.8rem", textAlign: "right" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}>
          Portfolio 2026
        </motion.p>
      </div>

      {/* CENTER — full viewport height canvas */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "min(500px, 44vw)",
        height: "100svh",  /* ← full screen height = never clips head or feet */
      }}>
        <Canvas
          camera={{ position: [0, 1.8, 5.5], fov: 44 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, outputColorSpace: THREE.SRGBColorSpace }}
          shadows
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <Scene beamReady={beamReady} />
        </Canvas>
        <motion.p style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2a3a45", whiteSpace: "nowrap" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.6 }}>
          ↺ drag to rotate
        </motion.p>
      </div>

      {/* RIGHT — ROLE */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "3rem", paddingRight: "5rem", position: "relative", zIndex: 2, gap: "1.8rem" }}>
        <WordSlide text="Full Stack Developer" from="right" delay={0.5} className="hero-role-text" />
        <motion.div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          {["React · TypeScript", "Django · Python", "VPS · Nginx", "Three.js · GSAP"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#3a5060", letterSpacing: "0.06em" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00ddff", flexShrink: 0, boxShadow: "0 0 6px #00ddff" }} />
              {t}
            </div>
          ))}
        </motion.div>
        <motion.a href="#projects"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 1.6rem", background: "transparent", border: "1px solid rgba(0,221,240,0.3)", color: "#00ddff", fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ borderColor: "#00ddff", boxShadow: "0 0 20px rgba(0,221,240,0.15)" }}>
          View Work
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}>
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a4a5a" }}>scroll</span>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, #00ddff, transparent)", position: "relative", overflow: "hidden" }}>
          <motion.div style={{ position: "absolute", top: 0, width: "100%", height: "40%", background: "#00ddff", borderRadius: "1px" }}
            animate={{ y: ["0%", "250%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>

      <style>{`
        .hero-name-text { font-family: 'Syne', sans-serif !important; font-weight: 800; font-size: clamp(3rem, 5vw, 5.5rem); letter-spacing: -0.03em; line-height: 0.95; color: #dfe4ed; text-align: right; }
        .hero-role-text { font-family: 'Syne', sans-serif !important; font-weight: 700; font-size: clamp(1.4rem, 2.5vw, 2.2rem); letter-spacing: -0.02em; line-height: 1.1; background: linear-gradient(135deg, #00ddff 0%, #7c6fff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media (max-width: 900px) {
          section { grid-template-columns: 1fr !important; grid-template-rows: auto auto auto; padding: 5rem 1.5rem 3rem; gap: 1rem; }
          .hero-name-text { text-align: center !important; font-size: clamp(2.4rem, 10vw, 4rem) !important; }
          .hero-role-text { text-align: center; }
          section > div:first-of-type { padding: 0 !important; align-items: center !important; }
          section > div:last-of-type  { padding: 0 !important; align-items: center !important; }
        }
        @media (max-width: 480px) {
          .hero-name-text { font-size: clamp(2rem, 12vw, 3rem) !important; }
          .hero-role-text { font-size: clamp(1rem, 5vw, 1.4rem) !important; }
          section > div:nth-child(2) { width: 100vw !important; height: 60vw !important; min-height: 260px; }
        }
      `}</style>
    </section>
  )
}

useGLTF.preload("/models/avatar.glb")