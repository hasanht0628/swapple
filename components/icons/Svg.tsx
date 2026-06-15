import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Icon size in px (sets width and height). */
  s?: number;
  /** Stroke width. */
  sw?: number;
}

export function Svg({ s = 24, sw = 1.8, children, ...props }: IconProps) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={props["aria-hidden"] ?? true}
      {...props}
    >
      {children}
    </svg>
  );
}
