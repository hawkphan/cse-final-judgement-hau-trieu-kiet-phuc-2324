import { Toastify } from '.';

type AuthErrorCode =
  | 'UserNotConfirmedException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException'
  | 'CodeMismatchException'
  | 'ExpiredCodeException'
  | 'LimitExceededException'
  | 'InvalidPasswordException'
  | 'InvalidParameterException'
  | 'UsernameExistsException';

export interface AuthError {
  code?: AuthErrorCode;
  name?: string;
  message?: string;
}

export interface ErrorResponse {
  code: number;
  error: string;
  errorId: string;
  message: string;
  path: string;
  stack: any;
  success: boolean;
  timestamp: number;
}

const MESSAGES = {
  invalidEmail: 'Email is invalid',
  forbidden: 'Forbidden resource',
  invalidPhone: 'Phone number is invalid',
  invalidSSN: 'SSN number is invalid format',
  unknown: 'An error has occurred',
  required: 'This field is required.',
  shortRequired: 'Required',
  accountNotExist: 'Username does not exist',
  accountExist: 'An account with this email already exists.',
  userExistError: 'User is already existed.',
  incorrectUsernameClientId: 'Username/client id combination not found.',
  incorrectUsername: 'Incorrect username',
  incorrectAccount: 'Incorrect username or password',
  incorrectCredentials: 'Incorrect login credentials. Please try again.',
  incorrectPassword: 'Incorrect password.', // pragma: allowlist secret
  onlyLetter: 'Only English alphabets are allowed for this field.',
  SSNMessage: 'SSN already exists, please enter again.',
  alphanumeric: 'Alphanumeric characters',
  businessIdLength: '3-25 characters',
  noSpaces: 'No spaces',
  noSpecialCharacters: 'No special characters',
  invalidRoutingNumber: 'Invalid routing number',
  onlyLetterAndNumber: 'Only alphabets or numeric are allowed for this field.',
  invalidInformation: 'The provided information is invalid. Please try again.',
  notTrimmable: 'Space character is not allowed at the beginning and end.',
  pleaseUseEnglishAlphabetForInput: 'Please use English alphabet for input.',
  inValidUsername: 'Please use only letters, numbers (0-9), underscore (_), dot (.), hyphen (-).',
  invalidCode: 'Invalid verification code provided, please try again.',
  awsDisabledMessage: 'User is disabled.',
  disabledMessage: 'The user has been deactivated',
  existEmail: 'An account with this email already existed.',
  matchConfirmPassword: 'This Confirm Password does not match', // pragma: allowlist secret
  emailAddressAlreadyExisted: 'An account with this email already existed.',
  canNotBlank: 'This field cannot be blank.',
  onlyEnglishAlphabets: 'Only allow English Alphabets.',
  maxLength: 'You have reach the max length of [256] characters/numbers',
  englishAlphabetAndSpecialCharacter:
    'Please input English Alphabet (a-z), special characters or number only.',
};

const handler = (error: AuthError | Error | ErrorResponse) => {
  // eslint-disable-next-line no-console
  console.error(error);
  if (error?.message.includes('Attempt limit exceeded, please try after some time.')) {
    return Toastify.error(
      'The code you entered is incorrect more than 5 times. Please try after few minutes or resend email to receive the new code.',
    );
  }
  Toastify.error(error?.message?.toString() || MESSAGES.unknown);
};

const interceptorsErrorHandler = (error: (AuthError | Error) & { code?: string } = {}) => {
  console.error(error);
  const { message, code } = error;
  switch (code) {
    case TYPES.NotAuthorizedException:
    case TYPES.UserNotFoundException:
      if (message === MESSAGES.awsDisabledMessage) {
        return Toastify.error(MESSAGES.disabledMessage);
      }
      return handler(error);
    default:
      return handler(error);
  }
};

export const TYPES = {
  NotAuthorizedException: 'NotAuthorizedException',
  UserNotFoundException: 'UserNotFoundException',
  UserNotConfirmedException: 'UserNotConfirmedException',
  CodeMismatchException: 'CodeMismatchException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
  InvalidPasswordException: 'InvalidPasswordException', // pragma: allowlist secret
  UsernameExistsException: 'UsernameExistsException',
  UserLambdaValidationException: 'UserLambdaValidationException',
  badRequest: 'BAD_REQUEST',
};

export default {
  handler,
  interceptorsErrorHandler,
  MESSAGES,
  TYPES,
};
