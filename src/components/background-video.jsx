// src/components/background-video.jsx
export default function BackgroundVideo() {
  return (
    <>
      {/* Video layer */}
      <video
        className="fixed inset-0 -z-10 h-full w-full object-cover pointer-events-none"
        src="/bg2.mp4"           // put file in /public/bg.mp4
        
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Readability overlay (tune opacity as you like) */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-black/35 dark:bg-black/45" />

      {/* Optional top/bottom fade so it doesn't show under header/footer even if they’re translucent */}
      <div className="fixed inset-x-0 top-0 h-24 -z-0 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />
      <div className="fixed inset-x-0 bottom-0 h-24 -z-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
    </>
  );
}
