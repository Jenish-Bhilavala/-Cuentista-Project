const chai = require('chai');
const supertest = require('supertest');
const productModel = require('../../models/productModel');
const { StatusCodes } = require('http-status-codes');
const app = require('../../../server');
const expect = chai.expect;
const { response } = require('../../utils/enum');
const message = require('../../utils/message');
const mongoose = require('mongoose');
const productData = require('../data/productData');
const { productRoutes } = require('../data/routesData');

let productId;
const fakeId = new mongoose.Types.ObjectId();

// before(async () => {
//   const product = new productModel(productData.dummyProductData);
//   const savedProduct = await product.save();
//   productId = savedProduct._id;
// });

// after(async () => {
//   await productModel.deleteOne({ _id: productId });
// });

describe('Product Controller', function () {
  describe('add product', () => {
    it('should return validation error if image url is not string.', async () => {
      const res = await supertest(app)
        .post(productRoutes.addProduct)
        .send(productData.differentDatatypeContactData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Overview image must be a string.');
    });

    it('should return validation error if payload is empty.', async () => {
      const res = await supertest(app)
        .post(productRoutes.addProduct)
        .send(productData.emptyPayload)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Product name is required.');
    });

    it('should return validation error if product contact is missing.', async () => {
      const res = await supertest(app)
        .post(productRoutes.addProduct)
        .send(productData.missingProductContactData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Contact is required.');
    });

    it('should return validation error if product name is empty string.', async () => {
      const res = await supertest(app)
        .post(productRoutes.addProduct)
        .send(productData.emptyNameProductData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.include('Product name cannot be empty.');
    });

    it('should save product successfully.', async () => {
      const res = await supertest(app)
        .post(productRoutes.addProduct)
        .send(productData.validProductData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.message).to.equal(
        `Product ${message.ADDED_SUCCESSFULLY}`
      );
      expect(res.body.data).to.have.property('_id');

      productId = res.body.data._id;
    });

    it('should return error if try to save same named product', async () => {
      const res = await supertest(app)
        .post(productRoutes.addProduct)
        .send(productData.validProductData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(`Product ${message.ALREADY_EXISTS}`);
    });
  });

  describe('view product', () => {
    it('should return error if no product found.', async () => {
      const res = await supertest(app)
        .get(`${productRoutes.viewProduct.replace(':id', fakeId)}`)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Product ${message.NOT_FOUND}`);
    });

    it('should return product successfully.', async () => {
      const res = await supertest(app)
        .get(productRoutes.viewProduct.replace(':id', productId))
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.OK);
      expect(res.body.data).to.have.property('_id');
      expect(res.body.data._id).to.equal(productId.toString());
    });
  });

  describe('get product  list', () => {
    // it('should return error if product not found', async () => {
    //   await productModel.deleteMany({});
    //   const res = await supertest(app)
    //     .get(productRoutes.getListOfProduct)
    //     .expect(StatusCodes.OK);

    //   expect(res.body.status).to.equal(response.ERROR);
    //   expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
    //   expect(res.body.message).to.equal(`Product ${message.NOT_FOUND}`);
    // });

    it('should return product list ', async () => {
      const res = await supertest(app)
        .get(productRoutes.getListOfProduct)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.OK);
      expect(res.body.data[0]).to.have.property('_id');
      expect(Array.isArray(res.body.data)).to.be.true;
    });
  });

  describe('list of product', () => {
    it('should return a not found when no products are found', async () => {
      const res = await supertest(app)
        .post(productRoutes.listOfProduct)
        .send({ searchTerm: 'non-existent product' })
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.include('Product not found');
    });

    it('should return a list of products with pagination and correct fields', async () => {
      const res = await supertest(app)
        .post(productRoutes.listOfProduct)
        .send(productData.pagination)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.OK);
      expect(Array.isArray(res.body.data.listOfProduct)).to.be.true;
      expect(res.body.data).to.have.property('currentPage');
      expect(res.body.data).to.have.property('totalPage');
    });
  });

  describe('update product', () => {
    it('should return validation error if product name is not string.', async () => {
      const res = await supertest(app)
        .put(productRoutes.updateProduct.replace(':id', productId))
        .send(productData.updateTypeCheck)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Product name must be a string.');
    });

    it('should return error if product not found.', async () => {
      const res = await supertest(app)
        .put(productRoutes.updateProduct.replace(':id', fakeId))
        .send(productData.emptyPayload)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Product ${message.NOT_FOUND}`);
    });
  });
});
