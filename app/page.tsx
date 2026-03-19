"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const HeroSection     = dynamic(() => import("./sections/HeroSection"),     { ssr: false })
const AboutSection    = dynamic(() => import("./sections/AboutSection"),    { ssr: false })
const ProjectsSection = dynamic(() => import("./sections/ProjectsSection"), { ssr: false })
const TechSection     = dynamic(() => import("./sections/TechSection"),     { ssr: false })
const ContactSection  = dynamic(() => import("./sections/ContactSection"),  { ssr: false })

function Loading() {
  return (
    <div style={{ minHeight: "100svh", background: "#07090f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#00ddff", letterSpacing: "0.2em" }}>
        Loading...
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ background: "#07090f" }}>
      <Suspense fallback={<Loading />}><HeroSection /></Suspense>
      <Suspense fallback={<Loading />}><AboutSection /></Suspense>
      <Suspense fallback={<Loading />}><ProjectsSection /></Suspense>
      <Suspense fallback={<Loading />}><TechSection /></Suspense>
      <Suspense fallback={<Loading />}><ContactSection /></Suspense>
    </main>
  )
}
