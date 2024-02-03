import { useStore } from 'store/Store';
import { ReactComponent as NoSearchResulstsImg } from 'assets/no-search-results.svg';
import { ReactComponent as ErrorImg } from 'assets/error.svg';
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
    },
  } = useStore();

  const handleSelectUser = (user: IContact) => {
    const modifiedUser = { ...user, messages: { ...user.messages, isLoading: true } };
    dispatch({ type: 'SELECT_NEW_CONTACT', payload: modifiedUser });
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
        <ErrorImg width='180px' height='200px' />
        <$NoContactsText>Ooops, Please try again</$NoContactsText>
      </$NoContactsContainer>
    );
  }

  if (!data.length) {
    return (
      <$NoContactsContainer>
        <NoSearchResulstsImg width='180px' height='200px' />
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
