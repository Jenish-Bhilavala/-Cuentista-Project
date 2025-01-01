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

  productRoutes: {
    addProduct: '/api/product',
    viewProduct: '/api/product/view-product/:id',
    getListOfProduct: '/api/product/get-product-list',
    listOfProduct: '/api/product/list-of-product',
    updateProduct: '/api/product/update-product/:id',
    deleteProduct: '/api/product/delete-product/:id',
  },
};
