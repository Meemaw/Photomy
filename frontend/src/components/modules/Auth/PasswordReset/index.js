import PasswordReset from './PasswordReset';
import { withFormik } from 'formik';
import { AuthApi } from '../../../../services';
import { loginPath } from '../../../../lib/paths';

const PasswordResetContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: props => {
    return { new_password1: '', new_password2: '' };
  },

  validate: (values, props) => {
    const errors = {};

    const { new_password1, new_password2 } = values;

    if (new_password1 !== new_password2) {
      errors.new_password2 = ["The two password fields didn't match."];
    }
    return errors;
  },

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const payload = { ...props.match.params, ...values };

    AuthApi.resetConfirm(payload)
      .then(resp => props.history.push({ pathname: loginPath, state: { passwordReset: true } }))
      .catch(err => {
        if (err.status === 400) {
          if (err.body.token) {
            setErrors({ non_field_errors: ['It looks like this link expired'] });
          } else {
            setErrors(err.body);
          }
        } else {
          console.log(err);
        }
        setSubmitting(false);
      });
    setSubmitting(false);
  },
})(PasswordReset);

export default PasswordResetContainer;
