import { headers } from "next/headers";
import {
  createSafeActionClient,
} from "next-safe-action";
import { z } from "zod";
import { auth } from "./auth";

export const actionClient = createSafeActionClient();

export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Não autorizado. Por favor, faça login.");
  }

  return next({ ctx: { user: session.user } });
});
