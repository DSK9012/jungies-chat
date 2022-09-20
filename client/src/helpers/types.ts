/* eslint-disable no-unused-vars */
export type FormTypes = 'sign-in-form' | 'sign-up-form';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContact extends IServerContact {
  messages: {
    isLoading: boolean;
    hasError: boolean;
    data: IMessage[];
  };
  unreadNotifications: number;
}

export interface IServerContact {
  _id: string;
  chatType: string;
  createdBy: string;
  users: [];
  lastUpdatedBy: string;
  userId: string;
  contactUserId: string;
  name: string;
  lastMessage: string;
  active: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInfo extends IUser {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasError: boolean;
  contacts: {
    isLoading: boolean;
    hasError: boolean;
    data: IContact[];
  };
}

export interface ISearchedUsers {
  isLoading: boolean;
  hasError: boolean;
  data: IContact[];
}

export enum MessageStatusTypes {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  WAITING = 'WAITING',
}

export interface IMessage {
  _id?: string;
  chatId: string;
  sentBy: {
    userId: string;
    name: string;
  };
  sentTo: {
    userId: string;
    name: string;
  };
  message: string;
  status: MessageStatusTypes;
  usersReadMessage: IBasicUser[];
  createdAt: string;
  updatedAt: string;
}

export enum EChatTypes {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}

interface IBasicUser {
  userId: string;
  name: string;
}

export interface IStore {
  userInfo: IUserInfo;
  searchedUsers: ISearchedUsers;
  selectedUser: IContact | null;
}
