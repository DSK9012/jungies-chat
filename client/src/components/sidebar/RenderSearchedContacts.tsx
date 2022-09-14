import { useStore } from 'store/Store';
import noSearchResults from 'assets/no-search-results.svg';
import error from 'assets/error.svg';
import { IContact } from 'helpers/types';
import { $Container, $NoContactsContainer, $NoContactsText } from './Contacts';
import RenderContact from './RenderContact';
import RenderContactSkelton from './RenderContactSkelton';

interface IRenderSearchedContactsProps {
  handleClose: () => void;
}

const RenderSearchedContacts = ({ handleClose }: IRenderSearchedContactsProps) => {
  const {
    userContext: {
      searchedUsers: { isLoading, hasError, data },
      dispatch,
      setSelectedUser,
    },
  } = useStore();

  const handleSelectUser = (user: IContact) => {
    dispatch({ type: 'SET_CONTACT', payload: user });
    setSelectedUser(user);
    handleClose();
  };

  if (isLoading) {
    const skelton = [];
    for (let i = 0; i < 10; i++) {
      skelton.push(<RenderContactSkelton />);
    }
    return <$Container style={{ overflow: 'hidden' }}>{skelton}</$Container>;
  }

  if (hasError) {
    return (
      <$NoContactsContainer>
        <img src={error} alt='error' width='180px' height='200px' />
        <$NoContactsText>Ooops, Please try again</$NoContactsText>
      </$NoContactsContainer>
    );
  }

  if (!data.length) {
    return (
      <$NoContactsContainer>
        <img src={noSearchResults} alt='no-search-results' width='180px' height='200px' />
        <$NoContactsText>No search results</$NoContactsText>
      </$NoContactsContainer>
    );
  }

  return (
    <$Container>
      {data.map((user) => (
        <RenderContact user={user} handleSelectUser={handleSelectUser} />
      ))}
    </$Container>
  );
};

export default RenderSearchedContacts;
