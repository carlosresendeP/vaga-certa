"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "better-auth";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.updateUser({
        name: name,
      });
      // Note: Email update might require verification flow depending on auth config
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="grid gap-4 max-w-md">
      <div className="grid gap-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled // Disable email change for now or handle properly
        />
        <p className="text-xs text-muted-foreground">
          Para alterar seu e-mail, entre em contato com o suporte ou aguarde a
          implementação futura.
        </p>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
}
