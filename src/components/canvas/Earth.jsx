import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [4, 3, 6], fov: 45 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        stencil: false,
      }}
      onCreated={(state) => {
        // NOTE: WebGL context loss recovery
        // WebGL context কখনো হারিয়ে গেলে এটি recover করার চেষ্টা করে
        state.gl.canvas.addEventListener("webglcontextlost", (event) => {
          console.warn("WebGL context lost - attempting recovery...");
          event.preventDefault();
        });
        state.gl.canvas.addEventListener("webglcontextrestored", () => {
          console.log("WebGL context restored");
        });
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          autoRotate
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
