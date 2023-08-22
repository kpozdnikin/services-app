import compact from 'lodash/compact';
import first from 'lodash/first';
import truncate from 'lodash/truncate';

export const fullName = (
  struct: { firstName?: string; lastName?: string },
  truncated = false,
) => {
  if (!struct) {
    return '';
  }

  const { firstName, lastName } = struct;
  const name = compact([firstName, truncated ? first(lastName) : lastName]).join(' ');

  return truncated
    ? truncate(name, {
        length: 35,
        separator: ' ',
      })
    : name;
};
