const pagination = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  orderBy: 'desc',
};

const invalidInquiryData = {
  first_name: '',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  message: 'This is a test message',
};

const validInquiryData = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  message: 'This is a test message',
};

module.exports = {
  pagination,
  invalidInquiryData,
  validInquiryData,
};
