/**
 * The health-priority taxonomy. Users pick 1–3 of these during onboarding and
 * can edit them any time from Profile. Stored as `priorities text[]` on profiles
 * using the stable `id` values below.
 */

export interface Priority {
  id: string;
  label: string;
  /** Short hint shown in the OpenAI prompt to steer analysis. */
  promptHint: string;
  /** Lucide-style icon name suggestion for the UI agent. */
  icon: string;
}

export const PRIORITIES: Priority[] = [
  {
    id: "heart_health",
    label: "Heart health",
    promptHint: "saturated fat, sodium, omega-3s, cholesterol impact",
    icon: "heart",
  },
  {
    id: "blood_sugar",
    label: "Blood sugar",
    promptHint: "added sugar, glycemic load, refined carbs, fiber",
    icon: "droplet",
  },
  {
    id: "gut_health",
    label: "Gut health",
    promptHint: "fiber, fermented foods, probiotics, emulsifiers, additives",
    icon: "sprout",
  },
  {
    id: "inflammation",
    label: "Inflammation",
    promptHint: "omega-6/omega-3 ratio, ultra-processing, antioxidants",
    icon: "flame",
  },
  {
    id: "hormones",
    label: "Hormones",
    promptHint: "endocrine-disrupting additives, soy, seed oils, balance",
    icon: "venus-and-mars",
  },
  {
    id: "weight_management",
    label: "Weight management",
    promptHint: "calorie density, satiety, protein, added sugar",
    icon: "scale",
  },
  {
    id: "sustainability",
    label: "Sustainability",
    promptHint: "sourcing, packaging, carbon footprint, certifications",
    icon: "leaf",
  },
];

export const MIN_PRIORITIES = 1;
export const MAX_PRIORITIES = 3;

const PRIORITY_BY_ID = new Map(PRIORITIES.map((p) => [p.id, p]));

export function getPriority(id: string): Priority | undefined {
  return PRIORITY_BY_ID.get(id);
}

export function priorityLabel(id: string): string {
  return PRIORITY_BY_ID.get(id)?.label ?? id;
}

export function isValidPriority(id: string): boolean {
  return PRIORITY_BY_ID.has(id);
}

export function isValidPrioritySelection(ids: string[]): boolean {
  if (ids.length < MIN_PRIORITIES || ids.length > MAX_PRIORITIES) return false;
  const unique = new Set(ids);
  if (unique.size !== ids.length) return false;
  return ids.every(isValidPriority);
}
