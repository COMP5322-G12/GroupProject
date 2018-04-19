import moment from 'moment';

/**
  * Moment.js
  *
  * https://github.com/moment/moment/
  *
  * Display Setting: https://momentjs.com/docs/#/displaying/
  */
export const DEFAULT_DISPLAY_DATE_FORMAT = 'YYYY-MM-DD';

export const DEFAULT_DISPLAY_TIME_FORMAT = 'HH:ii';

export const DEFAULT_DISPLAY_DATETIME_FORMAT = 'YYYY-MM-DD HH:ii';

export function formatDateStringToMoment(dateString) {
  if (dateString) {
    return moment(dateString, DEFAULT_DISPLAY_DATE_FORMAT).isValid() ?
      moment(dateString, DEFAULT_DISPLAY_DATE_FORMAT) :
      dateString;
  }
  return '';
}

export function formtMomentToDateString(momentObject) {
  if (moment.isMoment(momentObject)) {
    return momentObject.format(DEFAULT_DISPLAY_DATE_FORMAT);
  }
  return '';
}

export function formatTimeStringToMoment(timeString) {
  if (timeString) {
    return moment(timeString, DEFAULT_DISPLAY_TIME_FORMAT).isValid() ?
      moment(timeString, DEFAULT_DISPLAY_TIME_FORMAT) :
      timeString;
  }
  return '';
}

export function formtMomentToTimeString(momentObject) {
  if (moment.isMoment(momentObject)) {
    return momentObject.format(DEFAULT_DISPLAY_TIME_FORMAT);
  }
  return '';
}
