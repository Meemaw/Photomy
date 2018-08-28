import { FormikProps, withFormik } from 'formik';
import { connect } from 'react-redux';

import { Location } from '../../../../../node_modules/@types/history';
import { setAuthUser } from '../../../../actions/auth';
import { setAccessToken } from '../../../../lib/auth';
import { User } from '../../../../meta/types/User';
import { AuthApi } from '../../../../services';
import Login from './Login';

export type Values = {
  password: string;
  email: string;
};

export type Errors = {
  email?: string;
  password?: string;
  non_field_errors?: string[];
};

interface Props extends FormikProps<any> {
  setAuthUser: (user: User) => void;
  location: Location;
}

const LoginContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: props => ({ email: '', password: '' }),
  validate: (values: Values, props: Props) => {
    const errors: Errors = {};

    const { password, email } = values;

    if (!email) {
      errors.email = 'Required';
    }
    if (!password) {
      errors.password = 'Required';
    } else if (password.length < 8) {
      errors.password = 'Password length must be atleast 8 characters';
    }
    return errors;
  },
  handleSubmit: (values: Values, { props, setSubmitting, setErrors }) => {
    AuthApi.login(values)
      .then(jwt_payload => {
        const payload = {
          ...jwt_payload,
          user: { ...jwt_payload.user, id: jwt_payload.user.pk },
        };
        setAccessToken(payload);
        props.setAuthUser(payload.user);
      })
      .catch(err => {
        setSubmitting(false);
        setErrors(err.body);
      });
  },
})(Login);

const mapDispatchToProps = {
  setAuthUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginContainer);
