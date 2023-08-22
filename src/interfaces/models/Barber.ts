import { Barber } from '@getsquire/sage/types';

export interface BarberPhoto {
  thumbnail: string;
}

export interface BarberWithPhotos extends Barber {
  photos: BarberPhoto[];
}
