import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import { useSession as useSageSession } from '@getsquire/sage/session';

export const usePropagateUserToLogs = () => {
  const session = useSageSession();

  useEffect(() => {
    if (session.data) {
      datadogRum.setUser({
        id:
          session.data?.view.kind !== 'admin' ? session.data?.view.viewer.id : undefined,
        username: session.data.user.username,
        kind: session.data.userKind,
      });
    }
  }, [session.data]);

  return session;
};
