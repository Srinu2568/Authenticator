const email_pattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateName = (name) => {
  let errors = {};
  if (name.toString().trim() === '' || name.toString().trim().length < 5) {
    errors.name = 'Name is too short!';
  } else {
    errors.name = null;
  }
  return errors;
};

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

export const validateConfirmPassword = (confirmPassword, password) => {
  let errors = {};
  if (confirmPassword.toString().trim() === '') {
    errors.confirmPassword = "Password can't be empty";
  } else if (confirmPassword.toString().trim() !== password.toString().trim()) {
    errors.confirmPassword = 'Passwords must match';
  } else {
    errors.confirmPassword = null;
  }
  return errors;
};
