import { useFormik } from 'formik';
import { object } from 'yup';
import { signInUserValidations } from './validations';
// import { useStore } from 'store/Store';

export interface SignInFormik{
  userEmail:string;
  password:string;
}

export default function useSignInFormik() {
  // const {
  //   booksContext: { addBook },
  // } = useStore();

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
      // addBook(values, resetForm, setSubmitting);
    },
  });
}
