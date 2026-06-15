import { Svg, type IconProps } from "./Svg";

export const IcHeart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.6-7-9.6A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.4C19 15.4 12 20 12 20Z" />
  </Svg>
);

export const IcDrop = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5c3 3.6 5.5 6.3 5.5 9.5a5.5 5.5 0 1 1-11 0c0-3.2 2.5-5.9 5.5-9.5Z" />
    <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
  </Svg>
);

export const IcGut = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 4v5a4 4 0 0 0 4 4h1a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3" />
    <path d="M9 4H4" />
    <circle cx="17.5" cy="6.5" r="2.5" />
  </Svg>
);

export const IcFlame = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3c.5 3-2.5 4-2.5 7A2.5 2.5 0 0 0 12 12.5 2.5 2.5 0 0 0 14.2 9C15.8 11 17 12.4 17 15a5 5 0 0 1-10 0c0-4 3.5-5 5-12Z" />
  </Svg>
);

export const IcHormone = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="15" r="5" />
    <path d="M12.5 11.5 19 5" />
    <path d="M15 5h4v4" />
  </Svg>
);

export const IcLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19c0-8 5.5-13 14-13 0 8.5-5 14-13 14" />
    <path d="M6 18c4-5 7-6.5 11-7.5" />
  </Svg>
);

export const IcScale = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14" />
    <path d="M6 9h12l-2.5 5.5a3 3 0 0 1-7 0Z" opacity=".55" />
    <path d="M5 9l3-4 4 4" />
    <circle cx="12" cy="4" r="1.4" />
  </Svg>
);
