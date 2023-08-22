import { VFC } from 'react';

import { CheckboxSwitch } from '@app/components';

import { AssignmentTableCell } from '../types';

export const KioskCell: VFC<Omit<AssignmentTableCell, 'toggleAssignment'>> = ({
  assignment,
  changeAssignmentField,
  loadingAssignments,
}) => {
  const { kioskEnabled } = assignment;

  if (assignment.parentId) {
    return null;
  }

  const onChange = () => {
    void changeAssignmentField({
      ...assignment,
      kioskEnabled: !kioskEnabled,
    });
  };

  return (
    <CheckboxSwitch
      className="u--mr--"
      checked={!!kioskEnabled}
      disabled={loadingAssignments[assignment.assignmentId] || !assignment.enabled}
      onChange={onChange}
    />
  );
};
