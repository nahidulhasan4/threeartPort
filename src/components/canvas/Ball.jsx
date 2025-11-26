import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader"; // লোডার কম্পোনেন্ট আমদানি করা

/*
  সমস্যা (Issue):
  মূল কারণ ছিল যে `useTexture` থেকে নেওয়া ভেরিয়েবলটির নাম `Decal` রাখা ছিল,
  যা একই নামে আমদানি করা `Decal` কম্পোনেন্টকে ওভাররাইট (shadow) করে ফেলছে।
  ফলে JSX-এ যখন <Decal .../> ব্যবহার করা হচ্ছিল, সেটা কনফ্লিক্ট তৈরি করছিল
  এবং রেন্ডার ব্ল্যাক বা এরর দেখাতেও পারত।

  সমাধান (Fix):
  - টেক্সচারের ভেরিয়েবলটি নাম পরিবর্তন করে `decalMap` রাখা হলো।
  - লাইটিং বাড়িয়ে কিছুটা ভাল আলোকসজ্জা যোগ করা হলো (ambient + directional)।
  - উপযুক্ত মন্তব্য যোগ করা হয়েছে যাতে ভবিষ্যতে বোঝা যায় কোথায় সমস্যা ছিল।
*/

const Ball = (props) => {
  // useTexture থেকে আসা টেক্সচারের নাম `decalMap` রাখা হয়েছে যাতে এটি
  // Drei-এর `Decal` কম্পোনেন্টের সাথে কনফ্লিক্ট না করে।
  const [decalMap] = useTexture([props.ImgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {/*Ambient light একটু বাড়ানো হয়েছে যাতে মডেল পুরোপুরি ডার্ক না হয়*/}
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/*
          তিনটি পয়েন্ট লক্ষ্য করবেন:
          1) map={decalMap} — টেক্সচারের রেফারেন্স এখানে দিতে হবে
          2) position/rotation/scale প্রয়োজনে অ্যাডজাস্ট করুন
          3) উপরে আমরা `Decal` কম্পোনেন্টকে ওভাররাইট না করতে decalMap নাম ব্যবহার করেছি
        */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decalMap}
        />
      </mesh>

    </Float>
  );
};
const BallCanvas = ({ icon }) => {
  return (
   
      <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Ball ImgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
