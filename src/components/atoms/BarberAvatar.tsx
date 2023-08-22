import { VFC, useState, useEffect, useCallback } from 'react';

import { CustomerIcon } from '@app/assets/svgs';
import { BarberPhoto } from '@app/interfaces';

export interface BarberAvatarProps {
  photos: BarberPhoto[];
}

export const BarberAvatar: VFC<BarberAvatarProps> = ({ photos }) => {
  const [imgSrc, setImgSrc] = useState<string>(CustomerIcon);

  const checkImageBeforeLoad = useCallback(
    (url: string) => {
      const image = new Image();

      image.onload = () => {
        setImgSrc(photos?.[0]?.thumbnail);
      };

      image.src = url;
    },
    [photos],
  );

  useEffect(() => {
    if (photos?.[0]?.thumbnail) {
      checkImageBeforeLoad(photos?.[0]?.thumbnail);
    }
  }, [checkImageBeforeLoad, photos]);

  return <img alt="barber-avatar" className="c-avatar-image" src={imgSrc} />;
};
