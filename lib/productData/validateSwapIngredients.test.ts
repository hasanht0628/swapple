import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateSwapIngredients } from "./validateSwapIngredients.ts";
import type { EnrichedProductData } from "@/types/productData";

const sugaryCereal: EnrichedProductData = {
  source: "open_food_facts",
  matched: true,
  itemName: "Honey Oat Crunch",
  ingredientsText: "oats, sugar, honey, brown sugar syrup",
  nutrients: { addedSugarsG: 24, sugarsG: 30, fiberG: 4 },
};

const plainOats: EnrichedProductData = {
  source: "open_food_facts",
  matched: true,
  itemName: "Old Fashioned Oats",
  ingredientsText: "whole grain oats",
  nutrients: { addedSugarsG: 0, sugarsG: 1, fiberG: 8 },
};

describe("validateSwapIngredients", () => {
  it("passes a lower-sugar swap for blood_sugar priority", () => {
    const result = validateSwapIngredients({
      scanned: sugaryCereal,
      swap: plainOats,
      priorities: ["blood_sugar"],
      verdict: "avoid",
    });
    assert.equal(result.pass, true);
    assert.ok(result.highlights.length > 0);
  });

  it("rejects a swap that introduces more concerning gut additives", () => {
    const clean: EnrichedProductData = {
      source: "open_food_facts",
      matched: true,
      itemName: "Plain Yogurt",
      ingredientsText: "milk, cultures",
      nutrients: {},
    };
    const worse: EnrichedProductData = {
      source: "open_food_facts",
      matched: true,
      itemName: "Flavored Yogurt",
      ingredientsText: "milk, sugar, carrageenan, polysorbate 80, cultures",
      nutrients: {},
    };

    const result = validateSwapIngredients({
      scanned: clean,
      swap: worse,
      priorities: ["gut_health"],
      verdict: "good",
    });
    assert.equal(result.pass, false);
  });
});
