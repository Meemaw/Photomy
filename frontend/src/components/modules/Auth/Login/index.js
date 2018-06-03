// @flow
import Login from './Login';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { AuthApi } from '../../../../services';
import { setAccessToken } from '../../../../lib/auth';
import { setAuthUser } from '../../../../actions/auth';

const LoginContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: props => ({ email: '', password: '' }),
  validate: (values, props) => {
    const errors = {};

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
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    AuthApi.login(values)
      .then(jwt_payload => {
        const payload = { ...jwt_payload, user: { ...jwt_payload.user, id: jwt_payload.user.pk } };
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
