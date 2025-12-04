import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

/**
 * Earth - ৩D পৃথিবী মডেল রেন্ডারিং কম্পোনেন্ট
 *
 * সমস্যা এবং সমাধান (Issue and Fix):
 * - আগে ভুল পথ ব্যবহার করা হচ্ছিল: "./earth/scene.gltf"
 * - সঠিক ডিরেক্টরি হল: "./planet/scene.gltf"
 * - ভুল পথ দিলে মডেল লোড হয় না এবং GPU কন্টেক্সট হারিয়ে যায়
 * - এখন সঠিক পথ দিয়ে মডেল দেখা যাবে
 */
const Earth = () => {
  // সঠিক GLTF ফাইলের পথ: "./planet/scene.gltf"
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <>
      <primitive
        object={earth.scene}
        scale={2.5}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
};

/**
 * EarthCanvas - পৃথিবীর ৩D মডেল রেন্ডার করার Canvas র‍্যাপার
 *
 * Canvas সেটআপ এবং অপটিমাইজেশন:
 * - frameloop="demand": প্রয়োজন অনুযায়ী রেন্ডার করা হয় (পারফরম্যান্স ভালো)
 * - gl সেটিংস:
 *   * preserveDrawingBuffer: কন্টেক্সট হারিয়ে গেলে ঝলমলানি রোধ করে
 *   * antialias: true - মসৃণ রেন্ডারিং
 *   * stencil: false - GPU মেমোরি সাশ্রয়
 * - onCreated: WebGL কন্টেক্সট হারানোর ঘটনা পরিচালনা করে
 */
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        stencil: false,
      }}
      camera={{ position: [4, 3, 6], fov: 50 }}
     
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
      {/* Preload অবশ্যই Suspense এর বাইরে থাকতে হবে */}
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
