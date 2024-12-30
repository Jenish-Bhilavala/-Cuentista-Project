module.exports = {
  // Create inquiry
  firstNameEmptyData: {
    first_name: '',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    message: 'This is a test message',
  },

  missingFieldData: {
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    message: 'This is a test message',
  },

  invalidEmailData: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe.om',
    phone: '1234567890',
    message: 'This is a test message',
  },

  invalidPhoneData: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '123456789',
    message: 'This is a test message',
  },

  invalidTypeData: {
    first_name: 3213,
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    message: 'This is a test message',
  },

  validInquiryData: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    message: 'This is a test message',
  },

  // List inquiry
  pagination: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    orderBy: 'desc',
  },
};
