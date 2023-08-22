import { VFC } from 'react';
import styled from 'styled-components';

import { ArrowDown, ArrowUp } from '@app/assets/svgs';

interface SortIconProps {
  className?: string;
  sort: 'asc' | 'desc';
}

export const SortIcon: VFC<SortIconProps> = ({ className, sort }) => (
  <Img alt="sort icon" className={className} src={sort === 'asc' ? ArrowUp : ArrowDown} />
);

const Img = styled.img`
  margin-bottom: 2px;
  margin-left: 5px;
`;
