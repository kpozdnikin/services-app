import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { Info, InfoActive } from '@app/assets/svgs';

interface TooltipProps {
  className?: string;
  event?: string;
  id: string;
  place: 'top' | 'right' | 'bottom' | 'left';
  tooltipClassName?: string;
  wrapperChildren?: ReactNode;
  wrapperClassName?: string;
}

const TooltipComponent: FC<TooltipProps> = (props) => {
  const {
    children,
    className,
    event,
    id,
    place,
    tooltipClassName,
    wrapperChildren,
    wrapperClassName,
  } = props;

  return (
    <div className={classnames('c-react-tooltip-container', className)}>
      <div
        data-tip
        className={classnames('c-react-tooltip-wrapper', wrapperClassName)}
        data-for={id}
      >
        {wrapperChildren}
      </div>
      <ReactTooltip
        className={classnames('c-react-tooltip', tooltipClassName)}
        effect="solid"
        event={event}
        id={id}
        place={place}
      >
        {children ?? ''}
      </ReactTooltip>
    </div>
  );
};

export const Tooltip = styled(TooltipComponent)`
  .c-react-tooltip-wrapper {
    cursor: pointer;

    &.info {
      height: 18px;
      width: 18px;
      background: url(${Info}) no-repeat center center;

      &:hover {
        background: url(${InfoActive}) no-repeat center center;
      }
    }
  }

  .c-react-tooltip {
    &.custom-tooltip {
      @media (prefers-color-scheme: dark) {
        color: #2c2c2e;
        background-color: white;

        &.place-top {
          &:after {
            border-top-color: white;
          }
        }

        &.place-bottom {
          &:after {
            border-bottom-color: white;
          }
        }

        &.place-right {
          &:after {
            border-right-color: white;
          }
        }

        &.place-left {
          &:after {
            border-left-color: white;
          }
        }
      }

      font-family: 'Open Sans', sans-serif;
      background-color: #000;
      color: #fff;
      box-shadow: 0 1px 2px 1px rgb(0 0 0 / 10%);
      text-align: left;
      margin-left: 10px;
      padding: 8px;
      width: 200px;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      white-space: normal;
      border-radius: 5px;
      z-index: 1;
      pointer-events: none;
      text-transform: none;
    }
  }
`;
