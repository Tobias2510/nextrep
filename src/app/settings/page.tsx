import AppearanceSection from "@/components/settings/appearance-section";
import DangerZoneSection from "@/components/settings/danger-zone-section";
import PasswordSection from "@/components/settings/password-section-from";
import ProfileSection from "@/components/settings/profile-section-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { name, email } = session.user;

  return (
    <div className="min-h-svh px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <header className="mb-6 flex items-center gap-3">
          <Link
            href="/sessions"
            className="text-muted-foreground hover:text-foreground -ml-1 flex size-9 items-center justify-center rounded-lg transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span className="sr-only">Back to sessions</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </header>
        <div className="flex flex-col gap-8">
          <ProfileSection name={name} email={email} />
          <Separator />
          <PasswordSection />
          <Separator />
          <AppearanceSection />
          <Separator />
          <DangerZoneSection />
        </div>
      </div>
    </div>
  );
}
