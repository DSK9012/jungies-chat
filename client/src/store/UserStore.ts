/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState } from 'react';
import { SignInFormik } from 'formik-config/SignInUserFormik';
import setAuthToken from 'helpers/set-auth-token';

interface IUserInfo{
  id:string;
  userName:string;
  email:string;
}
export interface IUserStore {
  isAuthenticated: boolean;
  userLoading:boolean;
  userInfo:IUserInfo;
  registerUser: (data: FormData, resetForm: () => void) => void;
  loginUser: (data: SignInFormik, resetForm: () => void) => void;
  getUser: () => void;
}

export const userStoreInitialState = {
  isAuthenticated: false,
  userLoading:true,
  userInfo:{
    id:'',
    userName:'',
    email:'',
  },
  registerUser: () => undefined,
  loginUser: () => undefined,
  getUser: () => undefined,
};

export const userStore = () => {
  const [userLoading, setUserLoading] = useState<boolean>(userStoreInitialState.userLoading);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStoreInitialState.isAuthenticated);
  const [userInfo, setUserInfo] = useState<IUserInfo>(userStoreInitialState.userInfo);

  const registerUser = async (userData: FormData, resetForm: () => void) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/register', userData);
      if(data.token) localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUserInfo({
        userName: userData.get('name')?.toString() ?? '',
        email: userData.get('email')?.toString() ?? '',
        id: data.id
      });
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  const loginUser = async (userData: SignInFormik, resetForm: () => void) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/login', userData);
      if(data.token) localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUserInfo({
        userName: '',
        email: userData.email,
        id: data.id
      });
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  const getUser = async () => {
    if(localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));
    try {
      const { data } = await axios('http://localhost:5000/api/user');
      setIsAuthenticated(true);
      setUserInfo({
        userName: data.name,
        email: data.email,
        // eslint-disable-next-line no-underscore-dangle
        id: data._id
      });
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  return {
    isAuthenticated,
    userInfo,
    userLoading,
    registerUser,
    loginUser,
    getUser,
  };
};
