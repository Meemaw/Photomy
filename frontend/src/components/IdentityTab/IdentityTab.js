// @flow
import * as React from 'react';
import SavableInput from '../common/SavableInput';
import ClickableSpan from '../common/ClickableSpan';
import LoadingIcon from '../common/LoadingIcon';

type Props = {
  identityLoading: boolean,
  identityName: ?string,
  saveIdentity: string => Promise<*>,
  savingIdentity: boolean,
  setSavingIdentity: boolean => void,
};

const IdentityTab = ({
  identityLoading,
  identityName,
  saveIdentity,
  savingIdentity,
  setSavingIdentity,
}: Props) => {
  if (identityLoading) {
    return <LoadingIcon />;
  }

  return !savingIdentity ? (
    <ClickableSpan onClick={() => setSavingIdentity(true)}>
      {identityName ? identityName : 'Set a name'}
    </ClickableSpan>
  ) : (
    <SavableInput saveValue={saveIdentity} initialValue={identityName} />
  );
};

export default IdentityTab;
