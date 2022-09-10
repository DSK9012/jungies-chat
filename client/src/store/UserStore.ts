/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { SignInFormik } from 'formik-config/SignInUserFormik';
import setAuthToken from 'helpers/set-auth-token';

interface IContact{
  _id:string;
  name:string;
  email:string;
  lastMessage:string;
  createdAt:string;
  updatedAt:string;
  chatId:string;
  userId:string;
  contactUserId:string;
  unreadNotifications:number;
}

interface IUser{
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

interface IUserInfo extends IUser {
  contacts: IContact[];
}

export interface IUserStore {
  isAuthenticated: boolean;
  userLoading: boolean;
  userInfo: IUserInfo;
  searchedUsers:IUser[];
  registerUser: (data: FormData, resetForm: () => void) => void;
  loginUser: (data: SignInFormik, resetForm: () => void) => void;
  getUser: () => void;
  searchUsers: (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export const userStoreInitialState = {
  isAuthenticated: false,
  userLoading: true,
  userInfo: {
    _id: '',
    name: '',
    email: '',
    createdAt:'',
    updatedAt:'',
    contacts:[],
  },
  searchedUsers:[],
  registerUser: () => undefined,
  loginUser: () => undefined,
  getUser: () => undefined,
  searchUsers: () => undefined,
};

export const userStore = () => {
  const [userLoading, setUserLoading] = useState<boolean>(userStoreInitialState.userLoading);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStoreInitialState.isAuthenticated);
  const [userInfo, setUserInfo] = useState<IUserInfo>(userStoreInitialState.userInfo);
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>(userStoreInitialState.searchedUsers);

  const registerUser = async (userData: FormData, resetForm: () => void) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/register', userData);
      if (data.token) localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUserInfo(prevState=>({
        ...prevState,
        name: userData.get('name')?.toString() ?? '',
        email: userData.get('email')?.toString() ?? '',
        _id: data.id,
      }));
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  const loginUser = async (userData: SignInFormik, resetForm: () => void) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/login', userData);
      if (data.token) localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUserInfo(prevState=>({
        ...prevState,
        name: '',
        email: userData.email,
        _id: data.id,
      }));
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  const getUser = async () => {
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));
    try {
      const { data } = await axios('http://localhost:5000/api/user');
      setIsAuthenticated(true);
      setUserInfo(prevState=>({
        ...prevState,
        name: data.name,
        email: data.email,
        // eslint-disable-next-line no-underscore-dangle
        _id: data._id,
      }));
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  const searchUsers = async (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

    try {
      const { data } = await axios.post(`http://localhost:5000/api/user/search?search=${event.target.value}`);
      setSearchedUsers(data);
    } catch (error) {
      console.log(error);
    }
    setUserLoading(false);
  };

  return {
    isAuthenticated,
    userInfo,
    userLoading,
    searchedUsers,
    registerUser,
    loginUser,
    getUser,
    searchUsers
  };
};
