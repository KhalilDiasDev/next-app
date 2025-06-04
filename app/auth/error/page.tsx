"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support.";
      case "AccessDenied":
        return "You do not have access to this resource.";
      case "Verification":
        return "The verification failed. Try signing in again.";
      case "OAuthSignin":
        return "Error starting the OAuth sign in process.";
      case "OAuthCallback":
        return "Error during the OAuth callback process.";
      case "OAuthCreateAccount":
        return "Error creating the OAuth account.";
      case "Callback":
        return "Error during the callback process.";
      case "OAuthAccountNotLinked":
        return "This account is already linked to another user.";
      case "SessionRequired":
        return "You must be signed in to access this page.";
      default:
        return "An unknown error occurred during authentication.";
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-destructive/10 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md text-sm">
            <p className="font-medium">Error: {error}</p>
            <p className="mt-2 text-muted-foreground">{getErrorMessage()}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}