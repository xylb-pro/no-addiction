import React, { HTMLAttributes } from 'react';

import styled from 'styled-components';

interface IContainerType extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
  padding?: string;
  display?: string;
  margin?: string;
  marginBottom?: string;
  marginTop?: string;
  alignItems?: string;
  justifyContent?: string;
  pos?: 'space-between' | 'start' | 'center' | 'end';
  width?: string;
  lastChild?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'inherit';
  visibility?: string;
  height?: string;
  id?: string;
}
type ContainerType = {
  maxWidth?: string;
  padding?: string;
  style?: React.CSSProperties;
  display?: string;
  margin?: string;
  marginBottom?: string;
  marginTop?: string;
  alignItems?: string;
  justifyContent?: string;
  pos?: 'space-between' | 'start' | 'center' | 'end';
  width?: string;
  lastChild?: string;
  position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'inherit';
  visibility?: string;
  height?: string;
};

export const Container: React.FC<IContainerType> = ({
  children,
  maxWidth,
  padding,
  width,
  display,
  margin,
  marginBottom,
  marginTop,
  justifyContent,
  alignItems,
  pos,
  lastChild,
  position,
  visibility,
  height,
  id,
  ...rest
}) => {
  return (
    <ContainerWrapper
      padding={padding}
      maxWidth={maxWidth}
      width={width}
      display={display}
      margin={margin}
      marginBottom={marginBottom}
      alignItems={alignItems}
      justifyContent={justifyContent}
      pos={pos}
      lastChild={lastChild}
      position={position}
      visibility={visibility}
      height={height}
      marginTop={marginTop}
      id={id}
      {...rest}
    >
      {children}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div<ContainerType>`
  ${(props) => {
    if (props.pos === 'space-between') {
      return `display: flex; justify-content: space-between; align-items: center; flex-grow: 1;`;
    } else if (props.pos === 'start') {
      return `display: flex; justify-content: flex-start; align-items: center`;
    } else if (props.pos === 'center') {
      return `display: flex; justify-content: center; align-items: center`;
    } else if (props.pos === 'end') {
      return `display: flex; justify-content: flex-end; align-items: center`;
    }
  }};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  max-width: ${(props) => props.maxWidth};
  display: ${(props) => props.display};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  visibility: ${(props) => props.visibility};
  height: ${(props) => props.height};
  :last-child {
    ${(props) => props.lastChild}
  }
`;
