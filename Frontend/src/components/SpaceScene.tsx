import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Spaceship = () => {
  const { scene } = useGLTF('/spaceship/scene.gltf'); // Ensure correct path

  return <primitive object={scene} scale={0.5} />;
};

const Scene = () => (
  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 10]} intensity={1} />
    <Spaceship />
    <OrbitControls />
  </Canvas>
);

export default Scene;
