import { useFormik } from 'formik';
import { object } from 'yup';
import { useStore } from 'store/Store';
import { signInUserValidations } from './validations';

export interface SignInFormik{
  email:string;
  password:string;
}

export default function useSignInFormik() {
  const {
    userContext: { registerUser },
  } = useStore();

  return useFormik<SignInFormik>({
    initialValues: {
      email: '',
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
