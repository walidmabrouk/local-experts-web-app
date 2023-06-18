const UserModel = require("../models/users.models");
const ValidateRegister = require("../validation/Register");
const ValidateLogin = require("../validation/Login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { VerificationToken } = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("express-async-handler");

const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        //? check if user exist or not
        if (exist) {
          errors.email = "user exist";
          res.status(404).json(errors);
        } else {
          //* Crypt password
          const hash = bcrypt.hashSync(req.body.password, 10); //* hashed password
          req.body.password = hash;
          req.body.role = "USER";
          newUser = await UserModel.create(req.body);

          //* Creating new VerificationToken & save it toDB
          const verifictionToken = new VerificationToken({
            userId: newUser._id, //!
            token: crypto.randomBytes(32).toString("hex"),
          });
          await verifictionToken.save();

          // * Making the link
          const link = `${process.env.CLIENT_DOMAIN}/users/${newUser._id}/verify/${verifictionToken.token}`;

          // * Putting the link into an html template
          const htmlTemplate = `
    <div>
      <p>Click on the link below to verify your email</p>
      <a href="${link}">Verify</a>
    </div>`;

          // Sending email to the user
          await sendEmail(newUser.email, "Verify Your Email", htmlTemplate);

          //? creation in database
          res
            .status(200)
            .json({
              message:
                "we sent to you an email, please verify your email address",
            });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    //? check the validation
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      //? check if the email user has already logged in
      UserModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = "not found user";
          res.status(404).json(errors);
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then(async (isMatch) => {
              if (!isMatch) {
                errors.password = "incorrect password";
                res.status(404).json(errors);
              } else {
    //             if (!user.isAccountVerified) {
    //               let verificationToken = await VerificationToken.findOne({
    //                 userId: user._id,
    //               });

    //               if (!verificationToken) {
    //                 verificationToken = new VerificationToken({
    //                   userId: user._id,
    //                   token: crypto.randomBytes(32).toString("hex"),
    //                 });
    //                 await verificationToken.save();
    //               }

    //               const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    //               const htmlTemplate = `
    // <div>
    //   <p>Click on the link below to verify your email</p>
    //   <a href="${link}">Verify</a>
    // </div>`;

    //               await sendEmail(
    //                 user.email,
    //                 "Verify Your Email",
    //                 htmlTemplate
    //               );

    //               return res.status(400).json({
    //                 message:
    //                   "We sent to you an email, please verify your email address",
    //               });
    //             }

                var token = jwt.sign(
                  {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  },
                  process.env.PRIVATE_KEY,
                  { expiresIn: "1h" }
                );
                res.status(200).json({
                  message: "success",
                  token: "Bearer " + token,
                });
              }
            });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};


/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const verifyUserAccountCtrl = asyncHandler(async (req, res) => {

  const user = await UserModel.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
  }

  user.isAccountVerified = true;
  await user.save();

  await verificationToken.remove();

  res.status(200).json({ message: "Your account verified" });
});






module.exports = {
  Register,
  Login,
  verifyUserAccountCtrl,
};
