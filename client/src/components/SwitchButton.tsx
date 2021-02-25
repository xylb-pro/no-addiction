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
        selectorPosition
          ? setSwitchButtonStyle(switchButtonStyle).backgroundColorLayout
              .enabled
          : setSwitchButtonStyle(switchButtonStyle).backgroundColorLayout
              .disabled
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
        backgroundColorLayout: {
          disabled: colors.$gray,
          enabled: colors.$purple,
        },
        backgroundColorSelector: colors.$absolutlyWhite,
      };
    case 'header':
      return {
        backgroundColorLayout: {
          disabled: colors.$darkGray,
          enabled: colors.$red,
        },
        backgroundColorSelector: colors.$white,
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
  transition: background-color 0.2s ease;
`;

const SwitchButtonSelector = styled.div<SwitchButtonSelectorType>`
  visibility: ${(p) => p.visibility};
  position: absolute;
  height: 26px;
  width: 26px;
  left: ${(p) => (p.selectorPosition ? '34px' : '4px' || '4px')};
  top: 4px;
  border-radius: 100%;
  background-color: ${(p) => p.backgroundColor};
  transition: left 0.15s ease;
`;
