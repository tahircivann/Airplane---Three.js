import React, { useRef, useEffect } from 'react';
import usePlaneControls from './usePlaneControls';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';

const Plane: React.FC = () => {
  const { scene, animations } = useGLTF('/assets/spitfire.glb');
  const planeRef = useRef<Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (animations.length) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[1]);
      action.play();
    }
  }, [animations, scene]);

  const cameraOffset = new THREE.Vector3(1,1, 8);
  const cameraSpeed = 0.05;  // Adjust this value to your liking. Closer to 1 is faster, closer to 0 is slower.

  useFrame(() => {
      if (planeRef.current) {
          const plane = planeRef.current;
  
          const relativeCameraOffset = new THREE.Vector3(-10, 3, 0); 
          const targetCameraPosition = relativeCameraOffset.applyMatrix4(plane.matrixWorld);
  
          // Use lerp for smooth camera movement.
          camera.position.lerp(targetCameraPosition, cameraSpeed);
          camera.lookAt(plane.position);
      }
  
      if (mixerRef.current) {
          mixerRef.current.update(0.19);
      }
  });

  usePlaneControls(planeRef, camera);
  
  return (
    <group rotation={[0, Math.PI / 2, 0]} scale={0.5} ref={planeRef} dispose={null}>
      <pointLight position={[10, 10, 100]} />
      <primitive object={scene} position={[0, 0, 0]} rotation={[0, -(Math.PI / 2), 0]} />
    </group>
  );
}

export default Plane;