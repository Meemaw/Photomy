import { withFormik } from 'formik';

import { History } from '../../../../../node_modules/@types/history';
import { confirmationSentPath } from '../../../../constants/paths';
import { AuthApi } from '../../../../services';
import PasswordResetTrigger from './PasswordResetTrigger';

type Props = {
  history: History;
};

export type Values = { email: string };

const PasswordResetTriggerContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: (props: Props) => {
    return { email: '' };
  },

  handleSubmit: (values: Values, { props, setSubmitting, setErrors }) => {
    AuthApi.resetPassword(values)
      .then(resp =>
        props.history.push({
          pathname: confirmationSentPath,
          state: { requestedReset: true },
        }),
      )
      .catch(err => {
        if (err.status === 400) {
          setErrors(err.body);
        } else {
          // console.log(err);
        }
        setSubmitting(false);
      });

    setSubmitting(false);
  },
})(PasswordResetTrigger);

export default PasswordResetTriggerContainer;
