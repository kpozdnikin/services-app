import { useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { BasenameContext } from '@app/contexts';
import { useCommanderNavigation } from '@app/hooks/useCommanderNavigation';

interface CustomEvent extends Event {
  detail?: {
    type: 'delete' | 'navigate' | 'submit';
    data: string;
  };
}

type Submit = () => Promise<void>;

export const useEventHandler = (
  handleSubmit: Submit | null,
  handleDelete?: (serviceId: string) => Promise<void>,
) => {
  const navigate = useNavigate();
  const basename = useContext(BasenameContext);
  const handleNavigate = useCommanderNavigation();

  const handleEvent = useCallback(
    async ({ detail }: CustomEvent) => {
      if (detail?.type === 'navigate') {
        const url = detail.data?.replace(basename!, '') || '/';

        navigate(url);
      }

      if (detail?.type === 'submit' && handleSubmit) {
        await handleSubmit();
      }

      if (detail?.type === 'delete' && handleDelete) {
        await handleDelete(detail.data);

        handleNavigate(`/`);
      }
    },
    [handleSubmit, handleDelete, basename, navigate, handleNavigate],
  );

  useEffect(() => {
    window.document.addEventListener('navigate-services-app', handleEvent);

    return () =>
      window.document.removeEventListener('navigate-services-app', handleEvent);
  }, [handleEvent]);
};
