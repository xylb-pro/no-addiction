import { useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { RootState } from '../store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDeleteTimer,
  setCurrentRecordIndex,
} from '../store/timers/timersActions';

import { getDurationNormalize } from '../functions/moment';
import { insert } from '../functions/otherFunctions';
import { Container } from '../components/Container';
import { Title } from '../components/Title';
import { DeleteIcon } from '../assets/DeleteIcon';
import { colors } from '../styles/colors';
import { useCurrentDuration } from './useCurrentDuration.hook';

export const useCurrentRecords = () => {
  const [duration] = useCurrentDuration();

  const dispatch = useDispatch();

  const records = useSelector((state: RootState) => state.timers.records);
  const currentActiveDate = useSelector(
    (state: RootState) => state.timers.currentTimer,
  );
  const inAddiction = useSelector(
    (state: RootState) => state.timers.inAddiction,
  );
  const currentRecordIndex = useSelector(
    (state: RootState) => state.timers.currentRecordIndex,
  );

  useEffect(() => {
    if (
      records[currentRecordIndex - 1] &&
      +duration > +records[currentRecordIndex - 1].duration &&
      currentRecordIndex !== 0 &&
      currentRecordIndex !== -1
    ) {
      dispatch(setCurrentRecordIndex(currentRecordIndex - 1));
    }
  }, [duration]);

  /**
   * Create dom and insert return it from HOOK
   */
  const setRecordsToDom = () => {
    //returned array
    let content: any[] = [];
    //real array length
    let realLength: number = records.length;
    //recordsarray with records
    let newRecords: any[] = [];

    //if !inAddiction change real array length
    if (!inAddiction) {
      records.length > 9 ? (realLength = 10) : (realLength += 1);
    }

    //insert current record to array
    if (records && !inAddiction) {
      newRecords = insert(records, currentRecordIndex, {
        recordId: currentActiveDate.timerId,
        beginDate: currentActiveDate.beginDate || '',
        endDate: currentActiveDate.endDate || '',
        duration: duration,
      });
    } else if (inAddiction) newRecords = [...records];

    //TODO попробовать заменить на map vlad
    for (let i = 0; i < realLength; i++) {
      if (newRecords[i].recordId !== -1)
        if (currentRecordIndex !== i) {
          content.push(
            <TableElWrapper key={newRecords[i].recordId}>
              <Container display="flex" alignItems="flex-end">
                <Container style={{ width: '80px' }}>
                  <Title fz="32px">{i + 1}</Title>
                </Container>

                <Title fz="22px">
                  {moment(newRecords[i].endDate).format('YYYY-MM-DD HH:mm:ss')}
                </Title>

                <Container style={{ marginLeft: 'auto' }}>
                  <Title fz="22px">
                    {newRecords[i].duration &&
                      getDurationNormalize('full', newRecords[i].duration)}
                  </Title>
                </Container>

                <DeleteIconContainer
                  onClick={() =>
                    dispatch(fetchDeleteTimer(newRecords[i].recordId))
                  }
                >
                  <DeleteIcon />
                </DeleteIconContainer>
              </Container>
              <Line color={colors.$darkGray} />
            </TableElWrapper>,
          );
        } else {
          content.push(
            <TableElWrapper key={'CURRENT_DURATION'}>
              <Container display="flex" alignItems="flex-end">
                <Container style={{ width: '80px' }}>
                  <Title fz="32px" color={colors.$red}>
                    {i + 1}
                  </Title>
                </Container>
                <Title fz="22px" color={colors.$red}>
                  Current timer
                </Title>
                <Container style={{ marginLeft: 'auto' }}>
                  <Title fz="22px" color={colors.$red}>
                    {newRecords[i].duration &&
                      getDurationNormalize('full', newRecords[i].duration)}
                  </Title>
                </Container>
              </Container>
              <Line color={colors.$darkGray} />
            </TableElWrapper>,
          );
        }
    }

    return content;
  };

  return [setRecordsToDom()];
};
const Line = styled.hr`
  border: 3px ${(props) => props.color || colors.$black} solid;
  border-radius: 6px;
  width: 100%;
  /* :last-child {
    border: 3px ${colors.$black} solid;
  } */
`;

const TableElWrapper = styled.div`
  position: relative;
`;

const DeleteIconContainer = styled.div`
  width: 16px;
  position: absolute;
  user-select: none;
  right: -30px;
  top: 16px;
  z-index: 1;
  cursor: pointer;
`;
