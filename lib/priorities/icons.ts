import type { ComponentType } from "react";
import {
  IcHeart,
  IcDrop,
  IcGut,
  IcFlame,
  IcHormone,
  IcLeaf,
  IcScale,
  type IconProps,
} from "@/components/icons";

/** Priority icons keyed by stable `id` from `lib/priorities.ts`. */
export const PRIORITY_ICONS_BY_ID: Record<string, ComponentType<IconProps>> = {
  heart_health: IcHeart,
  blood_sugar: IcDrop,
  gut_health: IcGut,
  inflammation: IcFlame,
  hormones: IcHormone,
  weight_management: IcScale,
  sustainability: IcLeaf,
};

/** Priority icons keyed by display label (matches reference `PRIORITY_ICONS`). */
export const PRIORITY_ICONS_BY_LABEL: Record<string, ComponentType<IconProps>> = {
  "Heart health": IcHeart,
  "Blood sugar": IcDrop,
  "Gut health": IcGut,
  Inflammation: IcFlame,
  Hormones: IcHormone,
  "Weight management": IcScale,
  Sustainability: IcLeaf,
};

/** @deprecated Prefer `PRIORITY_ICONS_BY_LABEL` — alias for reference parity. */
export const PRIORITY_ICONS = PRIORITY_ICONS_BY_LABEL;

export function getPriorityIcon(id: string): ComponentType<IconProps> | undefined {
  return PRIORITY_ICONS_BY_ID[id];
}

export function getPriorityIconByLabel(
  label: string,
): ComponentType<IconProps> | undefined {
  return PRIORITY_ICONS_BY_LABEL[label];
}
