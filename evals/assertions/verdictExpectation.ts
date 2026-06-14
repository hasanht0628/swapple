/**
 * Per-test-case verdict expectation. Reads `expected_verdicts` (a list of
 * acceptable verdicts) from the test vars and asserts the primary item's verdict
 * falls within that set. Verdicts are inherently a bit subjective, so each case
 * allows a small acceptable set (e.g. ["caution","avoid"]).
 */
export default function verdictExpectation(
  output: string,
  context: { vars?: { tc?: { expected_verdicts?: string[] } } },
) {
  let parsed: { items?: Array<{ item_name?: string; verdict?: string }> };
  try {
    parsed = typeof output === "string" ? JSON.parse(output) : (output as never);
  } catch {
    return { pass: false, score: 0, reason: "Output is not valid JSON" };
  }

  const expected = context.vars?.tc?.expected_verdicts ?? [];

  if (expected.length === 0) {
    return { pass: true, score: 1, reason: "No expected_verdicts specified" };
  }

  const first = parsed.items?.[0];
  if (!first?.verdict) {
    return { pass: false, score: 0, reason: "No verdict on first item" };
  }

  if (!expected.includes(first.verdict)) {
    return {
      pass: false,
      score: 0,
      reason: `Verdict "${first.verdict}" for "${first.item_name}" not in expected [${expected.join(", ")}]`,
    };
  }

  return {
    pass: true,
    score: 1,
    reason: `Verdict "${first.verdict}" is within expected [${expected.join(", ")}]`,
  };
}
