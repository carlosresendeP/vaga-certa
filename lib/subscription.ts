// Define a subset of User type that we need, or use the full User type
// We accept any object that has plan and planExpiresAt
export interface UserWithPlan {
  plan: string | null;
  planExpiresAt: Date | string | null;
  email: string | null;
}

/**
 * Checks if a user has an active PRO subscription.
 * A user is PRO if:
 * 1. Their plan is 'PRO'
 * 2. AND (their planExpiresAt is null OR planExpiresAt is in the future)
 *
 * Note: planExpiresAt null for PRO usually means lifetime or indefinite,
 * but in our webhook logic we set it. If it's null, we assume valid for safety
 * unless the specific business rule implies PRO always has an expiry.
 * Based on webhook, PRO 'order_approved' sets it +30 days.
 * If manual DB edit sets PRO without date, we trust it as PRO.
 */
export function isUserPro(user: UserWithPlan | null | undefined): boolean {
  if (!user) return false;

  if (user.plan !== "PRO") return false;

  // If user is PRO, check expiration
  if (!user.planExpiresAt) {
    // No expiration date set for a PRO user -> Assume active (e.g. lifetime or manual override)
    return true;
  }

  const now = new Date();
  const expiresAt = new Date(user.planExpiresAt);

  // Valid if expiration is in the future
  return expiresAt > now;
}
