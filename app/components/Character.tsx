"use client"

import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useEffect } from "react"

function Avatar() {
  const { scene } = useGLTF("/models/avatar.glb")

  useEffect(() => {
    // Auto-center: measure the real bounding box
    const box    = new THREE.Box3().setFromObject(scene)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // Center X/Z, place feet at y=0
    scene.position.set(
      -center.x,
      -box.min.y,   // feet touch y=0
      -center.z
    )

    scene.rotation.y = -0.2   // slight angle, stylish
  }, [scene])

  return <primitive object={scene} />
}

export default function Character() {
  return (
    <Canvas
      // ── KEY CHANGE: camera sits higher and further back ──
      // position[1] = 1.0  →  eye level (not knee level)
      // position[2] = 4.5  →  far enough to see full body
      // fov: 42            →  tighter FOV = less distortion
      camera={{ position: [0, 1.0, 4.5], fov: 42 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <ambientLight intensity={0.6} />

      {/* Key light - front */}
      <directionalLight position={[2, 5, 3]} intensity={2.0} castShadow />

      {/* Fill light - left side, slight purple */}
      <directionalLight position={[-3, 3, -1]} intensity={0.7} color="#9080ff" />

      {/* Rim light - cyan from behind for glow effect */}
      <directionalLight position={[0, 4, -4]} intensity={0.8} color="#00ddff" />

      <Environment preset="city" background={false} />

      <Avatar />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}   // can't orbit below waist
        maxPolarAngle={Math.PI / 2}   // can't orbit above head
        // Limit horizontal rotation so character stays mostly facing forward
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </Canvas>
  )
}

useGLTF.preload("/models/avatar.glb")
