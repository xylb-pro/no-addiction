import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { transitionDuration } from '../constants/globalConstants';
import { colors } from '../styles/colors';

type designType = 'normal' | 'negative' | 'switcher';

interface ISecondButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  design: designType;
  width?: string;
  padding?: string;
  margin?: string;
  isOn?: boolean;
}

type StyledButtonPropsType = {
  width?: string;
  padding?: string;
  margin?: string;
};

export const SecondButton: React.FC<ISecondButton> = ({
  design,
  children,
  width,
  padding,
  margin,
  isOn,
  ...rest
}) => {
  return (
    <StyledButton
      {...rest}
      style={{ ...styleType(design, !!isOn), ...rest.style }}
      width={width}
      padding={padding}
      margin={margin}
    >
      {children}
    </StyledButton>
  );
};

const styleType = (design: designType, isOn: boolean): React.CSSProperties => {
  switch (design) {
    case 'negative':
      return {
        backgroundColor: colors.$pink,
        color: colors.$absolutlyWhite,
      };
    case 'switcher':
      if (isOn)
        return {
          backgroundColor: colors.$black,
          color: colors.$absolutlyWhite,
          border: `1px solid ${colors.$black}`,
        };
      return {
        color: colors.$black,
        border: `1px solid ${colors.$black}`,
        backgroundColor: 'transparent',
      };

    default:
      return {
        backgroundColor: colors.$purple,
        color: colors.$absolutlyWhite,
      };
  }
};

const StyledButton = styled.button<StyledButtonPropsType>`
  width: ${(p) => p.width};
  cursor: pointer;
  user-select: none;
  border: none;
  font-family: 'Alegreya Sans';
  padding: ${(p) => p.padding || '10px 15px'};
  border-radius: 18px;
  font-size: 18px;
  margin: ${(p) => p.margin};
  :last-child {
    margin-right: 0;
  }
  transition: background-color ${transitionDuration} ease;
`;
