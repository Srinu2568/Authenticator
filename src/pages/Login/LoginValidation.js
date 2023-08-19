const email_pattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateEmail = (email) => {
  let errors = {};
  if (email.toString().trim() === '') {
    errors.email = 'Email should not be empty';
  } else if (!email_pattern.test(email)) {
    errors.email = 'Invalid Email';
  } else {
    errors.email = null;
  }
  return errors;
};

export const validatePassword = (password) => {
  let errors = {};
  if (password.toString().trim() === '') {
    errors.password = 'Password should not be empty';
  } else if (password.toString().trim().length < 6) {
    errors.password = 'Password is too short!';
  } else {
    errors.password = null;
  }
  return errors;
};
