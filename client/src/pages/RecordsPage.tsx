import React from 'react';
import styled from 'styled-components';

import { Container } from '../components/Container';
import { Title } from '../components/Title';
import { colors } from '../styles/colors';
import { useCurrentRecords } from '../hooks/useCurrentRecords.hook';

export const RecordsPage: React.FC = () => {
  const [content] = useCurrentRecords();

  return (
    <Container
      maxWidth="1600px"
      margin="0px auto 0px"
      padding="100px 18px 0px"
      height="calc(100vh - 99px)"
    >
      <Container maxWidth="800px" margin="0 auto">
        <Container display="flex" alignItems="flex-end">
          <Container style={{ width: '80px' }}>
            <Title color={colors.$darkGray} fz="24px">
              #
            </Title>
          </Container>
          <Title color={colors.$darkGray} fz="24px">
            End date
          </Title>
          <Container style={{ marginLeft: 'auto' }}>
            <Title color={colors.$darkGray} fz="24px">
              Duration
            </Title>
          </Container>
        </Container>
        <Line />
        {content}
      </Container>
    </Container>
  );
};

//TODO last child
const Line = styled.hr`
  border: 3px ${(props) => props.color || colors.$black} solid;
  border-radius: 6px;
  width: 100%;
  /* :last-child {
    border: 3px ${colors.$black} solid;
  } */
`;
