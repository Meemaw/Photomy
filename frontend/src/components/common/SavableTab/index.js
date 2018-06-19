// @flow
import * as React from 'react';
import SavableInput from '../SavableInput';
import ClickableSpan from '../ClickableSpan';
import LoadingIcon from '../LoadingIcon';

type Props = {
  loading: boolean,
  value: ?string,
  saveValue: string => Promise<*>,
  savingValue: boolean,
  setSavingValue: boolean => void,
  defaultValue: string,
};

const SavableTab = ({
  loading,
  value,
  saveValue,
  savingValue,
  setSavingValue,
  defaultValue,
}: Props) => {
  if (loading) {
    return <LoadingIcon />;
  }

  return !savingValue ? (
    <ClickableSpan onClick={() => setSavingValue(true)}>
      {value ? value : defaultValue}
    </ClickableSpan>
  ) : (
    <SavableInput saveValue={saveValue} initialValue={value} />
  );
};

SavableTab.defaultProps = {
  defaultValue: 'Set a name',
};

export default SavableTab;
