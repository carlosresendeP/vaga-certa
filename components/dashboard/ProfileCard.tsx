"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase } from "lucide-react";
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
    <Card className="w-full overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
        <div className="absolute -bottom-10 left-6">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardHeader className="pt-12 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{user?.name}</CardTitle>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm">
            Editar Perfil
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>Desenvolvedor Full Stack (Exemplo)</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>São Paulo, SP (Exemplo)</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">TypeScript</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
