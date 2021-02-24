import styled from 'styled-components';

import { colors } from '../styles/colors';

type SwitchButtonType = {
  onClick?(): void;
  switchButtonStyle: SwitchButtonStyleType;
  selectorPosition: boolean;
  isElementLoading?: boolean;
};

type SwitchButtonSelectorType = {
  selectorPosition: boolean;
  visibility: 'visible' | 'hidden';
  backgroundColor?: string;
};

type SwitchButtonLayoutType = {
  backgroundColor?: string;
};

type SwitchButtonStyleType = 'settings' | 'header';

//TODO Add color change on change position. _xylb

export const SwitchButton: React.FC<SwitchButtonType> = ({
  onClick = () => {},
  switchButtonStyle = 'header',
  selectorPosition,
  isElementLoading = false,
}) => {
  return (
    <SwitchButtonLayout
      onClick={() => onClick()}
      backgroundColor={
        setSwitchButtonStyle(switchButtonStyle).backgroundColorLayout
      }
    >
      <SwitchButtonSelector
        selectorPosition={selectorPosition}
        visibility={!isElementLoading ? 'visible' : 'hidden'}
        backgroundColor={
          setSwitchButtonStyle(switchButtonStyle).backgroundColorSelector
        }
      />
    </SwitchButtonLayout>
  );
};

const setSwitchButtonStyle = (switchButtonStyle: SwitchButtonStyleType) => {
  switch (switchButtonStyle) {
    case 'settings':
      return {
        backgroundColorLayout: colors.$purple,
        backgroundColorSelector: colors.$white,
      };
    case 'header':
      return {
        backgroundColorLayout: colors.$white,
        backgroundColorSelector: colors.$gray,
      };
  }
};

const SwitchButtonLayout = styled.div<SwitchButtonLayoutType>`
  position: relative;
  width: 64px;
  height: 34px;
  border-radius: 25px;
  border: none;
  background-color: ${(p) => p.backgroundColor};
  user-select: none;
`;

const SwitchButtonSelector = styled.div<SwitchButtonSelectorType>`
  visibility: ${(p) => p.visibility};
  position: absolute;
  height: 26px;
  width: 26px;
  left: ${(p) => (p.selectorPosition ? '4px' : '34px' || '4px')};
  top: 4px;
  border-radius: 100%;
  background-color: ${(p) => p.backgroundColor};
  transition: left 0.15s ease;
`;
