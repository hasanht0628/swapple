"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const supabase = createClient();

  // Cooldown timer effect
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => {
        setCooldownSeconds(cooldownSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        // Check for rate limit errors and show user-friendly message
        if (error.message?.includes("429") || error.message?.toLowerCase().includes("rate limit")) {
          setError("Too many login emails sent. Please wait a few minutes and try again.");
        } else {
          setError(error.message);
        }
      } else {
        setIsSubmitted(true);
        setCooldownSeconds(10); // 10 second cooldown
      }
    } catch (err) {
      // Handle fetch errors that might not be caught by Supabase client
      if (err instanceof Error && err.message?.includes("429")) {
        setError("Too many login emails sent. Please wait a few minutes and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="text-4xl">📧</div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Check your email</h2>
          <p className="text-muted text-sm">
            We&apos;ve sent a sign-in link to <span className="font-medium">{email}</span>
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setEmail("");
            setError(null);
            setCooldownSeconds(0);
          }}
          className="text-sm text-primary hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          Welcome to Swa<span className="text-primary">pp</span>le
        </h1>
        <p className="text-muted text-sm">Sign in with your email to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-verdict-avoid-soft border border-verdict-avoid/20 p-3 text-sm text-verdict-avoid">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email.trim() || cooldownSeconds > 0}
          className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? "Sending..." 
            : cooldownSeconds > 0
              ? `Wait ${cooldownSeconds}s`
              : "Send sign-in link"
          }
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-muted">
          By signing in, you agree to our terms and privacy policy.
        </p>
      </div>
    </div>
  );
}