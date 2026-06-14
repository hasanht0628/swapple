// TODO(ui): Magic-link sign-in form — email input that calls
// supabase.auth.signInWithOtp({ email, options: { emailRedirectTo:
// `${origin}/auth/callback` } }). See components/auth/MagicLinkForm.tsx.
export default function SignInPage() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-black">Sign in to Swapple</h1>
      <p className="text-sm text-muted">
        Enter your email and we’ll send you a magic link.
      </p>
      {/* PLACEHOLDER: MagicLinkForm goes here. */}
    </main>
  );
}
