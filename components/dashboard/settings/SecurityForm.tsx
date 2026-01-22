"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function SecurityForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Erro ao atualizar senha.");
      } else {
        toast.success("Senha atualizada com sucesso!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      toast.error("Erro inesperado ao atualizar senha.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdatePassword} className="grid gap-4 max-w-md">
      <div className="grid gap-2">
        <Label htmlFor="current-password">Senha Atual</Label>
        <Input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="new-password">Nova Senha</Label>
        <Input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Atualizando..." : "Atualizar Senha"}
        </Button>
      </div>
    </form>
  );
}
