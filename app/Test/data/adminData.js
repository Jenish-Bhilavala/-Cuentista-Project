module.exports = {
  // Login
  validAdminLoginData: {
    email: 'admin@gmail.com',
    password: 'Admin@1234',
  },

  invalidAdminLoginData: {
    email: 'admin@gmail.com',
    password: 'Admin@123',
  },

  dummyAdminLoginData: {
    email: 'dummy@gmail.com',
    password: 'Admin@1234',
  },

  missingEmailData: {
    password: 'Admin@1234',
  },

  missingPasswordData: {
    email: 'admin@gmail.com',
  },

  invalidEmailData: {
    email: 'abc@.com',
    password: 'Admin@1234',
  },

  invalidPasswordData: {
    email: 'admin@gmail.com',
    password: 'admin@4321',
  },

  // Verify email
  wrongEmail: {
    email: 'wrong@gmail.com',
  },

  // change pw
  missingNewPassword: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
  },

  wrongEmailChangePW: {
    email: 'wrong@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  wrongConfirmPW: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'Admin@1234',
    confirm_password: 'min@1234',
  },

  ValidChangePasswordData: {
    email: 'admin@gmail.com',
    current_password: 'Admin@1234',
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  // forgot password
  EmailNotFoundForgotData: {
    email: 'notfound@gmail.com',
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  OTPNotFoundForgotData: {
    email: 'admin@gmail.com',
    otp: 235251,
    new_password: 'Admin@1234',
    confirm_password: 'Admin@1234',
  },

  newPasswordMissingForgotData: {
    email: 'admin@gmail.com',
    otp: 1234556,
  },
};
