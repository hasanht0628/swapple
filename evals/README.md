# Swapple evals (Promptfoo)

[Promptfoo](https://promptfoo.dev) evals for the Swapple two-pass vision scan flow.
This suite targets the **pass‑2 analysis prompt** — the step that produces the
`good` / `caution` / `avoid` verdict and the personalized reasoning.

It deliberately reuses the **exact production prompt text and schema**:

- Prompt text: `lib/openai/prompts.ts` (`SYSTEM_PROMPT` + `buildAnalysisPrompt`)
- Output contract: `lib/openai/schema.ts` (`scanResponseSchema` zod + `SCAN_JSON_SCHEMA`)

So if a prompt or schema changes in prod, these evals change with it — no
duplicated prompt copy to drift.

## Layout

```
evals/
  promptfooconfig.yaml          # main config (provider, prompt, tests, default asserts)
  prompts/
    scanAnalysisPrompt.ts       # wraps SYSTEM_PROMPT + buildAnalysisPrompt() for promptfoo
  datasets/
    scanAnalysis.yaml           # 13 test cases (mock enriched product data + priorities)
  assertions/
    validateScanResponse.ts     # parses output with the production zod schema
    brandRecommendations.ts     # swap count, plausibility, priority fit, case keywords
    noMedicalLanguage.ts        # blocks diagnose/prescribe/cure/treatment language
    personalization.ts          # free_reason present + references user priorities
    verdictExpectation.ts       # verdict ∈ the case's expected set
  rubrics/
    brandRecommendationsCriteria.txt   # LLM judge rubric (quality eval only)
    brandRecommendationsJudgePrompt.txt
  providers/
    scanResponseFormat.json     # generated response_format (OpenAI structured output)
  output/                       # generated eval results (gitignored)
```

### Why images aren't used here

The production scan is vision-based, but this suite evals the **text reasoning**
of pass‑2 using mock `EnrichedProductData` (the same shape the OFF → USDA → GS1 →
model enrichment waterfall produces). That keeps cases deterministic, cheap, and
reviewable. Image-based cases can be added later as additional prompt files.

### Why everything is nested under `tc`

promptfoo expands **top-level array vars** into a cartesian product of test rows.
Each case nests its inputs under a single `tc` object so `priorities` / `items` /
`expected_verdicts` stay together as one row.

## Running

From the repo root:

```bash
# CI gate — deterministic keyword + schema checks (fast)
npm run eval

# Quality gate — CI checks + LLM-as-judge for brand_recommendations (slower/costlier)
npm run eval:quality

# Open the local results viewer
npm run eval:view
```

Or directly:

```bash
npx promptfoo eval -c evals/promptfooconfig.yaml --env-file .env.local
npx promptfoo eval -c evals/promptfooconfig.quality.yaml --env-file .env.local
```

### Requirements

- **`OPENAI_API_KEY`** in `.env.local` — required; the eval calls `gpt-4o` (SUT) and `gpt-4o-mini` (LLM judge in quality eval).
  The account needs available quota (a key with `insufficient_quota` returns
  HTTP 429 and every case errors).
- **`PROMPTFOO_API_KEY`** in `.env.local` — optional; only needed to publish/share
  runs to the Promptfoo cloud. Local runs work without it. Use `--no-share` to
  never upload.

## Assertions

### CI (`npm run eval` — `promptfooconfig.yaml`)

- **JSON + schema** — output parses with the production `scanResponseSchema`
  (verdict enum, impact enum, confidence range, required fields, etc.).
- **Verdict in expected set** — `tc.expected_verdicts` for the case.
- **`free_reason` present** and, when priorities are given, **`priority_tradeoffs`
  reference those priorities** (personalization).
- **No medical-claim language** — no `diagnose` / `prescribe` / `cure` /
  `medical treatment` / "you have <disease>" phrasing (including swap `why_better`
  and `tradeoffs`).
- **Brand recommendations (keywords)** — 1–3 ranked swaps per item; non-placeholder
  brand/product names; `why_better` references user priorities when set; at least
  one swap matches `tc.expected_swap_keywords`; none match `tc.forbidden_swap_keywords`
  on recommended brand + product name.
- Plus per-case `icontains-any` keyword checks (e.g. salmon → contaminant/omega).
- Default: `is-json`, a cost ceiling, and a latency ceiling.

### Quality (`npm run eval:quality` — `promptfooconfig.quality.yaml`)

Everything in the CI suite, plus:

- **Brand recommendations (LLM judge)** — `llm-rubric` graded by `gpt-4o-mini`
  using `rubrics/brandRecommendationsCriteria.txt`. The judge receives the full
  test input (`tc`: priorities, scanned items, expected/forbidden swap hints) and
  the model JSON output. Requires `score >= 0.8` and `pass: true`. Use before
  prompt changes or on a schedule — not required on every PR.

## Regenerating the response_format schema

`providers/scanResponseFormat.json` is generated from `lib/openai/schema.ts` so it
never drifts. Regenerate it if `SCAN_JSON_SCHEMA` changes:

```bash
npx tsx -e "import {SCAN_JSON_SCHEMA} from './lib/openai/schema.ts'; import {writeFileSync} from 'fs'; writeFileSync('evals/providers/scanResponseFormat.json', JSON.stringify({type:'json_schema', json_schema:SCAN_JSON_SCHEMA}, null, 2)+'\n');"
```

## Adding a test case

Append to `datasets/scanAnalysis.yaml`:

```yaml
- description: "Short description"
  vars:
    tc:
      priorities: [blood_sugar]          # ids from lib/priorities.ts
      expected_verdicts: [avoid, caution]
      expected_swap_keywords: [oats, unsweetened, plain]   # at least one swap must match
      forbidden_swap_keywords: [honey oat]                 # optional blocklist
      items:
        - item_name: "Product name"
          brand_name: "Brand"
          enriched:                       # EnrichedProductData (types/productData.ts)
            source: open_food_facts
            matched: true
            ingredientsText: "..."
            nutrients: { sugarsG: 30, addedSugarsG: 24 }
  assert:
    - { type: javascript, value: file://assertions/validateScanResponse.ts }
    - { type: javascript, value: file://assertions/noMedicalLanguage.ts }
    - { type: javascript, value: file://assertions/personalization.ts }
    - { type: javascript, value: file://assertions/verdictExpectation.ts }
```
