import styled, { css } from 'styled-components';

export const DropdownListStyled = styled.ul<{ isActive?: boolean }>`
  margin: 0;
  padding: 0;
  list-style: none;
  user-select: none;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  background: white;
  box-shadow: 0 2px 2px rgb(0 0 0 / 20%);
  z-index: 1000;
  overflow: hidden;
  transform-origin: 0 0;
  transform: scaleY(0);
  transition: .2s visibility, .2s opacity, .2s transform;

  @media (prefers-color-scheme: dark) {
    background: #212123;
    color: #fff;
  }
  
  ${(props) =>
    props.isActive &&
    css`
      opacity: 1;
      visibility: visible;
      transform: scaleY(1);
    `}
}
`;
export const DropdownListItem = styled.li`
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  display: block;

  &:hover {
    background-color: rgba(0 0 0, 0.1);
  }
`;
