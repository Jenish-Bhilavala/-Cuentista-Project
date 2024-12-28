const chai = require('chai');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const adminModel = require('../../models/adminModel');
const { StatusCodes } = require('http-status-codes');
const app = require('../../../server');
const expect = chai.expect;

const {
  validAdminLoginData,
  invalidAdminLoginData,
  dummyAdminLoginData,
  missingEmailData,
  missingPasswordData,
  invalidEmailData,
  invalidPasswordData,
  wrongEmail,
  missingNewPassword,
  wrongEmailChangePW,
  wrongConfirmPW,
  ValidChangePasswordData,
  newPasswordMissingForgotData,
  EmailNotFoundForgotData,
  OTPNotFoundForgotData,
} = require('../data/adminData');
const { response } = require('../../utils/enum');
const message = require('../../utils/message');

let admin;
let otp;
const password = 'Admin@1234';
const hashedPassword = bcrypt.hashSync(password, 10);

before(async () => {
  admin = new adminModel({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: hashedPassword,
  });
  await admin.save();
});

after(async () => {
  await adminModel.deleteOne({ email: 'admin@gmail.com' });
});

describe('Admin controller', function () {
  this.timeout(10000);
  describe('admin login', () => {
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

    it('should return error if Admin is not found', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(dummyAdminLoginData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return validation error if password is invalid', async () => {
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

    it('should return error if credential(pw) not match ', async () => {
      const isPasswordValid = await bcrypt.compare(
        validAdminLoginData.password,
        admin.password
      );

      expect(isPasswordValid).to.be.true;
    });

    it('should return database error for invalid password', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(invalidAdminLoginData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(message.INVALID_PASSWORD);
    });

    it('should successfully login with valid email and password', async () => {
      const res = await supertest(app)
        .post('/api/admin/login')
        .send(validAdminLoginData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.OK);
      expect(res.body.message).to.equal(message.LOGIN_SUCCESSFULLY);
      expect(res.body.data).to.have.property('token');
    });
  });

  describe('Verify Email', () => {
    it('should return validation error if email is invalid', async () => {
      const res = await supertest(app)
        .post('/api/admin/verify-email')
        .send(invalidEmailData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a valid email address.');
    });

    it('should return error if email is missing in db', async () => {
      const res = await supertest(app)
        .post('/api/admin/verify-email')
        .send(wrongEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should send OTP successfully', async () => {
      const res = await supertest(app)
        .post('/api/admin/verify-email')
        .send(missingPasswordData)
        .expect(StatusCodes.OK);

      otp = res.body.data.otp;

      expect(res.body.message).to.equal(message.OTP_SENT_SUCCESSFULLY);
      expect(res.body.data).to.have.property('otp');
      expect(res.body.data.otp).to.have.lengthOf(6);
    });
  });

  describe('change password', () => {
    it('should return validation error for current password is not given', async () => {
      const res = await supertest(app)
        .put('/api/admin/change-password')
        .send(wrongEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Current password must be required.');
    });

    it('should return validation error for new password is not given', async () => {
      const res = await supertest(app)
        .put('/api/admin/change-password')
        .send(missingNewPassword)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('New password must be required.');
    });

    it('should return error if email is missing in db', async () => {
      const res = await supertest(app)
        .put('/api/admin/change-password')
        .send(wrongEmailChangePW)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return error if new and confirm pw does not match', async () => {
      const res = await supertest(app)
        .put('/api/admin/change-password')
        .send(wrongConfirmPW)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.message).to.equal(
        'New password and confirm password must be same.'
      );
    });

    it('should return error if new password and db password not match', async () => {
      const isPasswordValid = await bcrypt.compare(
        wrongConfirmPW.confirm_password,
        admin.password
      );

      expect(isPasswordValid).to.be.false;
    });

    it('should change password if all are ok', async () => {
      const res = await supertest(app)
        .put('/api/admin/change-password')
        .send(ValidChangePasswordData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.message).to.equal(
        `Password ${message.UPDATED_SUCCESSFULLY}`
      );
    });
  });

  describe('forgot password', () => {
    it('should return validation error for new password field', async () => {
      const res = await supertest(app)
        .put('/api/admin/forgot-password')
        .send(newPasswordMissingForgotData)
        .expect(StatusCodes.OK);

      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('New password must be required.');
    });

    it('should return error if admin not found', async () => {
      const res = await supertest(app)
        .put('/api/admin/forgot-password')
        .send(EmailNotFoundForgotData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return error if otp not found', async () => {
      const res = await supertest(app)
        .put('/api/admin/forgot-password')
        .send(OTPNotFoundForgotData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`OTP ${message.NOT_FOUND}`);
    });

    it('should update password', async () => {
      const res = await supertest(app)
        .put('/api/admin/forgot-password')
        .send({
          email: 'admin@gmail.com',
          otp,
          new_password: 'Admin@1234',
          confirm_password: 'Admin@1234',
        })
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.message).to.equal(
        `Password ${message.UPDATED_SUCCESSFULLY}`
      );
    });
  });
});
