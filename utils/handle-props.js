export const handleAvatarProps = (icon, title) => {
  if(icon !== null && icon !== undefined) {
    return { source: { uri: icon }};
  } else {
    return { title }
  }
}

export default handleAvatarProps;