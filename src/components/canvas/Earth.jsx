import React from 'react'
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';


const Earth = () => {
  return (
    <div>Earth</div>
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [4, 3, 6], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Earth />
      </Suspense> 
      <Preload all />
    </Canvas>
  )
} 

export default EarthCanvas