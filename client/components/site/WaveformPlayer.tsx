import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    WaveSurfer?: any;
  }
}

interface WaveformPlayerProps {
  url: string;
  height?: number;
}

export default function WaveformPlayer({ url, height = 56 }: WaveformPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !window.WaveSurfer || !url) return;

    const ws = window.WaveSurfer.create({
      container: containerRef.current,
      height,
      waveColor: "#9C27FF",
      progressColor: "#FF005D",
      cursorWidth: 0,
      barWidth: 2,
      responsive: true,
      url,
    });
    wavesurferRef.current = ws;

    const onFinish = () => setPlaying(false);
    const onError = (error: any) => {
      console.error("WaveSurfer error:", error);
      setError("Could not load audio");
    };

    ws.on("finish", onFinish);
    ws.on("error", onError);

    return () => {
      ws.un("finish", onFinish);
      ws.un("error", onError);
      ws.destroy();
    };
  }, [url, height]);

  const toggle = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    ws.playPause();
    setPlaying(ws.isPlaying());
  };

  if (!url) {
    return (
      <div className="w-full text-xs text-muted-foreground">
        No preview available
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-xs text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full" aria-label="Audio waveform" />
      <div className="mt-2 flex items-center justify-start">
        <button
          onClick={toggle}
          className="px-3 py-1.5 text-[12px] font-semibold uppercase tracking-widest rounded border border-primary/70 bg-transparent text-foreground hover:border-destructive hover:text-destructive transition-all"
          aria-label={playing ? "Pause preview" : "Play preview"}
        >
          {playing ? "❚❚ Pause" : "▶ Preview"}
        </button>
      </div>
    </div>
  );
}
