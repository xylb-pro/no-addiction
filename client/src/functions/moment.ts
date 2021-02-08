import moment from 'moment';

//TODO передрочить Влад. Добавить функции в timer view
type DurationInType =
  | 'full'
  | 'years'
  | 'months'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds';

/**
 * Function to convert duraion object to format 'YYYY-MM-DD HH:mm:ss'. This function also delete
 * zero date if duration for example '0-0-1 12:34:23'
 * @param {string} type - period you wont to take, or all duration. For example 'full' or 'years'
 * @param {moment.Duration | number} duration
 */
export const getDurationNormalize = (
  type: DurationInType,
  duration: moment.Duration | number,
): string => {
  if (typeof duration === 'number') {
    duration = moment.duration(duration);
  }
  switch (type) {
    case 'years':
      return '' + duration.years();
    case 'months':
      return '' + duration.months();
    case 'days':
      return '' + duration.days();
    case 'hours':
      return '' + duration.hours();
    case 'minutes':
      return '' + duration.minutes();
    case 'seconds':
      return '' + duration.seconds();
    case 'full':
      return `${deleteZeroDates([
        +getDurationNormalize('years', duration),
        +getDurationNormalize('months', duration),
        +getDurationNormalize('days', duration),
      ])} ${getTimeZeroDigit(
        getDurationNormalize('hours', duration),
        'time',
      )}:${getTimeZeroDigit(
        getDurationNormalize('minutes', duration),
        'time',
      )}:${getTimeZeroDigit(
        getDurationNormalize('seconds', duration),
        'time',
      )}`.trim();
    default:
      return '';
  }
};

export const getTimeZeroDigit = (
  time: number | string,
  type: 'time' | 'date',
): string => {
  if (typeof time === 'string') {
    time = +time;
  }
  if (time % 10 === time && type === 'time') {
    return '0' + String(time);
  } else return String(time);
};

export const deleteZeroDates = (numbersArray: number[]): string => {
  let get: boolean = false;
  const ac = numbersArray.reduce((accum: string, el: number) => {
    if (!!el) {
      get = true;
    }
    if (get) {
      accum += '-' + el;
    }
    return accum;
  }, '');

  return ac.slice(1, ac.length);
};
