// @flow
import * as React from 'react';
import SimpleDatePicker from './SimpleDatePicker';
import { range } from 'lodash';
import { TODAY, numDaysInMonth } from '../../../lib/date';

export type DateSelection = number | string;

type Props = { handleDateSelection: Function, label?: ?string, initialValue?: ?Date };
type State = { year: ?DateSelection, month: ?DateSelection, day: ?DateSelection };

const YEAR_PLACEHOLDER_VALUE: string = 'Year:';
const MONTH_PLACEHOLDER_VALUE: string = 'Month:';
const DAY_PLACEHOLDER_VALUE: string = 'Day:';

class SimpleDatePickerContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    if (props.initialValue) {
      this.state = {
        year: props.initialValue.getFullYear(),
        month: monthOptions[props.initialValue.getMonth() + 1].value,
        day: props.initialValue.getDate(),
      };
    } else {
      this.state = {
        year: YEAR_PLACEHOLDER_VALUE,
        month: MONTH_PLACEHOLDER_VALUE,
        day: DAY_PLACEHOLDER_VALUE,
      };
    }
  }
  handleChange = (e: Event, { value, placeholder }: Object) => {
    if (placeholder === YEAR_PLACEHOLDER_VALUE) {
      this.setState({ year: value }, () => this.handleDateChange());
    } else if (placeholder === MONTH_PLACEHOLDER_VALUE) {
      this.setState({ month: value }, () => this.handleDateChange());
    } else {
      this.setState({ day: value }, () => this.handleDateChange());
    }
  };

  handleDateChange = () => {
    const { year, month, day } = this.state;
    const { handleDateSelection } = this.props;

    const actualDay: number = day === DAY_PLACEHOLDER_VALUE ? 1 : day;
    let actualMonth = month === MONTH_PLACEHOLDER_VALUE ? 0 : getMonthIndex(month) - 1;

    const date = year === YEAR_PLACEHOLDER_VALUE ? null : new Date(year, actualMonth, actualDay);
    if (date) {
      handleDateSelection && handleDateSelection(date);
    }
  };

  render() {
    const { year, month, day } = this.state;
    const { label } = this.props;
    const daySelection = getDaySelection(month, year);
    const monthSelection = getMonthSelection(year);

    return (
      <SimpleDatePicker
        handleChange={this.handleChange}
        dayOptions={daySelection}
        yearOptions={yearOptions}
        monthOptions={monthSelection}
        day={day}
        month={month}
        year={year}
        label={label}
      />
    );
  }
}

const getMonthIndex = (month: DateSelection) => {
  return monthOptions.findIndex(option => option.text === month);
};

const getDaySelection = (month: ?DateSelection, year: ?DateSelection): Array<Object> => {
  if (month === MONTH_PLACEHOLDER_VALUE || year === YEAR_PLACEHOLDER_VALUE) {
    return [];
  }

  const monthIndex = getMonthIndex(month);

  return [
    { text: DAY_PLACEHOLDER_VALUE, value: DAY_PLACEHOLDER_VALUE },
    ...range(1, numDaysInMonth(monthIndex, year) + 1).map(day => ({ text: day, value: day })),
  ];
};
const yearOptions = [
  { text: YEAR_PLACEHOLDER_VALUE, value: YEAR_PLACEHOLDER_VALUE },
  ...range(TODAY.getFullYear(), 1995, -1).map(year => ({ text: year, value: year })),
];

const getMonthSelection = (year: ?DateSelection) => {
  if (year === YEAR_PLACEHOLDER_VALUE) {
    return [];
  }
  return monthOptions;
};

const monthOptions = [
  { text: MONTH_PLACEHOLDER_VALUE, value: MONTH_PLACEHOLDER_VALUE },
  { text: 'Janury', value: 'Janury' },
  { text: 'February', value: 'February' },
  { text: 'March', value: 'March' },
  { text: 'April', value: 'April' },
  { text: 'May', value: 'May' },
  { text: 'June', value: 'June' },
  { text: 'July', value: 'July' },
  { text: 'August', value: 'August' },
  { text: 'September', value: 'September' },
  { text: 'October', value: 'October' },
  { text: 'November', value: 'November' },
  { text: 'December', value: 'December' },
];

export default SimpleDatePickerContainer;
