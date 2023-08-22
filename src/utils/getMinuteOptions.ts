import range from 'lodash/range';

export const getMinuteOptionsForMinInterval = (minInterval = 5) => {
  const minuteOptions = range(0, 60 + minInterval, minInterval);
  const minuteOptionsNoZero = minuteOptions.slice(1);

  return { minuteOptions, minuteOptionsNoZero };
};

export const DEFAULT_MIN_INTERVAL = 5;
