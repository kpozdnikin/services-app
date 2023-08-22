export const mergeDuration = (durationHours: string, durationMinutes: string) =>
  parseInt(durationHours ?? '0', 10) * 60 + parseInt(durationMinutes ?? '0', 10);

export const splitDuration = (duration: number) => ({
  durationHours: Math.floor(duration / 60),
  durationMinutes: duration % 60,
});
