import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/colors';

type TypeOfStyleType =
  | 'main'
  | 'smallText'
  | 'oneWordOneLine'
  | 'extraSmallText'
  | 'settingsButton';

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styleType?: TypeOfStyleType;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonType> = ({
  children,
  styleType = 'main',
  style,
  ...rest
}) => {
  const setNewLines = (children: React.ReactNode): React.ReactNode => {
    let line = '';
    if (children instanceof Array) line = children.join('').trim();

    const resArray: Array<JSX.Element> = [];

    line.split(' ').forEach((word, i) => {
      resArray.push(<p key={i}>{word.trim()}</p>);
    });

    return <>{resArray.map((el) => el)}</>;
  };

  return (
    <StyledButton
      style={{ ...style, ...styleTypeFunction(styleType) }}
      {...rest}
    >
      {styleType === 'oneWordOneLine' ? setNewLines(children) : children}
    </StyledButton>
  );
};

const styleTypeFunction = (type: string): React.CSSProperties => {
  switch (type) {
    case 'smallText':
      return {
        fontSize: '24px',
        textAlign: 'center',
        padding: '24px 52px',
      };
    case 'settingsButton':
      return {
        fontSize: '18px',
        textAlign: 'center',
        padding: '10px 15px',
        fontFamily: 'Alegreya Sans',
      };
    case 'extraSmallText':
      return {
        fontSize: '16px',
        textAlign: 'center',
        padding: '10px 14px',
        borderRadius: '12px',
      };
    case 'oneWordOneLine':
      return {
        fontSize: '24px',
        textAlign: 'center',
        display: 'table-caption',
        padding: '24px 52px',
      };
    default:
      return {
        fontSize: '72px',
      };
  }
};

const StyledButton = styled.button`
  background-color: ${colors.$black};
  color: ${colors.$red};
  cursor: pointer;
  user-select: none;
  border: none;
  border-radius: 20px;
  padding: 6px 52px;
  font-size: 72px;
`;
