import React from 'react';

import styled from 'styled-components';

type ImageType = {
  src: string;
  alt?: string;
  width?: string;
  margin?: string;
  fixedSize?: boolean;
  onClick?(): void;
  cursor?: 'pointer';
  borderRadius?: string;
};

export const Image: React.FC<ImageType> = ({
  src,
  alt = '',
  width,
  margin,
  fixedSize = false,
  onClick,
  cursor,
  borderRadius,
}) => {
  return (
    <ImageWrapper width={width} margin={margin}>
      <Img
        src={src}
        alt={alt}
        widthFixed={fixedSize && width}
        onClick={onClick}
        cursor={cursor}
        borderRadius={borderRadius}
      />
    </ImageWrapper>
  );
};

type ImageWrapperType = {
  width?: string;
  margin?: string;
  borderRadius?: string;
};

type ImgType = {
  widthFixed?: string | false;
  cursor?: string;
  borderRadius?: string;
};

const ImageWrapper = styled.div<ImageWrapperType>`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

const Img = styled.img<ImgType>`
  width: ${(props) => props.widthFixed};
  cursor: ${(props) => props.cursor};
  border-radius: ${(p) => p.borderRadius};
  max-width: 100%;
  height: auto;
  display: block;
`;
