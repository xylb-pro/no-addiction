import { useEffect, useState } from 'react';
import moment from 'moment';

import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../store/rootReducer';

import { getDurationNormalize } from '../functions/moment';

//TODO дрочить, чтобы не дрочилось 2 раза
export const useCurrentDuration = (): any[] => {
  const beginDate = useSelector(
    (state: RootState) => state.timers.currentTimer.beginDate,
    shallowEqual,
  );

  const [duration, setDuration] = useState({
    milliseconds: +moment() - +moment(beginDate),
  });

  /**
   * Effect to countdown timer
   */
  useEffect(() => {
    setDuration({
      milliseconds: +moment() - +moment(beginDate),
    });
    const interval = setInterval(() => {
      setDuration({
        milliseconds: +moment() - +moment(beginDate),
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [beginDate]);

  return [
    duration.milliseconds,
    getDurationNormalize('full', duration.milliseconds),
    moment.duration(duration.milliseconds),
  ];
};
