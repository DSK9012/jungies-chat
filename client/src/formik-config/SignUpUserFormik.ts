import { useFormik } from 'formik';
import { object } from 'yup';
import { signUpUserValidations } from './validations';
// import { useStore } from 'store/Store';

export interface SignUpFormik{
  email:string;
  password:string;
  confirmPassword:string;
  userAvatar:string;
}

export default function useSignUpFormik() {
  // const {
  //   booksContext: { addBook },
  // } = useStore();

  return useFormik<SignUpFormik>({
    initialValues: {
      email: '',
      password:'',
      confirmPassword:'',
      userAvatar:'',
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: object(signUpUserValidations),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      // addBook(values, resetForm, setSubmitting);
    },
  });
}
