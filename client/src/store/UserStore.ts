/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState } from 'react';

export interface IUserStore {
  isAuthenticated: boolean;
  userName:string;
  email:string;
  avatar:string;
  registerUser: (data: FormData, resetForm: () => void) => void;
}

export const userStoreInitialState = {
  isAuthenticated: false,
  userName:'',
  email:'',
  avatar:'',
  registerUser: () => {},
};

export const userStore = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStoreInitialState.isAuthenticated);
  const [userName, setUserName] = useState<string>(userStoreInitialState.userName);
  const [email, setEmail] = useState<string>(userStoreInitialState.email);
  const [avatar, setAvatar] = useState<string>(userStoreInitialState.avatar);

  const registerUser = async (userData: FormData, resetForm: () => void) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/register', userData);
      if(data.token) localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUserName(userData.get('name')?.toString() ?? '');
      setEmail(userData.get('email')?.toString() ?? '');
      setAvatar(userData.get('avatar')?.toString() ?? '');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuthenticated,
    userName,
    email,
    avatar,
    registerUser,
  };
};
