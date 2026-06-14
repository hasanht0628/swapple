import OpenAI from "openai";

/**
 * Machine-readable codes the client can branch on to show actionable guidance.
 */
export type ScanErrorCode =
  | "openai_quota"
  | "openai_rate_limit"
  | "openai_auth"
  | "openai_unavailable"
  | "openai_timeout"
  | "invalid_response"
  | "analysis_failed";

export interface ScanErrorInfo {
  /** HTTP status to return from the API route. */
  status: number;
  /** Stable, machine-readable code for the client. */
  code: ScanErrorCode;
  /** Human-friendly, actionable message safe to surface to the user. */
  message: string;
}

/**
 * Translate an error thrown during scan analysis into an actionable, structured
 * response. OpenAI quota/billing and auth problems are the common operational
 * failures, so we surface them explicitly instead of a generic 502.
 */
export function describeScanError(err: unknown): ScanErrorInfo {
  if (err instanceof OpenAI.APIError) {
    const code = err.code ?? err.type ?? "";

    // Quota / billing exhausted — not retryable, needs account action.
    if (err.status === 429 && code === "insufficient_quota") {
      return {
        status: 402,
        code: "openai_quota",
        message:
          "The AI analysis service has run out of quota. Add billing or credits at platform.openai.com to continue scanning.",
      };
    }

    // Plain rate limit — retryable after a short wait.
    if (err.status === 429) {
      return {
        status: 429,
        code: "openai_rate_limit",
        message:
          "Too many requests right now. Please wait a moment and try scanning again.",
      };
    }

    // Bad / missing / revoked API key.
    if (err.status === 401 || err.status === 403) {
      return {
        status: 502,
        code: "openai_auth",
        message:
          "The AI analysis service is misconfigured (invalid API key). Please contact support.",
      };
    }

    // Upstream outage.
    if (err.status >= 500) {
      return {
        status: 503,
        code: "openai_unavailable",
        message:
          "The AI analysis service is temporarily unavailable. Please try again shortly.",
      };
    }

    return {
      status: 502,
      code: "analysis_failed",
      message: `Scan analysis failed: ${err.message}`,
    };
  }

  if (err instanceof OpenAI.APIConnectionTimeoutError) {
    return {
      status: 504,
      code: "openai_timeout",
      message: "Scan analysis timed out. Please try again.",
    };
  }

  if (err instanceof OpenAI.APIConnectionError) {
    return {
      status: 503,
      code: "openai_unavailable",
      message:
        "Couldn't reach the AI analysis service. Please check your connection and try again.",
    };
  }

  // Zod / JSON parse failures from the model's structured output.
  if (err instanceof Error && err.name === "ZodError") {
    return {
      status: 502,
      code: "invalid_response",
      message:
        "The AI returned an unexpected response. Please try scanning again.",
    };
  }

  return {
    status: 502,
    code: "analysis_failed",
    message: "Scan analysis failed. Please try again.",
  };
}
