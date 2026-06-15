import type { CSSProperties, ReactNode } from "react";

export interface IOSDarkModeProps {
  dark?: boolean;
}

export interface IOSStatusBarProps extends IOSDarkModeProps {
  time?: string;
}

export interface IOSGlassPillProps extends IOSDarkModeProps {
  children: ReactNode;
  style?: CSSProperties;
}

export interface IOSNavBarProps extends IOSDarkModeProps {
  title?: string;
  trailingIcon?: boolean;
}

export interface IOSListRowProps extends IOSDarkModeProps {
  title: string;
  detail?: string;
  icon?: string;
  chevron?: boolean;
  isLast?: boolean;
}

export interface IOSListProps extends IOSDarkModeProps {
  header?: string;
  children: ReactNode;
}

export interface IOSKeyboardProps extends IOSDarkModeProps {}

export interface IOSDeviceProps extends IOSDarkModeProps {
  children: ReactNode;
  width?: number;
  height?: number;
  title?: string;
  keyboard?: boolean;
  time?: string;
  className?: string;
  style?: CSSProperties;
}
