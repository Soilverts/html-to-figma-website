import React, { useEffect, useRef } from 'react';

export const ParticleField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let cleanup: (() => void) | null = null;

    // Skip on mobile (particle field is decorative, saves 703KB chunk download)
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Only initialize Three.js when the canvas is in viewport and main thread is idle
    const initThree = async () => {
      const { Scene, FogExp2, PerspectiveCamera, WebGLRenderer,
              BufferGeometry, BufferAttribute, PointsMaterial, Points } = await import('three');

      if (!container.isConnected) return;

      // Scene Setup
      const scene = new Scene();
      scene.fog = new FogExp2(0xffffff, 0.05);

      const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Particles - Sphere distribution
      const particlesGeometry = new BufferGeometry();
      const particlesCount = 1200;
      const posArray = new Float32Array(particlesCount * 3);
      const radius = 6;

      for (let i = 0; i < particlesCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius + (Math.random() * 0.5);

        posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i * 3 + 2] = r * Math.cos(phi);
      }

      particlesGeometry.setAttribute('position', new BufferAttribute(posArray, 3));

      const material = new PointsMaterial({
        size: 0.03,
        color: 0x111827,
        transparent: true,
        opacity: 0.6,
      });

      const particlesMesh = new Points(particlesGeometry, material);
      scene.add(particlesMesh);

      camera.position.z = 10;
      camera.position.y = 2;

      let mouseX = 0;
      let mouseY = 0;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) * 0.0005;
        mouseY = (event.clientY - windowHalfY) * 0.0005;
      };

      document.addEventListener('mousemove', onDocumentMouseMove);

      let animId: number;
      const animate = () => {
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.02 * (mouseX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.02 * (mouseY - particlesMesh.rotation.x);
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      animId = requestAnimationFrame(animate);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        cancelAnimationFrame(animId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        particlesGeometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    // Use IntersectionObserver to trigger init on viewport entry,
    // then requestIdleCallback so it doesn't compete with initial render
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          if ('requestIdleCallback' in window) {
            (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(initThree);
          } else {
            setTimeout(initThree, 200);
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full mix-blend-multiply" />;
};
