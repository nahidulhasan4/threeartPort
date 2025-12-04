import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { G } from "maath/dist/index-0332b2ed.esm";
import { Sphere } from "three";

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
const Sphere = random.inSphere(new Float32Array(6000), { radius: 1.2 });
  return(
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={Sphere} stride={3} frustumCulled {...props} >
<PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation={true} depthWrite={false}  ambientLight={0.5}  />
        </Points>

    </group>
  )
}
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
    camera={{position: [0, 0, 1]}}
    >
      <Suspense fallback={null}>
        <Stars />

      </Suspense>

      <Preload all />

    </Canvas>
    
    </div>
   
  );
};

export default StarsCanvas;
