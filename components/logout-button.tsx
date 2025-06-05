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
      
      // Clear localStorage
      localStorage.clear();
      
      // Call logout API
      const response = await fetch(`/api/logout?id_token=${session?.idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Sign out from NextAuth
        await signOut({ redirect: false });
        
        // Redirect to Keycloak logout
        window.location.href = data.path;
      } else {
        throw new Error('Failed to logout');
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