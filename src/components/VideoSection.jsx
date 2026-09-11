import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Pause, Play, Square, X } from "lucide-react";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";

function VideoCard({ video, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="glass overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-video bg-gradient-to-br from-plum to-[oklch(0.2_0.08_350)]">
        <button onClick={() => video.src && onOpen(video)} disabled={!video.src} className="group h-full w-full">
          {video.poster && (
            <img src={video.poster} alt={video.title} loading="lazy" className="h-full w-full object-cover opacity-70" />
          )}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="animate-pulse-glow flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <Play fill="currentColor" size={26} />
            </span>
            {!video.src && (
              <span className="px-6 text-xs text-muted-foreground">
                Add your video path in birthdayData.js (for example /videos/for-nikki.mp4)
              </span>
            )}
          </span>
        </button>
      </div>
      <div className="p-5">
        <p className="display text-xl">🎬 {video.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
      </div>
    </motion.div>
  );
}

export default function VideoSection() {
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!activeVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeVideo]);

  const openVideo = (video) => {
    setIsPlaying(false);
    setIsDownloading(false);
    setActiveVideo(video);
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setIsDownloading(false);
    videoRef.current = null;
    setActiveVideo(null);
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const stopVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const downloadVideo = async () => {
    if (!activeVideo?.src || isDownloading) return;

    const filename = `${(activeVideo.title || "video").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.mp4`;
    setIsDownloading(true);

    try {
      const response = await fetch(activeVideo.src, { cache: "no-store" });
      if (!response.ok) throw new Error("Video download failed");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        link.remove();
        URL.revokeObjectURL(blobUrl);
      }, 200);
    } catch {
      const fallbackLink = document.createElement("a");
      fallbackLink.href = activeVideo.src;
      fallbackLink.download = filename;
      fallbackLink.target = "_blank";
      fallbackLink.rel = "noopener noreferrer";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Section id="videos" eyebrow="🎬 Watch This" title={data.videoIntro} subtitle="No rush. Watch them whenever you feel like smiling.">
      <div className="grid gap-6 sm:grid-cols-2">
        {(data.videos || []).map((v, i) => (
          <VideoCard key={i} video={v} index={i} onOpen={openVideo} />
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <div className="glass relative w-full max-w-4xl rounded-3xl p-4 shadow-2xl sm:p-6">
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X size={20} />
            </button>

            <video
              ref={videoRef}
              src={activeVideo.src}
              poster={activeVideo.poster || undefined}
              autoPlay
              controls
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="max-h-[70vh] w-full rounded-2xl bg-black object-contain"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
              <div>
                <p className="display text-xl">🎬 {activeVideo.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{activeVideo.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={downloadVideo} disabled={isDownloading} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
