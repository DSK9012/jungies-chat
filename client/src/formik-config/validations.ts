// Regex for (809) 6056-899 - /^\(?([2-9]\d{2})\)? ?(\d{3})-?(\d{4})$/
import { ref, string } from 'yup';

export const signUpUserValidations = {
  userEmail: string().required('User Email is required.').email('Please enter a valild email.'),
  password: string().required('Password is required.').min(6, 'Password should contain 6 characters atleast.').max(20, 'Should not exceed 20 characters.'),
  confirmPassword: string().required('Please confirm the password.').oneOf([ref('password')], 'Passwords are not matching.'),
  userAvatar:string(),
};

export const signInUserValidations = {
  userEmail: string().required('User Email is required.').email('Please enter a valild email.'),
  password: string().required('Password is required.').min(6, 'Password should contain 6 characters atleast.').max(20, 'Should not exceed 20 characters.'),
};
