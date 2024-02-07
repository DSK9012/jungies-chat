import styled from '@emotion/styled';
import { useState } from 'react';

function Header() {
  const [toggleHeaderStyle, setToggleHeaderStyle] = useState(true);

  return (
    <Title
      className={toggleHeaderStyle ? 'gradient-text' : 'glowing-text'}
      onClick={() => setToggleHeaderStyle((prevState) => !prevState)}
    >
      Jungies Kaburulu
    </Title>
  );
}

const Title = styled('h3')({
  fontSize: '40px',
  padding: '0 4px',
  fontFamily: 'Oleo Script Swash Caps, cursive',
  color: '#fff',
  cursor: 'pointer',
  '&.glowing-text': {
    textShadow: '0 0 5px  #47e7e7, 0 0 10px #47e7e7, 0 0 20px #47e7e7, 0 0 40px #47e7e7, 0 0 80px #47e7e7',
  },
  '&.gradient-text': {
    background: 'linear-gradient(to bottom right, #03f9abbf, #32b8a2fa, #ffaa00, #ed5b09)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
});

export default Header;
