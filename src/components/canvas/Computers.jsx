import {Suspense , useEffect , useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls , Preload , useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader'  ;

const Computers = () => {

  const computer = useGLTF('./desktop_pc/scene.gltf');
  return (
    <mesh>
      
      <hemisphereLight intensity={0.15} groundColor='black'/>
      <pointLight intensity={1}/>
      <spotLight
        position={[-20,50,10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={0.75}
        position={[0,-3.25,-1.5]}
        rotation={[-0.01,-0.2,-0.1]}
      />
    </mesh>
  )
}

export default Computers