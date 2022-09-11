/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SignInFormik } from 'formik-config/SignInUserFormik';
import setAuthToken from 'helpers/set-auth-token';

export interface IUser{
  _id: string;
  name: string;
  email: string;
  active:boolean;
  lastActive:string;
  createdAt: string;
  updatedAt: string;
}

interface IContact extends IUser{
  lastMessage:string;
  chatId:string;
  userId:string;
  contactUserId:string;
  unreadNotifications:number;
}


interface IUserInfo extends IUser {
  contacts: IContact[];
}

interface IMessage{
  _id:string;
  chatId:string;
  sentBy:{
    userId:string;
    name:string;
  };
  sentTo:{
    userId:string;
    name:string;
  },
  message:string;
  status:['SENT', 'DELIVERED', 'READ'];
}

interface ISelectedUser extends IContact {
  messages: IMessage[];
}

export interface IUserStore {
  isAuthenticated: boolean;
  userLoading: boolean;
  userInfo: IUserInfo;
  searchedUsers:IUser[];
  selectedUser:ISelectedUser | null;
  registerUser: (data: FormData, resetForm: () => void) => void;
  loginUser: (data: SignInFormik, resetForm: () => void) => void;
  getUser: () => void;
  searchUsers: (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  setSearchedUsers:Dispatch<SetStateAction<IUser[]>>;
  setSelectedUser: Dispatch<SetStateAction<ISelectedUser | null>>;
  setUserInfo: Dispatch<SetStateAction<IUserInfo>>;
}

export const userStoreInitialState = {
  isAuthenticated: false,
  userLoading: true,
  userInfo: {
    _id: '',
    name: '',
    email: '',
    active:false,
    lastActive:'',
    createdAt:'',
    updatedAt:'',
    contacts:[],
  },
  searchedUsers:[],
  selectedUser: null,
  registerUser: () => undefined,
  loginUser: () => undefined,
  getUser: () => undefined,
  searchUsers: () => undefined,
  setSearchedUsers: () => undefined,
  setSelectedUser: () => undefined,
  setUserInfo: () => undefined,
};

export const userStore = () => {
  const [userLoading, setUserLoading] = useState<boolean>(userStoreInitialState.userLoading);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStoreInitialState.isAuthenticated);
  const [userInfo, setUserInfo] = useState<IUserInfo>(userStoreInitialState.userInfo);
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>(userStoreInitialState.searchedUsers);
  const [selectedUser, setSelectedUser] = useState<ISelectedUser | null>(userStoreInitialState.selectedUser);

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
    selectedUser,
    setSelectedUser,
    setUserInfo,
    setSearchedUsers,
    registerUser,
    loginUser,
    getUser,
    searchUsers
  };
};
