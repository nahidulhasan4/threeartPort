import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(1000), { radius: 1.2 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      {/* NOTE: Canvas with minimal resources to avoid context loss
          - frameloop="never": Only renders when needed, not continuously
          - preserveDrawingBuffer: Prevents flickering during context loss
          - antialias: false: Reduces GPU memory usage
      */}
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 1] }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: false,
          stencil: false,
          depth: true,
        }}
        onCreated={(state) => {
          // WebGL context loss recovery
          state.gl.canvas.addEventListener("webglcontextlost", (event) => {
            console.warn("WebGL context lost in Stars - recovering...");
            event.preventDefault();
          });
          state.gl.canvas.addEventListener("webglcontextrestored", () => {
            console.log("WebGL context restored in Stars");
          });
        }}
      >
        <Suspense fallback={null}>
          {/* Stars component with reduced point count (1000 instead of 5000) */}
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
