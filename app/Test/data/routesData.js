module.exports = {
  inquiryRoutes: {
    createInquiry: '/api/inquiry/create-inquiry',
    listOfInquiry: '/api/inquiry/list-of-inquiry',
    updateInquiry: '/api/inquiry/update-inquiry/:id',
  },

  adminRoutes: {
    adminLogin: '/api/admin/login',
    verifyEmail: '/api/admin/verify-email',
    changePassword: '/api/admin/change-password',
    forgotPassword: '/api/admin/forgot-password',
  },
};
