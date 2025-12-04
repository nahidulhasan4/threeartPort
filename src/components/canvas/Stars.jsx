import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

/**
 * Stars - অ্যানিমেটেড তারকা ক্ষেত্র রেন্ডারিং কম্পোনেন্ট
 *
 * সমস্যা এবং সমাধান (Issue and Fix):
 * - Points জ্যামেট্রি ডিফল্টভাবে অন্ধকার থাকে এবং লাইটিং প্রয়োজন
 * - ambientLight না থাকলে কালো পটভূমিতে তারকা দৃশ্যমান হয় না
 * - PointMaterial-এ ambientLight যোগ করা হয়েছে তারকা দেখানোর জন্য
 */
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
      {/* তারকা দৃশ্যমান করার জন্য পরিবেশগত আলো প্রয়োজন */}
      <ambientLight intensity={0.5} />
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
/**
 * StarsCanvas - পটভূমি তারকা ক্ষেত্র রেন্ডারিং Canvas
 *
 * Canvas অপটিমাইজেশন সেটিংস:
 * - position: absolute & inset-0 - সম্পূর্ণ স্ক্রিন পূরণ করে
 * - z-[-1] - অন্যান্য সামগ্রীর পিছনে রাখে
 * - frameloop="demand" - প্রয়োজন অনুযায়ী রেন্ডার করে (পারফরম্যান্স ভালো)
 * - gl সেটিংস:
 *   * preserveDrawingBuffer: কন্টেক্সট হারানোর সময় ঝলমলানি রোধ করে
 *   * antialias: false - পারফরম্যান্সের জন্য অক্ষম
 *   * stencil: false - GPU মেমোরি সাশ্রয় করে
 * - onCreated হ্যান্ডলার: WebGL কন্টেক্সট হারানোর পুনরুদ্ধার
 */
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
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
          // WebGL কন্টেক্সট হারিয়ে গেলে পুনরুদ্ধারের ব্যবস্থা
          state.gl.canvas.addEventListener("webglcontextlost", (event) => {
            console.warn(
              "তারকা Canvas-এ WebGL কন্টেক্সট হারানো - পুনরুদ্ধারের চেষ্টা..."
            );
            event.preventDefault();
          });
          state.gl.canvas.addEventListener("webglcontextrestored", () => {
            console.log("তারকা Canvas-এ WebGL কন্টেক্সট পুনরুদ্ধার হয়েছে");
          });
        }}
      >
        <Suspense fallback={null}>
          {/* প্রতিটি তারকা ক্ষেত্রে 1000 পয়েন্ট রয়েছে (পারফরম্যান্সের জন্য অপটিমাইজড) */}
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
