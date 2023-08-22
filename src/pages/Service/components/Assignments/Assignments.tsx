import { isEmpty } from 'lodash';
import { VFC } from 'react';
import { useIsFetching } from 'react-query';
import { useParams } from 'react-router-dom';
import { LoadingOverlay } from '@getsquire/glue-ui';

import { SingleService } from '@app/interfaces';
import { ResizableTable } from '@app/components';
import { useEventHandler, useServiceAssignments } from '@app/hooks';

import { useServiceAssignmentAction } from '../../hooks';
import { mapAssignmentDataToResizableTable } from './mapAssignmentDataToResizableTable';
import { useAssignmentsTableStructure } from './useAssignmentsTableStructure';
import { AssignmentResizableTableItem } from './types';
import { useAssignmentsTableAccordion } from './useAssignmentsTableAccordion';

interface AssignmentsProps {
  className?: string;
  handleDeleteService: (serviceId: string) => Promise<void>;
  service: SingleService;
}

export const Assignments: VFC<AssignmentsProps> = ({ handleDeleteService }) => {
  const { serviceId } = useParams();
  const isFetching = useIsFetching();

  useEventHandler(null, handleDeleteService);

  const assignmentsData = useServiceAssignments(serviceId);
  const assignmentActionResult = useServiceAssignmentAction(serviceId);
  const assignmentTableStructure = useAssignmentsTableStructure(assignmentActionResult);

  const assignmentTableData = mapAssignmentDataToResizableTable(assignmentsData);

  const {
    childRowClassName,
    onParentRowClick,
    parentRowClassName,
  } = useAssignmentsTableAccordion(assignmentTableData);

  const isPossiblyLoadingData = isFetching && isEmpty(assignmentTableData);

  return (
    <div className="c-service-assignments-table">
      <LoadingOverlay status={isPossiblyLoadingData ? 'loading' : 'idle'} />
      <ResizableTable<AssignmentResizableTableItem>
        childRowClassName={childRowClassName}
        data={assignmentTableData}
        parentRowClassName={parentRowClassName}
        table={assignmentTableStructure}
        onParentRowClick={onParentRowClick}
      />
    </div>
  );
};
