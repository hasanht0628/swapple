"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IcBolt, IcClose } from "@/components/icons";
import { processImageForUpload, isHeicFile } from "@/lib/image/convertHeic";

export function CaptureUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [cameraState, setCameraState] = useState<'loading' | 'active' | 'error' | 'permission-denied'>('loading');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      let processedFile = file;

      // Convert HEIC to JPEG if needed
      if (isHeicFile(file)) {
        setIsConverting(true);
        try {
          processedFile = await processImageForUpload(file);
        } catch (conversionError) {
          console.error("HEIC conversion error:", conversionError);
          setError("Failed to process HEIC image. Please try a different format or convert to JPEG first.");
          return;
        } finally {
          setIsConverting(false);
        }
      }

      const formData = new FormData();
      formData.append("image", processedFile);

      const response = await fetch("/api/scans", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Prefer the actionable message the API returns (it already maps
        // OpenAI quota/auth/rate-limit failures to friendly guidance).
        let errorMessage = "Upload failed. Please try again.";
        try {
          const errorData = await response.json();
          if (typeof errorData?.error === "string" && errorData.error) {
            errorMessage = errorData.error;
          } else if (response.status === 400) {
            errorMessage = "Invalid image file. Please try a different image.";
          } else if (response.status === 413) {
            errorMessage = "Image file is too large. Please try a smaller image.";
          } else if (response.status >= 500) {
            errorMessage = "Server error. Please try again in a moment.";
          }
        } catch {
          // If we can't parse the error response, use the default message
          if (response.status === 400) {
            errorMessage = "Invalid image file. Please try a different image.";
          } else if (response.status === 413) {
            errorMessage = "Image file is too large. Please try a smaller image.";
          } else if (response.status >= 500) {
            errorMessage = "Server error. Please try again in a moment.";
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Navigate to scan results
      router.push(`/scans/${data.scan.id}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setIsConverting(false);
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

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Attach a stream to the (always-mounted) video element and start playback.
  const attachStream = (stream: MediaStream) => {
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play().catch((playError) => {
        console.warn('Video play failed:', playError);
      });
    };
  };

  // Initialize camera on mount
  useEffect(() => {
    let mounted = true;

    const requestStream = async (mode: 'environment' | 'user') =>
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

    const initCamera = async () => {
      if (!mounted) return;

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (mounted) setCameraState('error');
        return;
      }

      if (mounted) setCameraState('loading');

      let stream: MediaStream;
      try {
        stream = await requestStream(facingMode);
      } catch (err) {
        // Desktops typically lack an 'environment' camera — fall back to 'user'.
        if (facingMode === 'environment') {
          try {
            stream = await requestStream('user');
          } catch (fallbackErr) {
            handleCameraError(fallbackErr, mounted);
            return;
          }
        } else {
          handleCameraError(err, mounted);
          return;
        }
      }

      if (!mounted) {
        // Component unmounted before stream was ready
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      streamRef.current = stream;
      attachStream(stream);
      setCameraState('active');
    };

    const handleCameraError = (err: unknown, isMounted: boolean) => {
      console.error('Camera access error:', err);
      if (!isMounted) return;

      if (
        err instanceof Error &&
        (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')
      ) {
        setCameraState('permission-denied');
      } else {
        setCameraState('error');
      }
    };

    initCamera();

    // Cleanup on unmount / facingMode change
    return () => {
      mounted = false;
      stopCamera();
    };
  }, [facingMode]);

  // Capture photo from video stream
  const captureFromCamera = () => {
    if (!videoRef.current || !canvasRef.current || cameraState !== 'active') {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and create file
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        handleFileSelect(file);
      }
    }, 'image/jpeg', 0.9);
  };

  // Handle camera capture button click
  const handleCameraCapture = () => {
    if (cameraState === 'active') {
      captureFromCamera();
    } else {
      // Fallback to file input
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  // Switch camera facing mode (mobile)
  const switchCamera = () => {
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);
  };

  // Manual camera retry
  const retryCamera = () => {
    const newFacingMode = facingMode;
    setFacingMode(newFacingMode === 'environment' ? 'user' : 'environment');
    setTimeout(() => setFacingMode(newFacingMode), 100);
  };

  return (
    <div className="sw-screen !absolute bg-black text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
        >
          <IcClose s={20} stroke="#fff" />
        </button>
        <Link href="/home" className="flex items-center gap-2 text-sm font-medium">
          <IcBolt s={20} stroke="#fff" sw={1.6} />
          Swa<span className="text-primary">pp</span>le
        </Link>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Camera viewfinder area */}
      <div className="flex-1 flex items-center justify-center relative w-full min-h-[60vh] max-h-screen lg:max-h-[70vh]">
        {/* Video element for camera feed — always mounted so the stream can attach */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-200 ${
            cameraState === 'active' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Corner brackets overlay */}
        <div className="absolute inset-8 lg:inset-16 pointer-events-none z-10">
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

        {/* Camera state messages */}
        {cameraState !== 'active' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 text-white/70 z-10">
            {cameraState === 'loading' && (
              <>
                <div className="animate-spin w-8 h-8 lg:w-10 lg:h-10 border-2 lg:border-4 border-white/50 border-t-white rounded-full mx-auto" />
                <div className="text-sm lg:text-base uppercase tracking-wide">Starting Camera</div>
              </>
            )}
            
            {cameraState === 'permission-denied' && (
              <>
                <div className="text-2xl lg:text-3xl">📷</div>
                <div className="text-sm lg:text-base uppercase tracking-wide">Camera Permission Required</div>
                <div className="text-xs lg:text-sm">Please allow camera access and refresh</div>
                <button
                  onClick={retryCamera}
                  className="mt-2 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30"
                >
                  Try Again
                </button>
              </>
            )}
            
            {cameraState === 'error' && (
              <>
                <div className="text-2xl lg:text-3xl">⚠️</div>
                <div className="text-sm lg:text-base uppercase tracking-wide">Camera Unavailable</div>
                <div className="text-xs lg:text-sm">Use the gallery upload instead</div>
                <button
                  onClick={retryCamera}
                  className="mt-2 px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Bottom instructions and controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-6">
        <p className="text-center text-sm lg:text-base text-white/80">
          {isConverting ? "Converting photo..." : "Point at a product, shelf, or your cart"}
        </p>

        <div className="flex items-center justify-center gap-8 lg:gap-12">
          <button
            onClick={handleGalleryUpload}
            disabled={isUploading || isConverting}
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center text-xl lg:text-2xl disabled:opacity-50"
          >
            🖼️
          </button>

          <button
            onClick={handleCameraCapture}
            disabled={isUploading || isConverting}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-4 lg:border-6 border-white/50 flex items-center justify-center disabled:opacity-50"
          >
            {(isUploading || isConverting) ? (
              <div className="animate-spin w-6 h-6 lg:w-8 lg:h-8 border-2 lg:border-4 border-black border-t-transparent rounded-full" />
            ) : (
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white" />
            )}
          </button>

          {/* Camera flip button - only show when camera is active */}
          {cameraState === 'active' ? (
            <button
              onClick={switchCamera}
              disabled={isUploading || isConverting}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center text-xl lg:text-2xl disabled:opacity-50"
              title="Switch Camera"
            >
              🔄
            </button>
          ) : (
            <div className="w-12 h-12 lg:w-16 lg:h-16" /> /* Spacer for symmetry */
          )}
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
        <div className="absolute bottom-24 left-4 right-4 rounded-[14px] bg-verdict-avoid p-3 text-center text-sm text-white">
          {error}
        </div>
      )}

      {/* Analyzing overlay */}
      {(isUploading || isConverting) && (
        <div className="scan-veil">
          <div className="scan-ring" aria-hidden="true" />
          <p className="sw-kicker text-foreground">
            {isConverting ? "Converting photo…" : "Analyzing scan…"}
          </p>
        </div>
      )}
    </div>
  );
}