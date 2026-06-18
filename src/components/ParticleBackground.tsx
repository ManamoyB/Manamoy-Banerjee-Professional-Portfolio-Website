import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  angle?: number;
  spinSpeed?: number;
}

export const ParticleBackground: React.FC = () => {
  const { theme, colors } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = theme === 'aurora' ? 75 : 35;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < particleCount; i++) {
        const radius = theme === 'aurora' 
          ? Math.random() * 2 + 1 
          : Math.random() * 15 + 5; // larger floating elements for Nova light flow

        const x = Math.random() * w;
        const y = Math.random() * h;
        const vx = (Math.random() - 0.5) * (theme === 'aurora' ? 0.6 : 0.3);
        const vy = (Math.random() - 0.5) * (theme === 'aurora' ? 0.6 : 0.3);

        const colorList = theme === 'aurora'
          ? [colors.primary, colors.secondary, colors.accent]
          : ['#FF6B3522', '#6C63FF22', '#00B89422', '#FDCB6E33'];

        const color = colorList[Math.floor(Math.random() * colorList.length)];

        particles.push({
          x,
          y,
          vx,
          vy,
          radius,
          color,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.01
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const w = canvas.width;
      const h = canvas.height;

      // Draw aurora backgrounds
      if (theme === 'aurora') {
        const grad = ctx.createRadialGradient(
          w * 0.1, h * 0.1, 0,
          w * 0.1, h * 0.1, Math.max(w, h) * 0.8
        );
        grad.addColorStop(0, '#0D152D');
        grad.addColorStop(1, '#080B14');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // draw glow blob
        if (mouse.x > 0 && mouse.x < w) {
          const mouseGlow = ctx.createRadialGradient(
            mouse.x, mouse.y, 10,
            mouse.x, mouse.y, mouse.radius * 1.5
          );
          mouseGlow.addColorStop(0, 'rgba(110, 86, 255, 0.08)');
          mouseGlow.addColorStop(0.5, 'rgba(0, 229, 255, 0.03)');
          mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = mouseGlow;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, mouse.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Nova layout mesh gradient drawing
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#F8FAFC');
        grad.addColorStop(0.5, '#F1F5F9');
        grad.addColorStop(1, '#E2E8F0');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Update and draw particles
      particles.forEach((p, index) => {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;

        // Spin update
        if (p.angle !== undefined && p.spinSpeed !== undefined) {
          p.angle += p.spinSpeed;
        }

        // Boundary reflection or wrap
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse reactive displacement
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          if (theme === 'aurora') {
            // Neural particles attract slightly to mouse center gravity
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;
          } else {
            // Geometric Nova shapes bounce away
            p.x += (dx / dist) * force * 2.5;
            p.y += (dy / dist) * force * 2.5;
          }
        }

        // Draw particle
        ctx.beginPath();
        if (theme === 'aurora') {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          // Floating shapes for Nova light mode
          ctx.fillStyle = p.color;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);

          if (index % 3 === 0) {
            // Square
            ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
          } else if (index % 3 === 1) {
            // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -p.radius);
            ctx.lineTo(p.radius, p.radius);
            ctx.lineTo(-p.radius, p.radius);
            ctx.closePath();
            ctx.fill();
          } else {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // Draw interactive neural connections (Aurora only)
        if (theme === 'aurora') {
          for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dxConn = p.x - p2.x;
            const dyConn = p.y - p2.y;
            const distConn = Math.sqrt(dxConn * dxConn + dyConn * dyConn);

            if (distConn < 130) {
              const alpha = (1 - distConn / 130) * 0.15;
              ctx.strokeStyle = `rgba(110, 86, 255, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
