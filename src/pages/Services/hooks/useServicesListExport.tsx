import { useSession } from '@getsquire/sage/session';

import { useServiceApp } from '@app/hooks';

export const useServicesListExport = () => {
  const sessionQuery = useSession();
  const session = sessionQuery.data;
  const api = useServiceApp();
  const hook = api.listExport.hook;
  const payload = api?.listExport?.buildPayload(session?.user.username);

  return hook(payload);
};
