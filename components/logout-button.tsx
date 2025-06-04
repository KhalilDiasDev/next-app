"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Loader2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      const idToken = session?.idToken;
      if (idToken) {
        const issuer = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || process.env.KEYCLOAK_ISSUER;
        const logoutUrl = `${issuer}/protocol/openid-connect/logout`;
        console.log(logoutUrl);
        
        
        await signOut({
          redirect: false,
        });

        window.location.href = `${logoutUrl}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;

      } else {
        await signOut({
          redirect: true,
          callbackUrl: "/"
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      await signOut({
        redirect: true,
        callbackUrl: "/"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center space-x-4">
    
      <Button 
        onClick={handleLogout} 
        disabled={isLoading || status !== "authenticated"}
        variant="destructive"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Logout"}
      </Button>
    </div>
  );
}