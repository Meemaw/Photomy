import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { setAuthUser } from '../../actions';
import { UserAuthApi } from '../../services';
import UserForm from './UserForm';

type Values = {
  email: string;
  first_name: string;
  last_name: string;
};

const UserFormContainer = withFormik({
  mapPropsToValues: ({ user }: any) => {
    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  },

  handleSubmit: (values: Values, { props, setSubmitting, setErrors }) => {
    UserAuthApi.update(values)
      .then(resp => {
        props.setAuthUser(resp);
        setSubmitting(false);
      })
      .catch(err => {
        setSubmitting(false);
        // console.log(err);
      });
  },
})(UserForm);

const mapDispatchToProps = {
  setAuthUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(UserFormContainer);
