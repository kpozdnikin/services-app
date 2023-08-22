import { VFC } from 'react';

import { CheckboxSwitch } from '@app/components';

import { AssignmentTableCell } from '../types';

export const VisibilityCell: VFC<Omit<AssignmentTableCell, 'toggleAssignment'>> = ({
  assignment,
  changeAssignmentField,
  loadingAssignments,
}) => {
  const { enabled, visibility } = assignment;

  const onChange = () => {
    void changeAssignmentField({
      ...assignment,
      visibility: !visibility,
    });
  };

  return (
    <CheckboxSwitch
      checked={!!visibility}
      className="u--mr--"
      disabled={loadingAssignments[assignment.assignmentId] || !enabled}
      onChange={onChange}
    />
  );
};
