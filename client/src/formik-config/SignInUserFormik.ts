import { useFormik } from 'formik';
import { useStore } from 'store/Store';
import { object } from 'yup';
import { signInUserValidations } from './validations';

export interface SignInFormik{
  userEmail:string;
  password:string;
}

export default function useSignInFormik() {
  const {
    userContext: { registerUser },
  } = useStore();

  return useFormik<SignInFormik>({
    initialValues: {
      userEmail: '',
      password:'',
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: object(signInUserValidations),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      registerUser();
    },
  });
}
