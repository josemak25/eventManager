import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import Controller from './controller';

const {
  Op
} = Sequelize;

/**
 *
 *
 * @class UserController
 */
class UserController extends Controller {
  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  login(req) {
    // get user details from db
    return this.Model
      .findOne({
        where: {
          [Op.or]: [{
            email: req.body.email
          },
          {
            userName: req.body.userName
          }
          ]
        },
      }).then((response) => {
        if (!response) {
          return UserController.errorResponse('Account does not exist! Visit /api/v1/users/signup and register.', 404);
        }
        // check if password is correct
        const isCorrectPassword = bcrypt.compareSync(req.body.password, response.passwordHash);

        if (isCorrectPassword) {
          return UserController.sendResponseWIthToken(response);
        }
        return UserController.errorResponse('Incorrect password', 406);
      }).catch(error => UserController.errorResponse(error.message));
  }

  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  signUp(req) {
    // check if email is available
    return this.Model.findOne({
      where: {
        [Op.or]: [{
          email: req.body.email
        },
        {
          userName: req.body.userName
        }
        ]
      },
    }).then((response) => {
      if (response) {
        const duplicate = response.userName === req.body.userName ? 'userName' : 'email';
        return UserController.errorResponse(`${duplicate} has been used`, 406);
      }
      // create hash of password
      const salt = bcrypt.genSaltSync(10);
      req.body.passwordHash = bcrypt.hashSync(req.body.password, salt);
      // remove plaintext password from record to write to db
      delete req.body.password;
      // create user in db
      return this.Model.create(req.body).then(data =>
        // send response with token to client
        UserController.sendResponseWIthToken(data, 'Signup Successful'))
        .catch(error => UserController.errorResponse(error.message));
    }).catch(error => UserController.errorResponse(error.message));
  }

  /**
   *
   *
   * @param {Sequelize<Model<Instance>>} data
   * @param {String} extraMessage
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  static sendResponseWIthToken(data, extraMessage) {
    // remove password info
    data.passwordHash = 'censored';

    const message = {};
    message.signUp = extraMessage;
    const payload = {
      isAdmin: data.isAdmin,
      id: data.id,
    };
    const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
      expiresIn: '1h'
    });
    if (token) {
      message.logIn = 'Login Successful';
      return UserController.defaultResponse(
        data, 200, message,
        token
      );
    }
    message.logIn = 'No token found';
    return UserController.errorResponse(message, 406);
  }
}

export default UserController;