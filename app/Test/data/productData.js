module.exports = {
  // common
  emptyPayload: {},
  // add product
  validProductData: {
    product_name: 'Vivo t2 5G',
    product_description: 'A great product for testing purposes.',
    images: {
      overview_image: 'overview.jpg',
      service_image: 'service.jpg',
      right_side_image1: 'right1.jpg',
      right_side_image2: 'right2.jpg',
    },
    contact: '123-456-7890',
    product_benefit: [
      { benefit_description: 'Benefit 1' },
      { benefit_description: 'Benefit 2' },
    ],
    product_service: [
      {
        service_type: 'Service 1',
        service_details: [
          { service_detail: 'Detail 1' },
          { service_detail: 'Detail 2' },
        ],
      },
    ],
    methodology: [{ methodology_steps: 'Step 1' }],
    expertise: [{ area: 'Area 1', description: 'Description 1' }],
  },

  dummyProductData: {
    product_name: 'Product A',
    product_description: 'A great product for testing purposes.',
    images: {
      overview_image: 'overview.jpg',
      service_image: 'service.jpg',
      right_side_image1: 'right1.jpg',
      right_side_image2: 'right2.jpg',
    },
    contact: '123-456-7890',
    product_benefit: [{ benefit_description: 'Benefit 1' }],
    product_service: [
      {
        service_type: 'Service 1',
        service_details: [{ service_detail: 'Detail 1' }],
      },
    ],
    methodology: [{ methodology_steps: 'Step 1' }],
    expertise: [{ area: 'Area 1', description: 'Description 1' }],
  },

  emptyNameProductData: {
    product_name: '',
    product_description: 'A great product for testing purposes.',
    images: {
      overview_image: 'overview.jpg',
      service_image: 'service.jpg',
      right_side_image1: 'right1.jpg',
      right_side_image2: 'right2.jpg',
    },
    contact: '123-456-7890',
    product_benefit: [{ benefit_description: 'Benefit 1' }],
    product_service: [
      {
        service_type: 'Service 1',
        service_details: [{ service_detail: 'Detail 1' }],
      },
    ],
    methodology: [{ methodology_steps: 'Step 1' }],
    expertise: [{ area: 'Area 1', description: 'Description 1' }],
  },

  missingProductContactData: {
    product_name: 'Product A',
    product_description: 'A great product for testing purposes.',
    images: {
      overview_image: 'overview.jpg',
      service_image: 'service.jpg',
      right_side_image1: 'right1.jpg',
      right_side_image2: 'right2.jpg',
    },
    product_benefit: [{ benefit_description: 'Benefit 1' }],
    product_service: [
      {
        service_type: 'Service 1',
        service_details: [{ service_detail: 'Detail 1' }],
      },
    ],
    methodology: [{ methodology_steps: 'Step 1' }],
    expertise: [{ area: 'Area 1', description: 'Description 1' }],
  },

  differentDatatypeContactData: {
    product_name: 'Product B',
    product_description: 'A great product for testing purposes.',
    images: {
      overview_image: 123,
      service_image: 'service.jpg',
      right_side_image1: 'right1.jpg',
      right_side_image2: 'right2.jpg',
    },
    contact: 123 - 456 - 7890,
    product_benefit: [{ benefit_description: 'Benefit 1' }],
    product_service: [
      {
        service_type: 'Service 1',
        service_details: [{ service_detail: 'Detail 1' }],
      },
    ],
    methodology: [{ methodology_steps: 'Step 1' }],
    expertise: [{ area: 'Area 1', description: 'Description 1' }],
  },

  // listOfProduct
  pagination: {
    page: 1,
    limit: 2,
    sortBy: 'createdAt',
    orderBy: 'ASC',
  },

  // update product
  updateTypeCheck: {
    product_name: 132,
  },
};
