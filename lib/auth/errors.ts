/**
 * Maps Supabase auth error messages to user-friendly copy.
 */
export function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login credentials")) {
    return "Incorrect email or password. Please try again.";
  }
  if (lower.includes("user already registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (lower.includes("password") && lower.includes("least")) {
    return "Password must be at least 6 characters.";
  }
  if (lower.includes("429") || lower.includes("rate limit")) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in. Check your inbox for the confirmation link.";
  }

  return message;
}

export const AUTH_QUERY_ERRORS: Record<string, string> = {
  missing_code: "Sign-in link was invalid or expired. Please try again.",
  auth: "Sign-in failed. Please try again.",
  password_updated: "Your password has been updated. You can sign in now.",
};
