import Register from './Register';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { AuthApi } from '../../../../services';
import { setAuthUser } from '../../../../actions/auth';

const RegisterContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: props => {
    return { email: '', password1: '', firstName: '', lastName: '', toc: false };
  },

  validate: (values, props) => {
    const errors = {};

    const { password1, email, toc } = values;

    if (!email) {
      errors.email = ['This field is required'];
    } else if (!password1) {
      errors.password1 = ['This field is required'];
    } else if (password1.length < 8) {
      errors.password1 = ['Password length must be atleast 8 chars'];
    } else if (!toc) {
      errors.__non_field_errors__ = ['You need to agree to Terms of Service!'];
    }

    return errors;
  },

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const payload = { ...values, password2: values.password1 };

    AuthApi.register(payload)
      .then(resp => {
        // TODO redirect to confirm email
        /*
        const payload = { ...resp, user: { ...resp.user, id: resp.user.pk } };
        setAccessToken(payload);
        props.setAuthUser(payload.user);
        */
      })
      .catch(err => {
        if (err.status === 400) {
          setErrors(err.body);
        } else {
          console.log(err);
        }
        setSubmitting(false);
      });
  },
})(Register);

const mapDispatchToProps = {
  setAuthUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(RegisterContainer);
