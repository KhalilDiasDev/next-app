"use client";

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (session) {
      setIsLoading(true);
      await signOut({ redirect: false });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await signIn("keycloak", { redirect: false });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex items-center space-x-4">
      {status === "authenticated" && (
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>
      )}
      <Button 
        onClick={handleAuth} 
        disabled={isLoading || status === "loading"}
        className="min-w-[100px]"
      >
        {isLoading || status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : session ? (
          "Logout"
        ) : (
          "Login"
        )}
      </Button>
    </div>
  );
}
