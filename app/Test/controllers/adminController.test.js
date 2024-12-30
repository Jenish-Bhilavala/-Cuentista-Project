const chai = require('chai');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const adminModel = require('../../models/adminModel');
const { StatusCodes } = require('http-status-codes');
const app = require('../../../server');
const expect = chai.expect;
const adminData = require('../data/adminData');
const { response } = require('../../utils/enum');
const message = require('../../utils/message');
const { adminRoutes } = require('../data/routesData');

let admin;
let otp;
const password = adminData.adminLoin.password;
const hashedPassword = bcrypt.hashSync(password, 10);

before(async () => {
  admin = new adminModel({
    name: adminData.adminLoin.name,
    email: adminData.adminLoin.email,
    password: hashedPassword,
  });
  await admin.save();
});

after(async () => {
  await adminModel.deleteOne({ email: adminData.adminLoin.email });
});

describe('Admin controller', function () {
  this.timeout(20000);
  describe('admin login', () => {
    it('should return validation error if email is not a string', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginEmailTypeCheck)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a string.');
    });

    it('should return validation error if payload is empty', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.emptyPayload)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email is a required field.');
    });

    it('should return validation error if password is missing', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginMissingPassword)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Password is a required field.');
    });

    it('should return validation error if email is invalid', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginInvalidEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a valid email address.');
    });

    it('should return validation error if password is invalid', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginInvalidPassword)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(
        'Password must start with capital latter and must be at least 8 character long.'
      );
    });

    it('should return error for email if it is empty string', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginEmptyEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email cannot be empty.');
    });

    it('should return error if Admin is not found', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginNotFound)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return error if credential(pw) not match ', async () => {
      const isPasswordValid = await bcrypt.compare(
        adminData.loginCredentialNotMatch.password,
        admin.password
      );

      expect(isPasswordValid).to.be.false;
    });

    it('should return database error for invalid password', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.loginCredentialNotMatch)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(message.INVALID_PASSWORD);
    });

    it('should successfully login with valid email and password', async () => {
      const res = await supertest(app)
        .post(adminRoutes.adminLogin)
        .send(adminData.validAdminLoginData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.statusCode).to.equal(StatusCodes.OK);
      expect(res.body.message).to.equal(message.LOGIN_SUCCESSFULLY);
      expect(res.body.data).to.have.property('token');
    });
  });

  describe('Verify Email', () => {
    it('should return validation error if email is not a string', async () => {
      const res = await supertest(app)
        .post(adminRoutes.verifyEmail)
        .send(adminData.verifyEmailTypeCheck)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a string.');
    });

    it('should return validation error if empty payload pass', async () => {
      const res = await supertest(app)
        .post(adminRoutes.verifyEmail)
        .send(adminData.emptyPayload)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email is a required field.');
    });

    it('should return validation error if email is invalid', async () => {
      const res = await supertest(app)
        .post(adminRoutes.verifyEmail)
        .send(adminData.verifyInvalidEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a valid email address.');
    });

    it('should return error if email is missing in db', async () => {
      const res = await supertest(app)
        .post(adminRoutes.verifyEmail)
        .send(adminData.verifyWrongEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should send OTP successfully', async () => {
      const res = await supertest(app)
        .post(adminRoutes.verifyEmail)
        .send(adminData.verifyValidEmail)
        .expect(StatusCodes.OK);

      otp = res.body.data.otp;

      expect(res.body.message).to.equal(message.OTP_SENT_SUCCESSFULLY);
      expect(res.body.data).to.have.property('otp');
      expect(res.body.data.otp).to.have.lengthOf(6);
    });
  });

  describe('change password', () => {
    it('should return validation error for current password is not string', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.changePasswordTypeCheck)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(
        `\"current_password\" must be a string`
      );
    });

    it('should return validation error for empty payload', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.emptyPayload)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email is a required field.');
    });

    it('should return validation error for current password is not given', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.changeFieldRequired)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Current password must be required.');
    });

    it('should return validation error for new password formate is invalid', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.changePasswordFormate)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal(
        'New password must start with a capital latter and must be at least 8 characters long.'
      );
    });

    it('should return validation error if new password is an empty string', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.changeEmptyField)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('New password cannot be empty.');
    });

    it('should return error if email is not found in db', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.changeFakeData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return error if new and confirm pw does not match', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.changeDifferentPassword)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.message).to.equal(
        'New password and confirm password must be same.'
      );
    });

    it('should return error if current password and db password not match', async () => {
      const isPasswordValid = await bcrypt.compare(
        adminData.changIsPasswordMatch.current_password,
        admin.password
      );

      expect(isPasswordValid).to.be.false;
    });

    it('should change password', async () => {
      const res = await supertest(app)
        .put(adminRoutes.changePassword)
        .send(adminData.ValidChangePasswordData)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.message).to.equal(
        `Password ${message.UPDATED_SUCCESSFULLY}`
      );
    });
  });

  describe('forgot password', () => {
    it('should return validation error if email is not a string', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.forgotEmailTypeCheck)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a string.');
    });

    it('should return validation error for empty payload', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.emptyPayload)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email is a required field.');
    });

    it('should return validation error for new password field', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.forgotRequiredField)
        .expect(StatusCodes.OK);

      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('New password must be required.');
    });

    it('should return validation error if email is invalid', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.forgotInvalidEmail)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email must be a valid email address.');
    });

    it('should return validation error if email is empty string', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.forgotEmptyString)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.BAD_REQUEST);
      expect(res.body.message).to.equal('Email cannot be empty.');
    });

    it('should return error if admin not found', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.forgotEmailNotFound)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`Admin profile ${message.NOT_FOUND}`);
    });

    it('should return error if otp not found', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send(adminData.forgotOTPNotFound)
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.ERROR);
      expect(res.body.statusCode).to.equal(StatusCodes.NOT_FOUND);
      expect(res.body.message).to.equal(`OTP ${message.NOT_FOUND}`);
    });

    it('should update password', async () => {
      const res = await supertest(app)
        .put(adminRoutes.forgotPassword)
        .send({
          email: adminData.adminLoin.email,
          otp,
          new_password: adminData.adminLoin.password,
          confirm_password: adminData.adminLoin.password,
        })
        .expect(StatusCodes.OK);

      expect(res.body.status).to.equal(response.SUCCESS);
      expect(res.body.message).to.equal(
        `Password ${message.UPDATED_SUCCESSFULLY}`
      );
    });
  });
});
