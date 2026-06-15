"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { friendlyAuthError } from "@/lib/auth/errors";

export function ForgotPasswordForm() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });

      if (resetError) {
        setError(friendlyAuthError(resetError.message));
      } else {
        setIsSubmitted(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full max-w-sm space-y-4 text-center">
        <div className="text-4xl">📧</div>
        <div className="space-y-2">
          <h2 className="sw-h2">Check your email</h2>
          <p className="sw-sub text-sm">
            If an account exists for{" "}
            <span className="font-semibold text-foreground">{email}</span>, we&apos;ve sent a
            password reset link.
          </p>
        </div>
        <Link href="/sign-in" className="text-sm font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="sw-h1">Reset your password</h1>
        <p className="sw-sub text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            className="sw-input"
          />
        </div>

        {error && (
          <div className="sw-card rounded-[14px] bg-verdict-avoid-soft p-3 text-sm text-verdict-avoid shadow-none">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="sw-btn sw-btn-primary"
        >
          {isLoading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <div className="text-center">
        <Link href="/sign-in" className="text-sm font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
