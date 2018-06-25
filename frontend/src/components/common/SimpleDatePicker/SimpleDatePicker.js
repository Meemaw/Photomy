// @flow
import * as React from 'react';
import styled from 'styled-components';
import IconFormLabel from '../IconFormLabel';
import { Dropdown } from 'semantic-ui-react';
import type { DateSelection } from '../SimpleDatePicker';

const StyledDatePicker = styled.div`
  p,
  div,
  button {
    font-size: 12px !important;
  }
`;

type Props = {
  year: ?DateSelection,
  month: ?DateSelection,
  day: ?DateSelection,
  monthOptions: Array<Object>,
  handleChange: Function,
  dayOptions: Array<Object>,
  yearOptions: Array<Object>,
  widths: Object,
  label?: ?string,
};

const YEAR_PLACEHOLDER_VALUE = 'Year:';
const MONTH_PLACEHOLDER_VALUE = 'Month:';
const DAY_PLACEHOLDER_VALUE = 'Day:';

const SimpleDatePicker = ({
  yearOptions,
  monthOptions,
  dayOptions,
  handleChange,
  year,
  month,
  day,
  widths,
  label,
}: Props) => {
  return (
    <StyledDatePicker className="SimpleDatePicker">
      {label && <IconFormLabel label={label} icon="calendar" style={{ marginBottom: '10px' }} />}

      <Dropdown
        placeholder={YEAR_PLACEHOLDER_VALUE}
        selection
        options={yearOptions}
        style={{ minWidth: widths.yearWidth }}
        value={year}
        onChange={handleChange}
      />

      <Dropdown
        placeholder={MONTH_PLACEHOLDER_VALUE}
        selection
        options={monthOptions}
        style={{ minWidth: widths.monthWidth }}
        value={month}
        disabled={monthOptions.length === 0}
        onChange={handleChange}
      />

      <Dropdown
        placeholder={DAY_PLACEHOLDER_VALUE}
        selection
        disabled={dayOptions.length === 0}
        options={dayOptions}
        style={{ minWidth: widths.dayWidth }}
        onChange={handleChange}
        value={day}
      />
    </StyledDatePicker>
  );
};

SimpleDatePicker.defaultProps = {
  widths: { yearWidth: '65px', monthWidth: '90px', dayWidth: '52px' },
};

export default SimpleDatePicker;
