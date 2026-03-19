"use client"

import { useGLTF, useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function Avatar() {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/avatar.glb")
  const { actions } = useAnimations(animations, group)

  // Play animations
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action?.play())
    }
  }, [actions])

  // Fix materials + auto-center the model
  useEffect(() => {
    // ── Auto-fit: measure bounding box and center it ──
    const box    = new THREE.Box3().setFromObject(scene)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // Move scene so its center is at origin
    scene.position.x -= center.x
    scene.position.z -= center.z
    // Place feet at y = 0
    scene.position.y -= box.min.y

    // Slight rotation to face camera
    scene.rotation.y = 0.1

    // Fix materials
    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material) {
          child.material.envMapIntensity = 1.0
          if (child.material.map) {
            child.material.map.colorSpace = THREE.SRGBColorSpace
            child.material.map.needsUpdate = true
          }
          child.material.needsUpdate = true
        }
        child.castShadow    = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Subtle float — moves around y=0 (feet on ground)
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload("/models/avatar.glb")
