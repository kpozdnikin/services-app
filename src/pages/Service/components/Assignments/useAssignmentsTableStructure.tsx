import { Tooltip } from '@app/components';
import type { ResizableTableDataRow } from '@app/components';
import { useTranslator } from '@app/hooks';
import {
  AssignmentWithNamePhotosMinutesShop,
  UseServiceAssignmentActionResult,
} from '@app/interfaces';

import {
  CostCell,
  DurationCell,
  EnabledCell,
  KioskCell,
  PrepaidCell,
  VisibilityCell,
} from './cells';

export const useAssignmentsTableStructure = ({
  changeAssignmentField,
  loadingAssignments,
  toggleAssignment,
}: UseServiceAssignmentActionResult): ResizableTableDataRow<AssignmentWithNamePhotosMinutesShop>[] => {
  const t = useTranslator();

  return [
    {
      cell: (assignment: AssignmentWithNamePhotosMinutesShop) => (
        <EnabledCell
          assignment={assignment}
          loadingAssignments={loadingAssignments}
          toggleAssignment={toggleAssignment}
        />
      ),
      header: <>{t('pages.service.assignments.location')}</>,
      id: 'Location',
      width: 300,
    },
    {
      cell: (assignment: AssignmentWithNamePhotosMinutesShop) => (
        <DurationCell
          assignment={assignment}
          changeAssignmentField={changeAssignmentField}
          loadingAssignments={loadingAssignments}
        />
      ),
      header: <>{t('pages.service.assignments.duration')}</>,
      id: 'Duration',
      width: 260,
    },
    {
      cell: (assignment: AssignmentWithNamePhotosMinutesShop) => (
        <CostCell
          assignment={assignment}
          changeAssignmentField={changeAssignmentField}
          loadingAssignments={loadingAssignments}
        />
      ),
      header: <>{t('pages.service.assignments.pricing')}</>,
      id: 'Pricing',
      width: 140,
    },
    {
      cell: (assignment: AssignmentWithNamePhotosMinutesShop) => (
        <VisibilityCell
          assignment={assignment}
          changeAssignmentField={changeAssignmentField}
          loadingAssignments={loadingAssignments}
        />
      ),
      header: (
        <>
          {t('pages.service.toggles.onlineVisibility.label')}
          <Tooltip
            className="u-m--"
            id="visibility"
            place="right"
            tooltipClassName="custom-tooltip"
            wrapperClassName="info"
          >
            {t('pages.service.toggles.onlineVisibility.tooltip')}
          </Tooltip>
        </>
      ),
      id: 'Online visibility',
      width: 165,
    },
    {
      cell: (assignment: AssignmentWithNamePhotosMinutesShop) => (
        <PrepaidCell
          assignment={assignment}
          changeAssignmentField={changeAssignmentField}
          loadingAssignments={loadingAssignments}
        />
      ),
      header: (
        <>
          {t('pages.service.toggles.requiresPrepaid.label')}
          <Tooltip
            className="u-m--"
            id="prepaid"
            place="right"
            tooltipClassName="custom-tooltip"
            wrapperClassName="info"
          >
            {t('pages.service.toggles.requiresPrepaid.tooltip')}
          </Tooltip>
        </>
      ),
      id: 'Requires prepaid',
      width: 165,
    },
    {
      cell: (assignment: AssignmentWithNamePhotosMinutesShop) => (
        <KioskCell
          assignment={assignment}
          changeAssignmentField={changeAssignmentField}
          loadingAssignments={loadingAssignments}
        />
      ),
      header: (
        <>
          {t('pages.service.toggles.kiosk.label')}
          <Tooltip
            className="u-m--"
            id="kiosk"
            place="right"
            tooltipClassName="custom-tooltip"
            wrapperClassName="info"
          >
            {t('pages.service.toggles.kiosk.tooltip')}
          </Tooltip>
        </>
      ),
      id: 'Kiosk',
      width: 100,
    },
  ];
};
