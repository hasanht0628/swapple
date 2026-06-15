import { CaptureUploader } from "@/components/scan/CaptureUploader";

export default function CapturePage() {
  return (
    <div className="relative -mx-[22px] -mt-[calc(env(safe-area-inset-top,0px)+18px)] min-h-[calc(100dvh-env(safe-area-inset-bottom,0px))]">
      <CaptureUploader />
    </div>
  );
}
