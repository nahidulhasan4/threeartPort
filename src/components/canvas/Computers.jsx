import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  
  return (
    <group> {/* Use group instead of mesh for primitives */}
      {/* Ambient lights first */}
      {/* <ambientLight intensity={1} /> */}
      <hemisphereLight intensity={0.15} groundColor="black" />
      
      {/* Main spotlight - positioned to actually hit the model */}
      <spotLight
        angle={0.12} // Wider angle
        penumbra={1}
        intensity={12} // Higher intensity
        castShadow
        shadow-mapSize={1024}
        
      />
      
      {/* Fill light */}
      <pointLight  intensity={1} />
      
      {/* The 3D model */}
      <primitive
        object={computer.scene}
        scale={0.7}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;