import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';

interface INotice {
  display?: 'none' | 'block';
  type?: 'sever' | 'warning';
}

export const Notice: React.FC<INotice> = ({
  display = 'none',
  children = 'Неопознаная ошибка, сообщение не указано',
  type,
}) => {
  return (
    <Wrapper display={display}>
      <Massage>{children}</Massage>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ display: string }>`
  max-width: 75%;
  min-width: 75%;
  height: 95%;
  border: 2px solid ${colors.$darkGray};
  background-color: ${colors.$gray};
  position: absolute;
  top: 0;
  right: -80%;
  border-radius: 16px;
  padding: 6px 12px;
  display: ${(p) => p.display};
`;

const Massage = styled.p`
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  color: ${colors.$black};
`;
