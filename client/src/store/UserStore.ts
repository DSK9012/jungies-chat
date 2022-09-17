/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosResponse } from 'axios';
import { useState, ChangeEvent, Dispatch, SetStateAction, useReducer } from 'react';
import { SignInFormik } from 'formik-config/SignInUserFormik';
import setAuthToken from 'helpers/set-auth-token';
import { IContact, ISearchedUsers, IUser, IUserInfo } from 'helpers/types';
import { userInfoReducer } from './user-info-reducer';
import { Actions } from './action-types';

export interface IUserStore {
  userInfo: IUserInfo;
  searchedUsers: ISearchedUsers;
  selectedUser: IContact | null;
  dispatch: Dispatch<Actions>;
  registerUser: (data: FormData, resetForm: () => void) => void;
  loginUser: (data: SignInFormik, resetForm: () => void) => void;
  getUser: () => void;
  searchUsers: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setSearchedUsers: Dispatch<SetStateAction<ISearchedUsers>>;
  setSelectedUser: Dispatch<SetStateAction<IContact | null>>;
}

export const userStoreInitialState = {
  userInfo: {
    id: '',
    name: '',
    email: '',
    active: false,
    lastActive: '',
    createdAt: '',
    updatedAt: '',
    contacts: {
      isLoading: false,
      hasError: false,
      data: [],
    },
    isAuthenticated: false,
    isLoading: true,
    hasError: false,
  },
  searchedUsers: {
    isLoading: false,
    hasError: false,
    data: [],
  },
  selectedUser: null,
  dispatch: () => undefined,
  registerUser: () => undefined,
  loginUser: () => undefined,
  getUser: () => undefined,
  searchUsers: () => undefined,
  setSearchedUsers: () => undefined,
  setSelectedUser: () => undefined,
};

export const userStore = () => {
  const [userInfo, dispatch] = useReducer(userInfoReducer, userStoreInitialState.userInfo);
  const [searchedUsers, setSearchedUsers] = useState<ISearchedUsers>(userStoreInitialState.searchedUsers);
  const [selectedUser, setSelectedUser] = useState<IContact | null>(userStoreInitialState.selectedUser);

  const registerUser = async (userData: FormData, resetForm: () => void) => {
    try {
      const {
        data: { user, token },
      } = await axios.post('http://localhost:5000/api/user/register', userData);
      if (token) localStorage.setItem('token', token);
      dispatch({
        type: 'AUTHENTICATED',
        payload: {
          ...user,
          id: user._id,
        },
      });
    } catch (error) {
      dispatch({ type: 'HAS_ERROR' });
    }
  };

  const loginUser = async (userData: SignInFormik, resetForm: () => void) => {
    try {
      const {
        data: { user, token },
      } = await axios.post('http://localhost:5000/api/user/login', userData);
      if (token) localStorage.setItem('token', token);
      dispatch({
        type: 'AUTHENTICATED',
        payload: {
          ...user,
          id: user._id,
        },
      });
    } catch (error) {
      dispatch({ type: 'HAS_ERROR' });
    }
  };

  const getUser = async () => {
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));
    try {
      const {
        data: { user },
      } = await axios('http://localhost:5000/api/user');
      dispatch({
        type: 'AUTHENTICATED',
        payload: {
          ...user,
          id: user._id,
        },
      });
    } catch (error) {
      dispatch({ type: 'HAS_ERROR' });
    }
  };

  const searchUsers = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));

    setSearchedUsers((prevState) => ({ ...prevState, isLoading: prevState.data.length === 0 }));
    try {
      const {
        data: { users },
      } = await axios.post(`http://localhost:5000/api/user/search?search=${event.target.value}`);
      const fetchedUsers: IContact[] = [];
      for (let i = 0; i < users.length; i++) {
        const existedContactIndex = userInfo.contacts.data.findIndex((user) => user.id === users[i]._id);
        if (existedContactIndex !== -1) {
          fetchedUsers.unshift(userInfo.contacts.data[existedContactIndex]);
        } else {
          const user = {
            ...users[i],
            id: '',
            userId: userInfo.id,
            contactUserId: users[i]._id,
            lastMessage: '',
            unreadNotifications: 0,
            messages: {
              isLoading: false,
              hasError: false,
              data: [],
            },
          };
          fetchedUsers.push(user);
        }
      }
      setSearchedUsers((prevState) => ({ ...prevState, isLoading: false, hasError: false, data: fetchedUsers }));
    } catch (error) {
      setSearchedUsers((prevState) => ({ ...prevState, isLoading: false, hasError: true }));
    }
  };

  return {
    userInfo,
    searchedUsers,
    selectedUser,
    dispatch,
    setSelectedUser,
    setSearchedUsers,
    registerUser,
    loginUser,
    getUser,
    searchUsers,
  };
};
