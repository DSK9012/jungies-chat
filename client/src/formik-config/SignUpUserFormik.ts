import { useFormik } from 'formik';
import { object } from 'yup';
import signUpUserValidations from './validations';
// import { object } from 'yup';
// import { useStore } from 'store/Store';
// import addBookValidations from './Validations';

export interface SignUpFormik{
  userEmail:string;
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
      userEmail: '',
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
