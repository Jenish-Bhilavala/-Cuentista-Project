const chai = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { StatusCodes } = require('http-status-codes');
const inquiryModel = require('../../models/inquiryModel');
const message = require('../../utils/message');
const { response } = require('../../utils/enum');
const { sendMail } = require('../../services/email');
const HandleResponse = require('../../services/errorHandler');
const app = require('../../../server');
const expect = chai.expect;

let mongoServer;
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const testDbUri = `${uri}cuentistaTest`;
  await mongoose.connect(testDbUri);
});

after(function () {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  mongoServer.stop();
});

describe('Inquiry controller', function () {
  this.timeout(5000);

  describe('createInquiry', () => {
    it('should create a new inquiry successfully', async () => {
      const inquiryData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        message: 'This is a test message',
      };

      const res = await supertest(app)
        .post('/api/inquiry/create-inquiry')
        .send(inquiryData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.CREATED);
      expect(res.body.message).to.equal(
        `Inquiry ${message.ADDED_SUCCESSFULLY}`
      );
      expect(res.body.data).to.have.property('id');
    });

    it('should return validation error is any felid is empty', async () => {
      const inquiryData = {
        first_name: '',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        message: 'This is a test message',
      };
      const res = await supertest(app)
        .post('/api/inquiry/create-inquiry')
        .send(inquiryData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('First name cannot be empty.');
    });
  });
});
