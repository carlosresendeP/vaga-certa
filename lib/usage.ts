import { prisma } from "./prisma";

/**
 * Retrieves the user's usage stats.
 * If the current date is in a different month/year than the `lastReset` date,
 * the usage counters (resumeUploads, resumeAnalyzed) are reset to 0.
 */
export async function getAndCheckUserUsage(userId: string) {
  let usage = await prisma.userUsage.findUnique({
    where: { userId },
  });

  if (!usage) {
    // If no usage record exists, return a default mock object or create one?
    // Use upsert pattern in calling code usually, but here we read.
    // Let's return null to let caller handle it (e.g. treat as 0).
    return null;
  }

  const now = new Date();
  const lastReset = new Date(usage.lastReset);

  const isSameMonth =
    now.getMonth() === lastReset.getMonth() &&
    now.getFullYear() === lastReset.getFullYear();

  if (!isSameMonth) {
    // Reset usage
    usage = await prisma.userUsage.update({
      where: { userId },
      data: {
        resumeUploads: 0,
        resumeAnalyzed: 0,
        lastReset: now,
      },
    });
  }

  return usage;
}
