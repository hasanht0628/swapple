import { AuthForm } from "@/components/auth/AuthForm";
import { AUTH_QUERY_ERRORS } from "@/lib/auth/errors";

interface SignInPageProps {
  searchParams: Promise<{ error?: string; message?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const initialError = params.error
    ? (AUTH_QUERY_ERRORS[params.error] ?? "Something went wrong. Please try again.")
    : null;
  const initialMessage = params.message
    ? (AUTH_QUERY_ERRORS[params.message] ?? null)
    : null;

  return <AuthForm initialError={initialError} initialMessage={initialMessage} />;
}
