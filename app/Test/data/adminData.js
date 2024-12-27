module.exports = {
  validAdminLoginData: {
    email: 'admin@gmail.com',
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
};
