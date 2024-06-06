const { body, validationResult, oneOf, param } = require("express-validator");

exports.user_validator = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("first_name is required")
    .isString()
    .withMessage("first_name must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("first_name size must be between 2 and 30 characters")
    .trim(),

  body("last_name")
    .not()
    .isEmpty()
    .withMessage("last_name is required")
    .isString()
    .withMessage("last_name must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("last_name size must be between 2 and 30 characters")
    .trim(),

  body("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email mus be a string")
    .isEmail()
    .withMessage("please enter a valid email")
    .trim(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password mus be a string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters ")
    .trim(),

  body("confirm_password")
    .not()
    .isEmpty()
    .withMessage("confirm_password is required")
    .isString()
    .withMessage("confirm_password mus be a string")
    .isLength({ min: 8 })
    .withMessage("confirm_password must be at least 8 characters ")
    .trim(),

  body("joining_date")
    .not()
    .isEmpty()
    .withMessage("joining_date is required")
    .isString()
    .withMessage("joining_date must be a string")
    .trim(),

  body("phone")
    .not()
    .isEmpty()
    .withMessage("phone is required")
    .isString()
    .withMessage("phone must be a string")
    .isMobilePhone()
    .withMessage("please enter a valid phone number")
    .isLength({ max: 10 })
    .withMessage("phone must be at least 10 characters")
    .trim(),

  body("company")
    .not()
    .isEmpty()
    .withMessage("company is required")
    .isString()
    .withMessage("company must be a string")
    .trim(),

  body("department")
    .not()
    .isEmpty()
    .withMessage("department is required")
    .isString()
    .withMessage("department must be a string")
    .trim(),

  body("designation")
    .not()
    .isEmpty()
    .withMessage("designation is required")
    .isString()
    .withMessage("designation must be a string")
    .trim(),

  body("employee_id")
    .not()
    .isEmpty()
    .withMessage("employee_id is required")
    .isString()
    .withMessage("employee_id must be a string")
    .trim(),
];

const validUserType = [1];
exports.signUp_validator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email mus be a string")
    .isEmail()
    .withMessage("please enter a valid email")
    .trim(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password mus be a string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters ")
    .trim(),

  body("confirm_password")
    .not()
    .isEmpty()
    .withMessage("confirm_password is required")
    .isString()
    .withMessage("confirm_password mus be a string")
    .isLength({ min: 8 })
    .withMessage("confirm_password must be at least 8 characters ")
    .trim(),

  body("user_type")
    .not()
    .isEmpty()
    .withMessage("user_type is required")
    .isNumeric()
    .withMessage("user_type mus be a number")
    .isIn(validUserType)
    .withMessage("please enter a user_type 1 its fixed")
    .trim(),
];

exports.login_validator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email mus be a string")
    .isEmail()
    .withMessage("please enter a valid email")
    .trim(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password mus be a string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters ")
    .trim(),
];

exports.generate_new_auth_token_validator = [
  body("refresh_token")
    .not()
    .isEmpty()
    .withMessage("refresh_token is required")
    .isString()
    .withMessage("refresh_token mus be a string")
    .trim(),
];

exports.update_user_profile_validator = [
  oneOf(
    [
      body("first_name")
        .not()
        .isEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string")
        .isLength({ min: 2, max: 20 })
        .withMessage("First name length must be between 2 and 20 characters")
        .trim(),

      body("last_name")
        .not()
        .isEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string")
        .isLength({ min: 2, max: 20 })
        .withMessage("Last name length must be between 2 and 20 characters")
        .trim(),

      body("date_of_birth")
        .not()
        .isEmpty()
        .withMessage("Date of birth is required")
        .isString()
        .withMessage("Date of birth must be a string")
        .trim(),

      body("gender")
        .not()
        .isEmpty()
        .withMessage("Gender is required")
        .isString()
        .withMessage("Gender must be a string")
        .trim(),

      body("address")
        .not()
        .isEmpty()
        .withMessage("Address is required")
        .isString()
        .withMessage("Address must be a string")
        .trim(),

      body("state")
        .not()
        .isEmpty()
        .withMessage("State is required")
        .isString()
        .withMessage("State must be a string")
        .trim(),

      body("country")
        .not()
        .isEmpty()
        .withMessage("Country is required")
        .isString()
        .withMessage("Country must be a string")
        .trim(),

      body("pincode")
        .not()
        .isEmpty()
        .withMessage("Pincode is required")
        .isNumeric()
        .withMessage("Pincode must be a number")
        .isLength({ min: 6, max: 6 })
        .withMessage("Pincode must be exactly 6 digits")
        .trim(),

      body("phone_number")
        .not()
        .isEmpty()
        .withMessage("Phone number is required")
        .isString()
        .withMessage("Phone number must be a string")
        .isLength({ min: 10, max: 12 })
        .withMessage("Phone number length must be between 10 and 12 characters")
        .trim(),

      body("department")
        .not()
        .isEmpty()
        .withMessage("Department is required")
        .isString()
        .withMessage("Department must be a string")
        .trim(),

      body("designation")
        .not()
        .isEmpty()
        .withMessage("Designation is required")
        .isString()
        .withMessage("Designation must be a string")
        .trim(),

      body("reports_to")
        .not()
        .isEmpty()
        .withMessage("Reports to is required")
        .isString()
        .withMessage("Reports to must be a string")
        .trim(),
    ],
    {
      message: "Please provide a valid key",
    }
  ),
];

exports.delete_user_validator = [
  param("userId")
    .not()
    .isEmpty()
    .withMessage("userId is required")
    .isString()
    .withMessage("userId must be a string")
    .isMongoId()
    .withMessage("please enter a valid user id"),
];

exports.ValidatorResult = (req, res, next) => {
  try {
    const result = validationResult(req);
    const haserror = !result.isEmpty();

    if (haserror) {
      const err = result.array()[0].msg;
      return res.status(400).send({ sucess: false, message: err });
    }
    next();
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
  }
};
