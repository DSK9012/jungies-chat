
export interface IUserStore{
  registerUser: () => void,
}

export const userStoreInitialState = {
  registerUser: () => {},
};

export const userStore=()=>{
  const registerUser = () => {
    console.log('add user');
  };

  return {
    registerUser,
  };
};
