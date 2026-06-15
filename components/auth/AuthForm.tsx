"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { friendlyAuthError } from "@/lib/auth/errors";
import { getPostAuthPath } from "@/lib/auth/redirectAfterAuth";

type AuthMode = "sign-in" | "sign-up";

interface AuthFormProps {
  initialError?: string | null;
  initialMessage?: string | null;
}

export function AuthForm({ initialError, initialMessage }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const resetFormState = () => {
    setError(null);
    setMessage(null);
    setAwaitingConfirmation(false);
  };

  const handleSignIn = async () => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(friendlyAuthError(signInError.message));
      return;
    }

    const path = await getPostAuthPath(supabase);
    router.push(path);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(friendlyAuthError(signUpError.message));
      return;
    }

    if (data.session) {
      const path = await getPostAuthPath(supabase);
      router.push(path);
      return;
    }

    setAwaitingConfirmation(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "sign-in") {
        await handleSignIn();
      } else {
        await handleSignUp();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetFormState();
    setPassword("");
    setConfirmPassword("");
  };

  if (awaitingConfirmation) {
    return (
      <div className="space-y-4 text-center">
        <div className="text-4xl">📧</div>
        <div className="space-y-2">
          <h2 className="sw-h2">Check your email</h2>
          <p className="sw-sub text-sm">
            We&apos;ve sent a confirmation link to{" "}
            <span className="font-semibold text-foreground">{email}</span>. Click it to activate
            your account.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAwaitingConfirmation(false);
            setMode("sign-in");
          }}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="sw-h1">
          Welcome to{" "}
          <Link href="/" className="hover:opacity-80">
            Swa<span className="text-primary">pp</span>le
          </Link>
        </h1>
        <p className="sw-sub text-sm">
          {mode === "sign-in"
            ? "Sign in to your account"
            : "Create your account to get started"}
        </p>
      </div>

      {message && (
        <div className="sw-card rounded-[14px] bg-verdict-good-soft p-3 text-sm text-verdict-good shadow-none">
          {message}
        </div>
      )}

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            {mode === "sign-in" && (
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            className="sw-input"
          />
        </div>

        {mode === "sign-up" && (
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-semibold">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete="new-password"
              className="sw-input"
            />
          </div>
        )}

        {error && (
          <div className="sw-card rounded-[14px] bg-verdict-avoid-soft p-3 text-sm text-verdict-avoid shadow-none">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isLoading ||
            !email.trim() ||
            !password ||
            (mode === "sign-up" && !confirmPassword)
          }
          className="sw-btn sw-btn-primary"
        >
          {isLoading
            ? mode === "sign-in"
              ? "Signing in..."
              : "Creating account..."
            : mode === "sign-in"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <div className="space-y-2 text-center">
        <p className="text-sm text-muted">
          {mode === "sign-in" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("sign-up")}
                className="font-semibold text-primary hover:underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("sign-in")}
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
        <p className="text-xs text-muted">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </div>
    </div>
  );
}
