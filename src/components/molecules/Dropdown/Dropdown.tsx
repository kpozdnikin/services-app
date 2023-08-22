import React, { ComponentProps, FC, useRef } from 'react';
import { isEmpty } from 'lodash';
import useBoundingclientrect from '@rooks/use-boundingclientrect';

import { DropdownListStyled } from '@app/components/molecules/Dropdown/styled';

export interface DropdownListProps {
  width?: number | null;
  alignment: 'bottom' | 'left' | 'right';
}

const List: FC<DropdownListProps> = ({ children, width = null, alignment }) => {
  const myRef = useRef<HTMLUListElement>(null);
  const boundingClientRect = useBoundingclientrect(myRef);

  return (
    <DropdownListStyled
      ref={myRef}
      isActive={!isEmpty(children)}
      style={{
        top:
          alignment === 'bottom' ? boundingClientRect?.bottom : boundingClientRect?.top,
        left:
          alignment === 'left' || alignment === 'bottom'
            ? boundingClientRect?.left
            : undefined,
        right:
          alignment === 'right'
            ? document.body.clientWidth - (boundingClientRect?.right ?? 0)
            : undefined,
        minWidth: boundingClientRect?.width,
        width: width ?? undefined,
      }}
    >
      {children}
    </DropdownListStyled>
  );
};

export const Dropdown = (props: ComponentProps<typeof List>) => {
  return (
    <div>
      <List {...props} />
    </div>
  );
};
