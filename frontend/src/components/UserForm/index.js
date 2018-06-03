import UserForm from './UserForm';
import { withFormik } from 'formik';
import { UserAuthApi } from '../../services';
import { connect } from 'react-redux';
import { setAuthUser } from '../../actions';

const mapDispatchToProps = {
  setAuthUser,
};

const UserFormContainer = withFormik({
  mapPropsToValues: ({ user }) => {
    return { email: user.email, first_name: user.first_name, last_name: user.last_name };
  },

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    UserAuthApi.update(values)
      .then(resp => {
        props.setAuthUser(resp);
        setSubmitting(false);
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  },
})(UserForm);

export default connect(
  null,
  mapDispatchToProps,
)(UserFormContainer);
