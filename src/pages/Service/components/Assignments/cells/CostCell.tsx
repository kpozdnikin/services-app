import { useEffect, useState, VFC } from 'react';

import { CurrencyInput } from '@app/components';

import { AssignmentTableCell } from '../types';

export const CostCell: VFC<Omit<AssignmentTableCell, 'toggleAssignment'>> = ({
  assignment,
  changeAssignmentField,
  loadingAssignments,
}) => {
  const [localPrice, setLocalPrice] = useState<string | undefined>(
    assignment.cost ? assignment.cost.toString() : '0',
  );

  const onBlurField = () => {
    void changeAssignmentField({
      ...assignment,
      cost: parseFloat(localPrice ?? '0'),
    });
  };

  useEffect(() => {
    if (assignment?.cost) {
      setLocalPrice(assignment.cost.toString());
    }
  }, [assignment.cost]);

  return (
    <CurrencyInput
      className="c-input"
      disabled={loadingAssignments[assignment.assignmentId] || !assignment.enabled}
      name="cost"
      placeholder="0"
      setValue={setLocalPrice}
      value={parseFloat(localPrice ?? '0')}
      onBlur={onBlurField}
    />
  );
};
