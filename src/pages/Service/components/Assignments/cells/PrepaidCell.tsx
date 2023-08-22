import { VFC } from 'react';

import { CheckboxSwitch } from '@app/components';

import { AssignmentTableCell } from '../types';

export const PrepaidCell: VFC<Omit<AssignmentTableCell, 'toggleAssignment'>> = ({
  assignment,
  changeAssignmentField,
  loadingAssignments,
}) => {
  const { requiresPrepaid } = assignment;

  const onChange = () => {
    void changeAssignmentField({
      ...assignment,
      requiresPrepaid: !requiresPrepaid,
    });
  };

  return (
    <CheckboxSwitch
      className="u--mr--"
      checked={!!requiresPrepaid}
      disabled={loadingAssignments[assignment.assignmentId] || !assignment.enabled}
      onChange={onChange}
    />
  );
};
