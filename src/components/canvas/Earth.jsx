import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./earth/scene.gltf");
  
  return (
    <div>
      earth
    </div>
  )
}

const EarthCanvas = () => {
  return (
    <Canvas 
    shadows
    frameloop="demand"
    gl={{ preserveDrawingBuffer: true }}
    camera={{ position: [4, 3, 6], fov: 50 }} 
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />
        <Earth />
        <Preload all />
      </Suspense>

      </Canvas>
  );
}

export default EarthCanvas;