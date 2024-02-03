export const getAvatarBgColor = (name: string, saturation = 30, lightness = 50) => {
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
