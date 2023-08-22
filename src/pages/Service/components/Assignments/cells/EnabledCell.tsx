import { VFC } from 'react';
import classNames from 'classnames';

import { BarberAvatar, Checkbox, CheckboxSpinner } from '@app/components';

import { AssignmentTableCell } from '../types';

export const EnabledCell: VFC<Omit<AssignmentTableCell, 'changeAssignmentField'>> = ({
  assignment,
  loadingAssignments,
  toggleAssignment,
}) => {
  const { enabled, itemName, photos, parentId } = assignment;

  const onChange = () => {
    void toggleAssignment({
      ...assignment,
      enabled: !enabled,
    });
  };

  const loading = loadingAssignments[assignment.assignmentId];

  return (
    <>
      <div className={classNames('u--mr--', { 'u-ml+': parentId })}>
        {loading && <CheckboxSpinner />}
        {!loading && (
          <Checkbox
            id={assignment.assignmentId}
            checked={!!enabled}
            onChange={onChange}
          />
        )}
      </div>
      {parentId && (
        <span className="c-avatar u-mr--">
          <BarberAvatar photos={photos ?? []} />
        </span>
      )}
      <span className="u-type--semibold js-expand-shop">{itemName}</span>
    </>
  );
};
