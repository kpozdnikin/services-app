import { ChangeEvent, VFC } from 'react';
import styled from 'styled-components';
import without from 'lodash/without';
import range from 'lodash/range';

import { SelectInput } from '@app/components';
import { mergeDuration, splitDuration } from '@app/utils';

import { AssignmentTableCell } from '../types';

export const DurationCell: VFC<Omit<AssignmentTableCell, 'toggleAssignment'>> = ({
  assignment,
  changeAssignmentField,
  loadingAssignments,
}) => {
  const { durationHours, durationMinutes } = splitDuration(assignment.duration ?? 0);

  const onChangeHours = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    void changeAssignmentField({
      ...assignment,
      duration: mergeDuration(val, durationMinutes.toString()),
    });
  };

  const onChangeMinutes = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    void changeAssignmentField({
      ...assignment,
      duration: mergeDuration(durationHours.toString(), val),
    });
  };

  const minutes =
    Number(durationHours) < 1
      ? without(assignment.minuteOptions, 5)
      : assignment.minuteOptions;

  return (
    <Wrapper>
      <SelectInput
        disabled={loadingAssignments[assignment.assignmentId] || !assignment.enabled}
        name="durationHours"
        selectClassName="no-min-width"
        suffix="hours"
        options={range(0, 13)}
        value={durationHours.toString()}
        onChange={onChangeHours}
      />
      <SelectInput
        disabled={loadingAssignments[assignment.assignmentId] || !assignment.enabled}
        name="durationMinutes"
        selectClassName="no-min-width"
        suffix="minutes"
        options={minutes ?? []}
        value={durationMinutes.toString()}
        onChange={onChangeMinutes}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;
