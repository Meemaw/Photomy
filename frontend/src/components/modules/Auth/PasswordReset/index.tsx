import { FormikProps, withFormik } from 'formik';

import { History } from '../../../../../node_modules/@types/history';
import { loginPath } from '../../../../constants/paths';
import { AuthApi } from '../../../../services';
import PasswordReset from './PasswordReset';

export type Values = {
  new_password1: string;
  new_password2: string;
};

export interface Errors {
  new_password1?: string;
  new_password2?: string[];
  non_field_errors?: string[];
}

interface Props extends FormikProps<any> {
  match: any;
  history: History;
}

const PasswordResetContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: (_: Props) => {
    return { new_password1: '', new_password2: '' };
  },

  validate: (values: Values, _) => {
    const errors: Errors = {};

    const { new_password1, new_password2 } = values;

    if (new_password1 !== new_password2) {
      errors.new_password2 = ["The two password fields didn't match."];
    }
    return errors;
  },

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const payload = { ...props.match.params, ...values };

    AuthApi.resetConfirm(payload)
      .then(resp =>
        props.history.push({
          pathname: loginPath,
          state: { passwordReset: true },
        }),
      )
      .catch(err => {
        if (err.status === 400) {
          if (err.body.token) {
            setErrors({
              non_field_errors: ['It looks like this link expired'],
            } as any);
          } else {
            setErrors(err.body);
          }
        } else {
          // console.log(err);
        }
        setSubmitting(false);
      });
    setSubmitting(false);
  },
})(PasswordReset);

export default PasswordResetContainer;
