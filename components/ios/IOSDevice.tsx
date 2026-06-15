import { IOSKeyboard } from "./IOSKeyboard";
import { IOSNavBar } from "./IOSNavBar";
import { IOSStatusBar } from "./IOSStatusBar";
import type { IOSDeviceProps } from "./types";

/** Default iPhone frame width — matches `--spacing-shell` in globals.css */
export const IOS_DEVICE_WIDTH = 402;
/** Default iPhone frame height at 402px width */
export const IOS_DEVICE_HEIGHT = 874;

const BEZEL_PADDING = 11;

export function IOSDevice({
  children,
  width = IOS_DEVICE_WIDTH,
  height = IOS_DEVICE_HEIGHT,
  dark = false,
  title,
  keyboard = false,
  time = "9:41",
  className,
  style,
}: IOSDeviceProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius: 48,
        padding: BEZEL_PADDING,
        boxSizing: "border-box",
        position: "relative",
        background: "#000",
        boxShadow:
          "0 50px 100px -20px rgba(60, 30, 80, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.12)",
        fontFamily: "-apple-system, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 37,
          overflow: "hidden",
          position: "relative",
          background: dark ? "#000" : "var(--color-background, #F2F2F7)",
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 11,
            left: "50%",
            transform: "translateX(-50%)",
            width: 126,
            height: 37,
            borderRadius: 24,
            background: "#000",
            zIndex: 50,
          }}
          aria-hidden
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
          <IOSStatusBar dark={dark} time={time} />
        </div>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {title !== undefined && <IOSNavBar title={title} dark={dark} />}
          <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
          {keyboard && <IOSKeyboard dark={dark} />}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 60,
            height: 34,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: 8,
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <div
            style={{
              width: 139,
              height: 5,
              borderRadius: 100,
              background: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.25)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
