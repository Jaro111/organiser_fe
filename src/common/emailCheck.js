export const emailCheck = (email) => {
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  };

  if (validateEmail(email)) {
    return true;
  } else {
    return false;
  }
};
