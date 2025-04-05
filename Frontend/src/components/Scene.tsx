import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cubeRef.current = cube; // Store the cube reference

    // Set initial position (left side of the screen)
    cube.position.x = -5; // Start position (left)
    cube.position.y = 0;  // Start position (top)
    cube.position.z = 0;  // Start position (depth)

    camera.position.z = 10;

    // Handle scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      let scrollProgress = scrollY / scrollHeight; // Normalized scroll progress (0 to 1)
    
      // Loop the scroll progress after 99vh
      if (scrollProgress > 1) {
        scrollProgress = scrollProgress % 1; // Reset to 0 after reaching 1
      }
    
      if (cubeRef.current) {
        const startX = -5; // Leftmost position
        const endX = 5;    // Rightmost position
        const startY = 1;  // Top position
        const endY = -1;   // Bottom position
        const startZ = 0;  // No depth
        const endZ = -10;  // Further depth
    
        // Modify movement logic:
        let adjustedX;
        if (scrollProgress < 0.5) {
          adjustedX = THREE.MathUtils.lerp(startX, endX, scrollProgress * 2); // Move right
        } else {
          adjustedX = THREE.MathUtils.lerp(endX, startX, (scrollProgress - 0.5) * 2); // Move left
        }
    
        cubeRef.current.position.x = adjustedX;
        cubeRef.current.position.y = THREE.MathUtils.lerp(startY, endY, scrollProgress);
        cubeRef.current.position.z = THREE.MathUtils.lerp(startZ, endZ, scrollProgress);
    
        // Optional: Rotate the cube as it moves
        cubeRef.current.rotation.x = scrollProgress * Math.PI * 2;
        cubeRef.current.rotation.y = scrollProgress * Math.PI * 2;
      }
    };
    

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default Scene;