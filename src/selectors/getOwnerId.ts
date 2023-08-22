import type { Session } from '@getsquire/sage/session';

export const getOwnerId = (session?: Session): string | null => {
  if (session?.view.kind !== 'admin') {
    return session?.view.viewer.id ?? null;
  }

  return null;
};
