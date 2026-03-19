"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import ProjectsSection from "./sections/ProjectsSection"
import TechSection from "./sections/TechSection"
import ContactSection from "./sections/ContactSection"

// 3D sections MUST be loaded client-side only — Three.js has no SSR support
const HeroSection  = dynamic(() => import("./sections/HeroSection"),  { ssr: false })
const AboutSection = dynamic(() => import("./sections/AboutSection"), { ssr: false })

function Loading() {
  return (
    <div style={{ minHeight: "100svh", background: "#07090f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#00ddff", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Loading...
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ background: "#07090f" }}>
      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <AboutSection />
      </Suspense>
      <ProjectsSection />
      <TechSection />
      <ContactSection />
    </main>
  )
}
