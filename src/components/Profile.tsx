"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { PROTECTEDPATHS } from "@/lib/constant";

export default function Profile() {
  const { isFetching, data: user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  if (isFetching) return null;

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();

    if (PROTECTEDPATHS.includes(pathname)) {
      router.replace("/auth?next=" + pathname);
    }
  };
  return (
    <div className="">
      {!user?.id ? (
        <Button variant="outline" className="animate-fade">
          <Link href="/auth">SignIn</Link>
        </Button>
      ) : (
        <Button variant={null} onClick={handleLogout}>
          {user.image_url ? (
            <Image
              src={user.image_url || ""}
              alt={user.display_name || ""}
              width={50}
              height={50}
              className="rounded-full animate-fade ring-2"
            />
          ) : (
            <div className="h-[50px] w-[50px] flex items-center justify-center ring-2 rounded-full text-2xl font-bold">
              <h1>{user.email[0]}</h1>
            </div>
          )}
        </Button>
      )}
    </div>
  );
}
