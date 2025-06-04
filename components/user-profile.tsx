"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfile() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <ProfileSkeleton />;
  }
  
  const user = session?.user;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your session information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="text-lg">{getUserInitials(user?.name)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 text-center">
            <h3 className="font-medium text-lg">{user?.name || "Anonymous User"}</h3>
            <p className="text-sm text-muted-foreground">{user?.email || "No email available"}</p>
          </div>
          
          <div className="w-full pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Session Info</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Status: <span className="text-green-500">Active</span></p>
              <p>Provider: Keycloak</p>
              <p>Session Type: JWT</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getUserInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-[140px]" />
        <Skeleton className="h-4 w-[180px] mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2 text-center w-full">
            <Skeleton className="h-5 w-[120px] mx-auto" />
            <Skeleton className="h-4 w-[160px] mx-auto" />
          </div>
          <div className="w-full pt-4 border-t">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}