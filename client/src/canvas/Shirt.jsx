import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { useRef } from 'react';
import state from '../store';

const Shirt = ({ mousePosition }) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  logoTexture.anisotropy =  16;
  logoTexture.needsUpdate = true;
  const fullTexture = useTexture(snap.fullDecal);


  useFrame((state, delta) => {
    // Perform color easing
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);

    // Rotate the shirt based on mouse position
    if (shirtRef.current) {
      const [x, y] = mousePosition;
      const rotationFactor = 0.001; // Adjust this value to control the rotation speed

      // Calculate rotation angles based on mouse position
      const targetRotationX = (x / window.innerWidth - 0.5) * Math.PI * 2;
      const targetRotationY = (y / window.innerHeight - 0.5) * Math.PI * 2;

      // Interpolate current rotation towards target rotation
      shirtRef.current.rotation.x += (targetRotationX - shirtRef.current.rotation.x) * rotationFactor;
      shirtRef.current.rotation.y += (targetRotationY - shirtRef.current.rotation.y) * rotationFactor;
    }
  });

  const stateString = JSON.stringify(snap);
 
  const shirtRef = useRef<THREE.Mesh>(null);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt