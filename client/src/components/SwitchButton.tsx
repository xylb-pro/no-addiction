import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { RootState } from '../store/rootReducer';

import { colors } from '../styles/colors';

type TypeOfType = 'small' | 'medium' | 'large';

interface ISwitchButton {
  onClick?(): void;
  type?: TypeOfType;
  position?: boolean;
  backgroundColor?: string;
}
type Position = {
  backgroundColor?: string;
  flexDirection?: string;
  visibility?: string;
};

export const SwitchButton: React.FC<ISwitchButton> = ({
  onClick = () => {},
  type = 'small',
  position,
  backgroundColor,
}) => {
  const loading = useSelector(
    (state: RootState) => state.users.loading.headerSwitcher
  );

  const getSwitchButtonPropStyles = (): { [key: string]: string } => {
    if (position) {
      return {
        flexDirection: 'row-reverse',
        backgroundColor: colors.$red,
      };
    } else
      return {
        flexDirection: 'row',
        backgroundColor: colors.$gray,
      };
  };

  return (
    <MainPart
      flexDirection={getSwitchButtonPropStyles().flexDirection}
      onClick={() => onClick()}
      backgroundColor={backgroundColor}
    >
      <Selector
        backgroundColor={getSwitchButtonPropStyles().backgroundColor}
        visibility={!loading ? 'visible' : 'hidden'}
      ></Selector>
    </MainPart>
  );
};

const MainPart = styled.button<Position>`
  width: 64px;
  height: 34px;
  border-radius: 25px;
  background-color: ${(p) => p.backgroundColor || colors.$white};
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  flex-direction: ${(props) => props.flexDirection};
`;

const Selector = styled.div<Position>`
  height: 28px;
  width: 28px;
  border-radius: 100%;
  background-color: ${(props) => props.backgroundColor};
  margin: 0 3px;
  visibility: ${(props) => props.visibility};
`;
