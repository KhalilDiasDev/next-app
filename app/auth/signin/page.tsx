"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("keycloak", { callbackUrl });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account using Keycloak
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error === "OAuthSignin" && "Error starting the sign in process."}
              {error === "OAuthCallback" && "Error during the sign in callback."}
              {error === "OAuthCreateAccount" && "Error creating the account."}
              {error === "EmailCreateAccount" && "Error creating the account."}
              {error === "Callback" && "Error during the callback."}
              {error === "AccessDenied" && "Access denied. You are not authorized."}
              {error === "Configuration" && "There is a problem with the server configuration."}
              {error === "Unknown" && "An unknown error occurred."}
              {!["OAuthSignin", "OAuthCallback", "OAuthCreateAccount", "EmailCreateAccount", "Callback", "AccessDenied", "Configuration", "Unknown"].includes(error) && "An error occurred during authentication."}
            </div>
          )}
          
          <Button
            className="w-full relative overflow-hidden group transition-all"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign in with Keycloak
                </>
              )}
            </span>
            <span className="absolute bottom-0 left-0 h-1 bg-primary-foreground/20 w-0 group-hover:w-full transition-all duration-300"></span>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}