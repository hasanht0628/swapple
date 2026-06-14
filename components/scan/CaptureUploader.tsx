"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function CaptureUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/scans", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      
      // Navigate to scan results
      router.push(`/scans/${data.scan.id}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGalleryUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSelect(file);
    };
    input.click();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
        >
          ✕
        </button>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-xl">⚡</span>
          Swapple
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Camera viewfinder area */}
      <div className="flex-1 flex items-center justify-center relative w-full max-h-screen lg:max-h-[70vh]">
        {/* Corner brackets overlay */}
        <div className="absolute inset-8 lg:inset-16 pointer-events-none">
          <div className="w-full h-full relative">
            {/* Top-left bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-l-2 border-t-2 lg:border-l-4 lg:border-t-4 border-white/80" />
            {/* Top-right bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-r-2 border-t-2 lg:border-r-4 lg:border-t-4 border-white/80" />
            {/* Bottom-left bracket */}
            <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-l-2 border-b-2 lg:border-l-4 lg:border-b-4 border-white/80" />
            {/* Bottom-right bracket */}
            <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-r-2 border-b-2 lg:border-r-4 lg:border-b-4 border-white/80" />
          </div>
        </div>

        {/* Placeholder for camera feed */}
        <div className="text-center space-y-4 text-white/70">
          <div className="text-sm lg:text-base uppercase tracking-wide">Live Camera Feed</div>
          <div className="text-xs lg:text-sm">Camera preview would appear here</div>
        </div>
      </div>

      {/* Bottom instructions and controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-6">
        <p className="text-center text-sm lg:text-base text-white/80">
          Point at a product, shelf, or your cart
        </p>

        <div className="flex items-center justify-center gap-8 lg:gap-12">
          <button
            onClick={handleGalleryUpload}
            disabled={isUploading}
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center text-xl lg:text-2xl disabled:opacity-50"
          >
            🖼️
          </button>

          <button
            onClick={handleCameraCapture}
            disabled={isUploading}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-4 lg:border-6 border-white/50 flex items-center justify-center disabled:opacity-50"
          >
            {isUploading ? (
              <div className="animate-spin w-6 h-6 lg:w-8 lg:h-8 border-2 lg:border-4 border-black border-t-transparent rounded-full" />
            ) : (
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white" />
            )}
          </button>

          <div className="w-12 h-12 lg:w-16 lg:h-16" /> {/* Spacer for symmetry */}
        </div>
      </div>

      {/* Hidden file input for camera capture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      {/* Error display */}
      {error && (
        <div className="absolute bottom-24 left-4 right-4 bg-red-600 text-white p-3 rounded-xl text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}