const chai = require('chai');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const adminModel = require('../../models/adminModel');
const { StatusCodes } = require('http-status-codes');
const app = require('../../../server');
const expect = chai.expect;

const {
  validAdminLoginData,
  dummyAdminLoginData,
  missingEmailData,
  missingPasswordData,
  invalidEmailData,
  invalidPasswordData,
} = require('../data/adminData');
const { response } = require('../../utils/enum');
const message = require('../../utils/message');

beforeEach(async () => {
  console.log('===>>');

  const hashedPassword = await bcrypt.hash('Admin@1234', 10);
  console.log('hashedPassword', hashedPassword);

  const admin = new adminModel({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: hashedPassword,
  });
  console.log(admin, 'kkkkkkkkkkkkkkk');

  await admin.save();
});

describe('Admin controller', function () {
  describe('admin login', async () => {
    it('should return validation error if email is missing', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(missingEmailData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email is a required field.');
    });

    it('should return validation error if password is missing', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(missingPasswordData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Password is a required field.');
    });

    it('should return validation error if email is invalid', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(invalidEmailData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a valid email address.');
    });

    it('should return error if email is not found', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(dummyAdminLoginData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return error if password is invalid', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(invalidPasswordData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(
        'Password must start with capital latter and must be at least 8 character long.'
      );
    });

    it('should successfully login with valid email and password', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(validAdminLoginData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`You ${message.LOGIN_SUCCESSFULLY}`);
      expect(res.body.data).to.have.property('token');
    });
  });
});
