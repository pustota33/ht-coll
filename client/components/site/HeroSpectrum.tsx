import { useEffect, useRef } from "react";

interface AudioPulse {
  startTime: number;
  duration: number;
  amplitude: number;
  position: number;
}

export default function HeroSpectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulsesRef = useRef<AudioPulse[]>([]);
  const nextPulseTimeRef = useRef<number>(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let animationId: number;
    let time = 0;

    const generatePulse = () => {
      const pulse: AudioPulse = {
        startTime: time,
        duration: 0.3 + Math.random() * 0.7, // 0.3 to 1s duration
        amplitude: 0.5 + Math.random() * 1.5, // 0.5x to 2x the base amplitude
        position: Math.random() * canvas.offsetWidth,
      };
      pulsesRef.current.push(pulse);
      nextPulseTimeRef.current = time + 1.5 + Math.random() * 3; // Next pulse in 1.5 to 4.5 seconds
    };

    const animate = () => {
      time += 0.02;

      // Generate new pulses at random intervals
      if (time >= nextPulseTimeRef.current) {
        generatePulse();
      }

      // Remove expired pulses
      pulsesRef.current = pulsesRef.current.filter(
        (pulse) => time - pulse.startTime < pulse.duration
      );

      // Clear canvas - pure black background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerY = height / 2;
      const amplitude = height * 0.15;

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw oscillating sine wave - pure white
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 0; x < width; x += 2) {
        const sine1 = Math.sin((x / width) * Math.PI * 4 + time * 0.5) * amplitude;
        const sine2 = Math.sin((x / width) * Math.PI * 6 - time * 0.3) * (amplitude * 0.5);

        // Apply audio pulse distortions
        let pulseEffect = 0;
        for (const pulse of pulsesRef.current) {
          const elapsed = time - pulse.startTime;
          const progress = elapsed / pulse.duration;
          const distance = Math.abs(x - pulse.position);
          const maxDistance = width * 0.3;

          if (distance < maxDistance) {
            const decay = Math.max(0, 1 - progress);
            const proximity = Math.max(0, 1 - distance / maxDistance);
            const distortion =
              Math.sin(progress * Math.PI * 8) * proximity * decay * amplitude * pulse.amplitude;
            pulseEffect += distortion;
          }
        }

        const y = centerY + sine1 + sine2 + pulseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw faint secondary wave for depth
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < width; x += 2) {
        const sine = Math.sin((x / width) * Math.PI * 3 + time * 0.7) * (amplitude * 0.3);
        const y = centerY + sine;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-20 rounded-lg border border-white/10 overflow-hidden bg-[#0A0A0A] relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
      />
    </div>
  );
}
