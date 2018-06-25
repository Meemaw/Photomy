// @flow
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import isSameDay from 'date-fns/is_same_day';
import isAfter from 'date-fns/is_after';

export const TODAY = new Date();
const TODAY_STR = 'Today';

const YESTERDAY: Date = subDays(TODAY, 1);
const YESTERDAY_STR = 'Yesterday';

const WEEK_OLD: Date = subDays(TODAY, 7);

const HOUR_FORMAT: string = 'HH:MM';
const DAY_FORMAT: string = 'DD MMM YYYY';
const DAY_HOUR_FORMAT: string = 'DD MMM YYYY HH:MM';
const UPLOAD_FORMAT: string = 'YYYY-MM-DD HH:MM';

export const toUploadFormat = (date: Date): string => {
  return toFormatedDate(date, UPLOAD_FORMAT);
};

export const numDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

export const toReadableDate = (date: Date): string => {
  if (!date) return '';
  if (isSameDay(TODAY, date)) {
    return TODAY_STR;
  } else if (isSameDay(YESTERDAY, date)) {
    return YESTERDAY_STR;
  } else if (isAfter(date, WEEK_OLD)) {
    return format(date, 'dddd');
  } else {
    return format(date, 'DD MMM');
  }
};

export const getNowString = (dateFormat: string = HOUR_FORMAT) => {
  return format(new Date(), dateFormat);
};

export const toReadableAlbumDate = (date: Date): string => {
  return toFormatedDate(date, DAY_FORMAT);
};

export const toReadableHighlightDate = (date: Date): string => {
  return toFormatedDate(date, DAY_HOUR_FORMAT);
};

export const toFormatedDate = (date: Date, dateFormat: string = HOUR_FORMAT) => {
  return format(date, dateFormat);
};
