module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  //  check username input
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  //  check email input
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email is must be valid email addressed";
    }
  }
  //   check password and confirm password input
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }
  if (password.length <= 6) {
    errors.password = "Password minimum 6 characters";
  }
  if (password !== confirmPassword) {
    errors.password = "Password must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  let errors = {};
  // check username
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateUserUpdate = (username, email) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      errors.email = "Email is must be valid email address";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateUserUpdatePassword = (password, confirmPassword) => {
  const errors = {};
  if (password.trim() === "") {
    errors.password = "Password must not using whitespace";
  }
  if (password.length < 6) {
    errors.password = "Password minimum 6 characters";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
