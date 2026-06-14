// TODO(ui): Capture — full-screen dark camera viewfinder with corner brackets,
// X close, "⚡ Swapple" label, getUserMedia live feed + <input type="file"
// capture="environment"> fallback. On capture POST multipart to /api/scans then
// -> /scans/[scanId]. See components/scan/CaptureUploader.tsx.
export default function CapturePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-black text-white">
      <p className="font-mono text-xs tracking-widest">LIVE CAMERA FEED</p>
      {/* PLACEHOLDER */}
    </main>
  );
}
