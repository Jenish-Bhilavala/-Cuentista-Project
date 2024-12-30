const chai = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const inquiryModel = require('../../models/inquiryModel');
const message = require('../../utils/message');
const { response } = require('../../utils/enum');
const inquiries = require('../data/inquiryData');
const app = require('../../../server');
const { inquiryRoutes } = require('../data/routesData');
const expect = chai.expect;

let createdInquiryId;

describe('Inquiry controller', function () {
  this.timeout(20000);

  describe('createInquiry', () => {
    it('should return validation error if first name is empty', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.createInquiry)
        .send(inquiries.firstNameEmptyData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('First name cannot be empty.');
    });

    it('should return validation error of first name is missing.', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.createInquiry)
        .send(inquiries.missingFieldData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(`First name is a required field.`);
    });

    it('should return validation error if email is invalid', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.createInquiry)
        .send(inquiries.invalidEmailData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a valid email address.');
    });

    it('should return validation error if phone is not valid', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.createInquiry)
        .send(inquiries.invalidPhoneData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Phone must be exactly 10 digits.');
    });

    it('should return validation error if first name is not string', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.createInquiry)
        .send(inquiries.invalidTypeData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('First name must be a string.');
    });

    it('should create a new inquiry successfully', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.createInquiry)
        .send(inquiries.validInquiryData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.CREATED);
      expect(res.body.data).to.have.property('id');
      expect(res.body.message).to.equal(
        `Inquiry ${message.ADDED_SUCCESSFULLY}`
      );
      createdInquiryId = res.body.data.id;
    });
  });

  describe('List of Inquiry', async () => {
    it('should return list of inquiries', async () => {
      const res = await supertest(app)
        .post(inquiryRoutes.listOfInquiry)
        .send(inquiries.pagination)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.OK);
      expect(res.body.data.listOfInquiry).to.have.lengthOf(1);
    });
  });

  describe('Update inquiry', async () => {
    it('should return 404 error if inquiry not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await supertest(app)
        .put(`${inquiryRoutes.updateInquiry.replace(':id', fakeId)}`)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Inquiry ${message.NOT_FOUND}`);
    });

    it('should update the inquiry', async () => {
      const res = await supertest(app)
        .put(`${inquiryRoutes.updateInquiry.replace(':id', createdInquiryId)}`)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.ACCEPTED);
      expect(res.body.message).to.equal(message.RESOLVED_SUCCESSFULLY);
    });

    it('should return 400 error if inquiry is already resolved', async () => {
      const res = await supertest(app)
        .put(`${inquiryRoutes.updateInquiry.replace(':id', createdInquiryId)}`)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(message.ALREADY_RESOLVED);

      await inquiryModel.deleteMany({});
    });
  });
});
