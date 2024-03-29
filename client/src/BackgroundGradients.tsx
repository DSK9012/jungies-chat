import styled from '@emotion/styled';

function BackgroundGradients() {
  return (
    <>
      <GlassCircleGradient1 />
      <GlassCircleGradient2 />
      <GlassCircleGradient3 />
    </>
  );
}

const GlassCircleGradient1 = styled('span')({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#32b8a2fa, #ffaa00, #ed5b09)',
  borderRadius: '50%',
  top: '-1%',
  left: '2%',
});

const GlassCircleGradient2 = styled('span')({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#b25019, #3bac7ea1, #070e0dfa)',
  borderRadius: '50%',
  bottom: '-10%',
  left: '25%',
});

const GlassCircleGradient3 = styled('span')({
  position: 'absolute',
  width: '200px',
  height: '200px',
  background: 'linear-gradient(#f07f00, #03f9abbf, #337f5c)',
  borderRadius: '50%',
  right: '-2%',
  top: '5%',
});

export default BackgroundGradients;
