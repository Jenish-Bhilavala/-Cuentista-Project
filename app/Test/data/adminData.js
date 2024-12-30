module.exports = {
  // Common
  emptyPayload: {},

  // Login
  loginEmailTypeCheck: {
    email: 123,
    password: 'Admin@1234',
  },

  loginMissingPassword: {
    email: 'admin@gmail.com',
  },

  loginInvalidEmail: {
    email: 'admin@.vom',
  },

  loginInvalidPassword: {
    email: 'admin@gmail.com',
    password: 'admin',
  },

  loginEmptyEmail: {
    email: '',
    password: 'Admin@1234',
  },

  loginNotFound: {
    email: 'notfound@gmail.com',
    password: 'NotFound@123',
  },

  loginCredentialNotMatch: {
    email: 'admin@gmail.com',
    password: 'WrongP@ss12',
  },

  validAdminLoginData: {
    email: 'admin@gmail.com',
    password: 'Admin@1234',
  },

  // Verify email
  verifyEmailTypeCheck: {
    email: 123,
  },

  verifyInvalidEmail: {
    email: 'abc.com',
  },

  verifyWrongEmail: {
    email: 'user@gmail.com',
  },

  verifyValidEmail: {
    email: 'admin@gmail.com',
  },

  // change pw
  changePasswordTypeCheck: {
    email: 'admin@gmail.com',
    current_password: 1234,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  changeFieldRequired: {
    email: 'admin@gmail.com',
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  changePasswordFormate: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'admin@1234',
    confirm_password: 'Admin@1234',
  },

  changeEmptyField: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
    new_password: '',
    confirm_password: 'Admin@1234',
  },

  changeFakeData: {
    email: 'fake@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  changeDifferentPassword: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'Different@1234',
    confirm_password: 'Admin@1234',
  },

  changIsPasswordMatch: {
    email: 'admin@gmail.com',
    current_password: 'abcd@1234',
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  ValidChangePasswordData: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  // forgot password
  forgotEmailTypeCheck: {
    email: 123,
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  forgotRequiredField: {
    email: 'admin@gmail.com',
    otp: 235251,
    confirm_password: 'Admin@1234',
  },

  forgotInvalidEmail: {
    email: 'notfound@.com',
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  forgotEmptyString: {
    email: '',
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  forgotEmailNotFound: {
    email: 'notfound@gmail.com',
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  forgotOTPNotFound: {
    email: 'admin@gmail.com',
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  adminLoin: {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'Admin@1234',
  },
};
