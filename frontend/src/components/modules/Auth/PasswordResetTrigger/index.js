import PasswordResetTrigger from './PasswordResetTrigger';
import { withFormik } from 'formik';
import { AuthApi } from '../../../../services';
import { confirmationSentPath } from '../../../../lib/paths';

const PasswordResetTriggerContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: props => {
    return { email: '' };
  },

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    AuthApi.resetPassword(values)
      .then(resp =>
        props.history.push({ pathname: confirmationSentPath, state: { requestedReset: true } }),
      )
      .catch(err => {
        if (err.status === 400) {
          setErrors(err.body);
        } else {
          console.log(err);
        }
        setSubmitting(false);
      });

    setSubmitting(false);
  },
})(PasswordResetTrigger);

export default PasswordResetTriggerContainer;
