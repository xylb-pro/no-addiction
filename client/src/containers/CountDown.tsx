import React from 'react';
import styled from 'styled-components';
import { getDurationNormalize } from '../functions/moment';

import { TimerView } from '../containers/TimerView';
import { Container } from '../components/Container';
import { useCurrentDuration } from '../hooks/useCurrentDuration.hook';

export const CountDown: React.FC = () => {
  const [currentDuration] = useCurrentDuration();
  return (
    <>
      <TimerViewGrid>
        <Container margin="0 64px 0 0">
          <TimerView
            type="date"
            time={{
              time1: +getDurationNormalize('years', currentDuration),
              time2: +getDurationNormalize('months', currentDuration),
              time3: +getDurationNormalize('days', currentDuration),
            }}
          />
        </Container>
        <TimerView
          type="time"
          time={{
            time1: +getDurationNormalize('hours', currentDuration),
            time2: +getDurationNormalize('minutes', currentDuration),
            time3: +getDurationNormalize('seconds', currentDuration),
          }}
        />
      </TimerViewGrid>
    </>
  );
};

//TODO сделать через conrainer
const TimerViewGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 100px;
`;
