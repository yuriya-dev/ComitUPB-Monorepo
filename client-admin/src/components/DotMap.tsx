'use client';

import React, { useRef, useEffect, useState } from 'react';

type RoutePoint = {
  x: number;
  y: number;
  delay: number;
};

export const DotMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Route animations matching tech & community node connections
  const routes: { start: RoutePoint; end: RoutePoint; color: string }[] = [
    {
      start: { x: 100, y: 150, delay: 0 },
      end: { x: 220, y: 90, delay: 2 },
      color: '#0668C6',
    },
    {
      start: { x: 220, y: 90, delay: 2 },
      end: { x: 290, y: 140, delay: 4 },
      color: '#0668C6',
    },
    {
      start: { x: 60, y: 60, delay: 1 },
      end: { x: 170, y: 200, delay: 3 },
      color: '#0668C6',
    },
    {
      start: { x: 310, y: 70, delay: 0.5 },
      end: { x: 200, y: 200, delay: 2.5 },
      color: '#0668C6',
    },
  ];

  const generateDots = (width: number, height: number) => {
    const dots = [];
    const gap = 12;
    const dotRadius = 1.2;

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        // Map silhouette shape
        const isInMapShape =
          ((x < width * 0.28 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
          ((x < width * 0.28 && x > width * 0.15) && (y < height * 0.82 && y > height * 0.4)) ||
          ((x < width * 0.48 && x > width * 0.3) && (y < height * 0.38 && y > height * 0.12)) ||
          ((x < width * 0.52 && x > width * 0.35) && (y < height * 0.68 && y > height * 0.35)) ||
          ((x < width * 0.75 && x > width * 0.45) && (y < height * 0.55 && y > height * 0.1)) ||
          ((x < width * 0.85 && x > width * 0.65) && (y < height * 0.82 && y > height * 0.6));

        if (isInMapShape && Math.random() > 0.28) {
          dots.push({
            x,
            y,
            radius: dotRadius,
            opacity: Math.random() * 0.45 + 0.25,
          });
        }
      }
    }
    return dots;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots = generateDots(dimensions.width, dimensions.height);
    let animationFrameId: number;
    let startTime = Date.now();

    function drawDots() {
      if (!ctx) return;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 104, 198, ${dot.opacity})`;
        ctx.fill();
      });
    }

    function drawRoutes() {
      if (!ctx) return;
      const currentTime = (Date.now() - startTime) / 1000;

      routes.forEach((route) => {
        const elapsed = currentTime - route.start.delay;
        if (elapsed <= 0) return;

        const duration = 3;
        const progress = Math.min(elapsed / duration, 1);

        const x = route.start.x + (route.end.x - route.start.x) * progress;
        const y = route.start.y + (route.end.y - route.start.y) * progress;

        ctx.beginPath();
        ctx.moveTo(route.start.x, route.start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = route.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(route.start.x, route.start.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = route.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 104, 198, 0.35)';
        ctx.fill();

        if (progress === 1) {
          ctx.beginPath();
          ctx.arc(route.end.x, route.end.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = route.color;
          ctx.fill();
        }
      });
    }

    function animate() {
      drawDots();
      drawRoutes();

      const currentTime = (Date.now() - startTime) / 1000;
      if (currentTime > 15) {
        startTime = Date.now();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
