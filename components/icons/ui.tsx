import { Svg, type IconProps } from "./Svg";

export const IcLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
);

export const IcCheck = (p: IconProps) => (
  <Svg sw={2.6} {...p}>
    <path d="M5 12.5 10 17 19 7" />
  </Svg>
);

export const IcBolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />
  </Svg>
);

export const IcFlash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />
  </Svg>
);

export const IcGallery = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="5" width="16" height="14" rx="2.5" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m5 17 4.5-4 3.5 3 3-2.5 3 3" />
  </Svg>
);

export const IcHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 9.5V20h12V9.5" />
  </Svg>
);

export const IcChart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="m7 15 3.5-4 3 2.5L20 7" />
  </Svg>
);

export const IcUser = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
  </Svg>
);

export const IcChevron = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const IcChevronLeft = (p: IconProps) => (
  <Svg {...p} style={{ transform: "rotate(180deg)", ...p.style }}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const IcArrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h13" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
);

export const IcClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const IcPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IcBookmark = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 4h12v16l-6-4-6 4Z" />
  </Svg>
);

export const IcEdit = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 5.5 18.5 10 8 20.5H3.5V16Z" />
    <path d="M13 6.5 17.5 11" />
  </Svg>
);

export const IcShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6Z" />
    <path d="m9 11.5 2 2 4-4.5" />
  </Svg>
);

export const IcStar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 14.4 9l5.6.5-4.3 3.8 1.3 5.7L12 16l-5 3 1.3-5.7L4 9.5 9.6 9Z" />
  </Svg>
);
