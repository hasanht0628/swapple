import { MobileShell } from "@/components/layout/MobileShell";
import { MagicLinkForm } from "@/components/auth/MagicLinkForm";

export default function SignInPage() {
  return (
    <MobileShell>
      <div className="flex min-h-dvh items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <MagicLinkForm />
        </div>
      </div>
    </MobileShell>
  );
}