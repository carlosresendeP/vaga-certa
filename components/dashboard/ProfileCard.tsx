"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { User } from "better-auth";

interface ProfileCardProps {
  user?: User;
}

export function ProfileCard({ user: initialUser }: ProfileCardProps) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const user = initialUser || session?.user;

  return (
    <Card className="w-full  overflow-hidden">
      <CardHeader>
        <CardTitle>Bem-vindo, {user?.name?.split(" ")[0]}</CardTitle>
      </CardHeader>
      <div className="flex items-center gap-4 mx-3">
        <Avatar className="h-12 w-12 border-background">
          <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
          <AvatarFallback className="text-xl bg-primary/10 text-primary">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <CardHeader className="p-0">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{user?.name?.split(" ")[0]}</CardTitle>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
}
