import { withFormik, WithFormikConfig } from 'formik';

import { History } from '../../../../../node_modules/@types/history';
import { loginPath } from '../../../../constants/paths';
import { AuthApi } from '../../../../services';
import Register from './Register';

export type Values = {
  password1: string;
  email: string;
  toc: boolean;
  firstName: string;
  lastName: string;
};

interface Props extends WithFormikConfig<any> {
  history: History;
  setAuthUser: any;
}

const RegisterContainer = withFormik({
  validateOnChange: false,
  mapPropsToValues: (props: Props) => {
    return {
      email: '',
      password1: '',
      firstName: '',
      lastName: '',
      toc: false,
    };
  },

  validate: (values: Values, props: Props) => {
    const errors: any = {};

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

  handleSubmit: (values: Values, { props, setSubmitting, setErrors }) => {
    const payload = { ...values, password2: values.password1 };

    AuthApi.register(payload)
      .then(resp => {
        props.history.push({ pathname: loginPath, state: { register: true } });
      })
      .catch(err => {
        if (err.status === 400) {
          setErrors(err.body);
        } else {
          // console.log(err);
        }
        setSubmitting(false);
      });
  },
})(Register);

export default RegisterContainer;
