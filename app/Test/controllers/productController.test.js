const chai = require('chai');
const supertest = require('supertest');
const productModel = require('../../models/productModel');
const { StatusCodes } = require('http-status-codes');
const app = require('../../../server');
const expect = chai.expect;
const { response } = require('../../utils/enum');
const message = require('../../utils/message');
const mongoose = require('mongoose');
const {
  validProductData,
  dummyProductData,
  emptyNameProductData,
  missingProductContactData,
  differentDatatypeImagedata,
  differentDatatypeContactData,
} = require('../data/productData');

let productId;

before(async () => {
  const product = new productModel(dummyProductData);
  const savedProduct = await product.save();
  productId = savedProduct._id;
});

after(async () => {
  await productModel.deleteOne({ _id: productId });
});

describe('Product Controller', function () {
  describe('add product', () => {
    it('should return validation error if product name is empty', async () => {
      const res = await supertest(app)
        .post('/api/product')
        .send(emptyNameProductData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.message).to.include('Product name cannot be empty.');
    });

    it('should return validation error if product contact is missing', async () => {
      const res = await supertest(app)
        .post('/api/product')
        .send(missingProductContactData)
        .expect(StatusCodes.OK);

      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Contact is a required field.');
    });

    // it('should return validation error if image url is not string', async () => {
    //   const res = await supertest(app)
    //     .post('/api/product')
    //     .send(differentDatatypeImagedata)
    //     .expect(StatusCodes.OK);

    //   expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
    //   expect(res.body.message).to.equal('j');
    // });

    it('should return validation error if image contact is not string', async () => {
      const res = await supertest(app)
        .post('/api/product')
        .send(differentDatatypeContactData)
        .expect(StatusCodes.OK);

      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Contact must be a string.');
    });

    it('should return error if try to save same named product', async () => {
      const res = await supertest(app)
        .post('/api/product')
        .send(dummyProductData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(`Product ${message.ALREADY_EXISTS}`);
    });

    it('should save product successfully.', async () => {
      const res = await supertest(app)
        .post('/api/product')
        .send(validProductData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.message).to.equal(
        `Product ${message.ADDED_SUCCESSFULLY}`
      );
      expect(res.body.data).to.have.property('_id');

      await productModel.deleteMany({});
    });
  });
});
