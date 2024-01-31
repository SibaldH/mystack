"use client";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const params = useSearchParams()
  const next = params.get("next")
  const handleLoginOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: location.origin + "/auth/callback?next=" + next},
    }); // TODO: InWithOAuth({ provider });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-96 rounded-md border p-5 space-y-5 bg-slate-900">
        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className="text-2xl font-bold">Next + Supabase</h1>
        </div>
        <p className="text-sm text-gray-300">Register/SignIn today</p>
        <div className="flex flex-col gap-5">
          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleLoginOAuth("github")}
          >
            <FaGithub />
            Github
          </Button>
          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleLoginOAuth("google")}
          >
            <FaGoogle />
            Google
          </Button>
        </div>
      </div>
    </div>
  );
}
