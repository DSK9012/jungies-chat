/* eslint-disable no-unused-vars */
export type FormTypes = 'sign-in-form' | 'sign-up-form';

export interface IUser {
  id: string;
  name: string;
  email: string;
  active: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContact {
  id: string;
  chatId: string;
  userId: string;
  contactUserId: string;
  name: string;
  lastMessage: string;
  unreadNotifications: number;
  messages: {
    isLoading: boolean;
    hasError: boolean;
    data: IMessage[];
  };
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
  id?: string;
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
}
