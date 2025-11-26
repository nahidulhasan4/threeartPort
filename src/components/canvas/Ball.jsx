import React, {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal,Float, OrbitControls, Preload, useTexture } from '@react-three/drei'  ;
import CanvasLoader from '../Loader'; // লোডার কম্পোনেন্ট আমদানি করা

// Ball কম্পোনেন্ট - একটি 3D বল তৈরি করে যা একটি আইকন প্রদর্শন করে
const Ball = ({icon}) => {
  // useTexture হুক ব্যবহার করে আইকনের টেক্সচার লোড করা
  // const [decal] = useTexture([icon]); 
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0,0,0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1,1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position={[0,0,1]} 
          rotation={[0,0,0]}
          scale={1}
          // map={decal} 
        />
      </mesh>
    </Float>
  )
}


export default Ball