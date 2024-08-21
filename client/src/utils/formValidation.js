// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

// Validation functions
export const validateEmail = (email) => {
  return emailRegex.test(email) ? null : "Please enter a valid email address.";
};

export const validatePassword = (password) => {
  return passwordRegex.test(password)
    ? null
    : "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.";
};

export const validateUsername = (username) => {
  return usernameRegex.test(username)
    ? null
    : "Username must be 3-20 characters long and can include letters, numbers, and underscores.";
};

// Combined validation function
export const validateForm = (username, email, password) => {
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  // Return an object with any validation errors
  return {
    usernameError,
    emailError,
    passwordError,
  };
};
