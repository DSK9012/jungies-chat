import { useFormik } from 'formik';
import { object } from 'yup';
import { useStore } from 'store/Store';
import { signUpUserValidations } from './validations';

export interface SignUpFormik{
  name:string;
  email:string;
  password:string;
  confirmPassword:string;
  avatar?:string;
}

export default function useSignUpFormik() {
  const {
    userContext:{registerUser}
  } = useStore();

  return useFormik<SignUpFormik>({
    initialValues: {
      name:'',
      email: '',
      password:'',
      confirmPassword:'',
      avatar:'',
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: object(signUpUserValidations),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const formData = new FormData();
      if(values.avatar){
        formData.append('avatar', values.avatar);
      }
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('confirmPassword', values.confirmPassword);
      setSubmitting(true);
      registerUser(formData, resetForm);
    },
  });
}
