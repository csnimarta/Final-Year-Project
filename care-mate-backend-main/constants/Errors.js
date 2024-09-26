const ERROR_MESSAGES = {
  UNIQUE_EMAIL: "Email address should be unique",
  INVALID_PASSWORD:
    "Password must contain at least 8 characters, including uppercase and lowercase letters",
  EMAIL_REQUIRED: "Email address is required",
  FIRST_NAME_REQUIRED: "First name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  PASSWORD_REQUIRED: "Password is required",
  ROLE_REQUIRED: "Role is required",
  USERNAME_REQUIRED: "Username is required",
  PHONE_NO_REQUIRED: "Phone no is required",
  PRODUCT_TYPE_REQUIRED: "Product type is required",

  PASSWORD_REQUIRED: "Password is required",
  INVALID_JWT: `Invalid token! Please Login Again`,
  EXPIRED_JWT: `Your token has expired! please login again`,
  UNAUTHORIZE: "You are not authorize to perform this action",
  IMAGE_REQUIRED: `Image is required`,
  INVALID_LOGIN_CREDENTIALS: "Email or Password is Incorrect",
  INVALID_EMAIL: `Please Enter Valid Email`,
  NOT_FOUND: "Not Found",
  EMPTY_REQUIRED_FIELDS: "Required fields are empty.",
  INVALID_DATA: "Invalid data received.",
  USER_ALREADY_EXISTS: (userType) => {
    return `${userType} already exists with the provided email address`;
  },
  INVALID_OTP: "Invalid OTP Received!",
  USER_CREDENTIALS_NOT_FOUND: "User not found with provided credentials",
  USER_NOT_FOUND_WITH_EMAIL: "User not found with provided email address",
  USER_NOT_FOUND_WITH_ID: "User not found with provided identification number",

  LANGUAGES_NOT_FOUND: "Languages not found",
  LANGUAGE_NOT_FOUND: "Language not found",
  LANGUAGE_ALREADY_EXISTS: "Language already exists with the provided title",

  PRODUCTS_NOT_FOUND: "Products not found",
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_ALREADY_EXISTS:
    "Product already exists with the provided title and type",

  ENDPOINT_ACCESS_DENIED: (userType) => {
    return `Forbidden! only ${userType}s are allowed.`;
  },
  SELLER_NOT_FOUND: "Seller not found",

  UNAUTHORIZED_UPDATE_PRODUCT:
    "You're not a authorize seller to update this product",
  UNAUTHORIZED_DELETE_PRODUCT:
    "You're not a authorize seller to delete this product",
  INCORRECT_CURRENT_PASSWORD: "Incorrect current password!",
  PRODUCT_TYPES_NOT_FOUND: "Product types not found",
};

const UNAUTHORIZE_MESSAGES = {
  NOT_LOGGED_IN: `You are not logged in please login to get Access`,
  OTP_EXPIRED: "OTP Is Expired.",
  INVALID_JWT: `Invalid token! Please Login Again`,
  EXPIRED_JWT: `Your token has expired! please login again`,
  INVALID_EXPIRED: `Token is invalid or has been Expired`,
  INACTIVE_ACCOUNT:
    "Your account is deactivated, please contact your department admin.",
};

module.exports = {
  ERROR_MESSAGES,
  UNAUTHORIZE_MESSAGES,
};
