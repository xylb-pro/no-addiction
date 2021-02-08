import styled from 'styled-components';

type TitleTypes = {
  fz?: string;
  ff?: 'Alegreya Sans';
  fw?: '100' | '300' | '400' | '500' | '700' | '800' | '900';
  color?: string;
  mb?: string;
};

export const Title = styled.h1<TitleTypes>`
  font-size: ${(props) => props.fz};
  font-family: ${(props) =>
    props.ff || 'font-family: "Rubik Mono One", sans-serif'};
  font-weight: ${(props) => props.fw};
  color: ${(props) => props.color};
  margin-bottom: ${(props) => props.mb};
`;
