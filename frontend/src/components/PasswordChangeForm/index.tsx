import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { logout } from '../../actions';
import { AuthApi } from '../../services';
import PasswordChangeForm from './PasswordChangeForm';

type Errors = {
  [image_id: string]: string[];
};

interface Props {
  logout: any;
}

type Values = {
  old_password: string;
  new_password1: string;
  new_password2: string;
};

const PasswordChangeFormContainer = withFormik({
  mapPropsToValues: () => {
    return { old_password: '', new_password2: '', new_password1: '' };
  },
  validateOnChange: false,

  validate: (values: Values, props: Props) => {
    const errors: Errors = {};

    if (values.old_password === values.new_password1) {
      errors.new_password1 = ['New password is same'];
    }
    return errors;
  },

  handleSubmit: (values: Values, { props, setSubmitting, setErrors }) => {
    AuthApi.changePassword(values)
      .then(_ => props.logout())
      .catch(err => {
        setSubmitting(false);
        setErrors(err.body);
      });
  },
})(PasswordChangeForm);

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(PasswordChangeFormContainer);
