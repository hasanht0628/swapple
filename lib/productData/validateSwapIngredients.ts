import { priorityLabel } from "@/lib/priorities";
import type { EnrichedProductData, ProductNutrients } from "@/types/productData";
import type { Verdict } from "@/types/scan";

const GUT_ADDITIVE_PATTERNS = [
  /\bcarrageenan\b/i,
  /\bpolysorbate\b/i,
  /\bsorbate\b/i,
  /\bmodified starch\b/i,
  /\bartificial (color|flavor|flavour)\b/i,
  /\bhigh fructose corn syrup\b/i,
  /\bhydrolyzed\b/i,
];

const INFLAMMATION_CONCERNS = [
  /\bpartially hydrogenated\b/i,
  /\binteresterified\b/i,
  /\bartificial (color|flavor|flavour)\b/i,
  /\bhigh fructose corn syrup\b/i,
];

export interface SwapValidationResult {
  pass: boolean;
  highlights: string[];
  reasons: string[];
}

function num(value: number | null | undefined): number | null {
  return value == null || Number.isNaN(value) ? null : value;
}

function lowerIsBetter(
  scanned: number | null,
  swap: number | null,
): boolean | null {
  if (scanned == null || swap == null) return null;
  return swap < scanned;
}

function higherIsBetter(
  scanned: number | null,
  swap: number | null,
): boolean | null {
  if (scanned == null || swap == null) return null;
  return swap > scanned;
}

function countPatternMatches(text: string, patterns: RegExp[]): number {
  return patterns.reduce((count, pattern) => (pattern.test(text) ? count + 1 : count), 0);
}

function compareNutrients(args: {
  scanned: ProductNutrients | undefined;
  swap: ProductNutrients | undefined;
  priorityId: string;
}): { pass: boolean | null; highlight?: string; reason?: string } {
  const s = args.scanned ?? {};
  const c = args.swap ?? {};

  switch (args.priorityId) {
    case "blood_sugar": {
      const added = lowerIsBetter(num(s.addedSugarsG), num(c.addedSugarsG));
      const sugars = lowerIsBetter(num(s.sugarsG), num(c.sugarsG));
      const fiber = higherIsBetter(num(s.fiberG), num(c.fiberG));
      if (added === true || sugars === true || fiber === true) {
        return {
          pass: true,
          highlight: "lower sugar and/or higher fiber",
        };
      }
      if (added === false || sugars === false) {
        return { pass: false, reason: "swap is not lower in sugar" };
      }
      return { pass: null };
    }
    case "heart_health": {
      const satFat = lowerIsBetter(num(s.saturatedFatG), num(c.saturatedFatG));
      const sodium = lowerIsBetter(num(s.sodiumMg), num(c.sodiumMg));
      if (satFat === true || sodium === true) {
        return { pass: true, highlight: "lower saturated fat and/or sodium" };
      }
      if (satFat === false || sodium === false) {
        return { pass: false, reason: "swap is not better for heart health nutrients" };
      }
      return { pass: null };
    }
    case "weight_management": {
      const kcal = lowerIsBetter(num(s.energyKcal), num(c.energyKcal));
      const protein = higherIsBetter(num(s.proteinG), num(c.proteinG));
      const added = lowerIsBetter(num(s.addedSugarsG), num(c.sugarsG));
      if (kcal === true || protein === true || added === true) {
        return {
          pass: true,
          highlight: "better calorie density, protein, or sugar profile",
        };
      }
      if (kcal === false && protein === false && added === false) {
        return { pass: false, reason: "swap is not better for weight management" };
      }
      return { pass: null };
    }
    case "gut_health": {
      const fiber = higherIsBetter(num(s.fiberG), num(c.fiberG));
      if (fiber === true) {
        return { pass: true, highlight: "higher fiber" };
      }
      return { pass: null };
    }
    default:
      return { pass: null };
  }
}

function compareIngredientsForPriority(args: {
  scannedText: string;
  swapText: string;
  priorityId: string;
}): { pass: boolean | null; highlight?: string; reason?: string } {
  const scanned = args.scannedText.toLowerCase();
  const swap = args.swapText.toLowerCase();

  switch (args.priorityId) {
    case "gut_health": {
      const scannedAdditives = countPatternMatches(scanned, GUT_ADDITIVE_PATTERNS);
      const swapAdditives = countPatternMatches(swap, GUT_ADDITIVE_PATTERNS);
      if (swapAdditives < scannedAdditives) {
        return { pass: true, highlight: "fewer emulsifiers/additives" };
      }
      if (/\b(probiotic|culture|ferment)/i.test(swap) && !/\b(probiotic|culture|ferment)/i.test(scanned)) {
        return { pass: true, highlight: "contains probiotics or live cultures" };
      }
      if (swapAdditives > scannedAdditives) {
        return { pass: false, reason: "swap has more concerning additives" };
      }
      return { pass: null };
    }
    case "inflammation": {
      const scannedBad = countPatternMatches(scanned, INFLAMMATION_CONCERNS);
      const swapBad = countPatternMatches(swap, INFLAMMATION_CONCERNS);
      if (swapBad < scannedBad) {
        return { pass: true, highlight: "fewer ultra-processed ingredients" };
      }
      if (/\b(organic|extra virgin olive oil|omega-3|omega 3|wild)/i.test(swap)) {
        return { pass: true, highlight: "cleaner anti-inflammatory profile" };
      }
      if (swapBad > scannedBad) {
        return { pass: false, reason: "swap has more inflammatory ingredients" };
      }
      return { pass: null };
    }
    case "blood_sugar": {
      if (/\b(no added sugar|unsweetened|stevia|monk fruit)\b/i.test(swap)) {
        return { pass: true, highlight: "lower added sugar ingredients" };
      }
      if (/\b(sugar|corn syrup|dextrose|honey|molasses)\b/i.test(swap) && !/\b(sugar|corn syrup|dextrose|honey|molasses)\b/i.test(scanned)) {
        return { pass: false, reason: "swap introduces added sugars" };
      }
      return { pass: null };
    }
    case "heart_health": {
      if (/\b(wild|omega-3|omega 3|sardine|mackerel|alaskan)\b/i.test(swap)) {
        return { pass: true, highlight: "better omega-3 profile" };
      }
      if (/\b(palm oil|partially hydrogenated|shortening)\b/i.test(swap) && !/\b(palm oil|partially hydrogenated|shortening)\b/i.test(scanned)) {
        return { pass: false, reason: "swap adds heart-unfriendly fats" };
      }
      return { pass: null };
    }
    default:
      return { pass: null };
  }
}

/**
 * Validates that a candidate swap is directionally better (or comparable for
 * `good` verdicts) for the user's priorities using nutrients + ingredient text.
 */
export function validateSwapIngredients(args: {
  scanned: EnrichedProductData | undefined;
  swap: EnrichedProductData;
  priorities: string[];
  verdict: Verdict;
}): SwapValidationResult {
  const highlights: string[] = [];
  const reasons: string[] = [];
  const priorityIds =
    args.priorities.length > 0
      ? args.priorities
      : ["gut_health"]; // general healthfulness fallback

  let positiveSignals = 0;
  let negativeSignals = 0;

  const scannedText = args.scanned?.ingredientsText ?? "";
  const swapText = args.swap.ingredientsText ?? "";

  for (const priorityId of priorityIds) {
    const nutrientCheck = compareNutrients({
      scanned: args.scanned?.nutrients,
      swap: args.swap.nutrients,
      priorityId,
    });
    if (nutrientCheck.pass === true && nutrientCheck.highlight) {
      positiveSignals += 1;
      highlights.push(`${priorityLabel(priorityId)}: ${nutrientCheck.highlight}`);
    }
    if (nutrientCheck.pass === false && nutrientCheck.reason) {
      negativeSignals += 1;
      reasons.push(nutrientCheck.reason);
    }

    if (swapText) {
      const ingredientCheck = compareIngredientsForPriority({
        scannedText,
        swapText,
        priorityId,
      });
      if (ingredientCheck.pass === true && ingredientCheck.highlight) {
        positiveSignals += 1;
        highlights.push(`${priorityLabel(priorityId)}: ${ingredientCheck.highlight}`);
      }
      if (ingredientCheck.pass === false && ingredientCheck.reason) {
        negativeSignals += 1;
        reasons.push(ingredientCheck.reason);
      }
    }
  }

  if (args.verdict === "good") {
    if (negativeSignals > 0) {
      return { pass: false, highlights, reasons };
    }
    if (positiveSignals > 0 || swapText.length > 0) {
      return { pass: true, highlights, reasons };
    }
    return {
      pass: false,
      highlights,
      reasons: ["swap lacks ingredient evidence for a comparable good option"],
    };
  }

  if (negativeSignals > 0) {
    return { pass: false, highlights, reasons };
  }

  if (positiveSignals > 0) {
    return { pass: true, highlights, reasons };
  }

  if (swapText.length >= 8) {
    return {
      pass: true,
      highlights: ["ingredients available for review"],
      reasons,
    };
  }

  return {
    pass: false,
    highlights,
    reasons: ["could not confirm swap is better for user priorities"],
  };
}

export function buildVerifiedWhyBetter(args: {
  brand: string;
  productName: string;
  highlights: string[];
  originalWhyBetter: string;
}): string {
  if (args.highlights.length === 0) return args.originalWhyBetter;
  const lead = args.highlights.slice(0, 2).join("; ");
  return `${args.brand} ${args.productName} — ${lead}.`;
}
