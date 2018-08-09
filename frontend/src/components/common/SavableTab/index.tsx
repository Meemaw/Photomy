import * as React from 'react';

import ClickableSpan from '../ClickableSpan';
import LoadingIcon from '../LoadingIcon';
import SavableInput from '../SavableInput';

type Props = {
  loading: boolean;
  value?: string;
  saveValue: (value: string) => Promise<any>;
  savingValue: boolean;
  setSavingValue: (saving: boolean) => void;
  defaultValue?: string;
};

const SavableTab: React.StatelessComponent<Props> = ({
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
