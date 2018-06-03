// @flow
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import isSameDay from 'date-fns/is_same_day';
import isAfter from 'date-fns/is_after';

const TODAY = new Date();

const YESTERDAY: Date = subDays(TODAY, 1);

const WEEK_OLD: Date = subDays(TODAY, 7);

export const toReadableDate = (date: Date): string => {
  if (!date) return '';
  if (isSameDay(TODAY, date)) {
    return 'Today';
  } else if (isSameDay(YESTERDAY, date)) {
    return 'Yesterday';
  } else if (isAfter(date, WEEK_OLD)) {
    return format(date, 'dddd');
  } else {
    return format(date, 'DD MMM');
  }
};

export const getNowString = (dateFormat: String = 'HH:MM') => {
  return format(new Date(), dateFormat);
};

export const toReadableHighlightDate = (date: Date): string => {
  return toFormatedDate(date, 'DD MMM YYYY HH:MM');
};

export const toFormatedDate = (date: Date, dateFormat: string = 'HH:MM') => {
  return format(date, dateFormat);
};
