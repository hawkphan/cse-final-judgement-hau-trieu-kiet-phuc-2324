export enum SignUpFormKey {
  EMAIL = "email",
  PASSWORD = "password",
  LAST_NAME = "lastName",
  FIRST_NAME = "firstName",
  USER_NAME = "username",
}

export const SignUpLabel = {
  [SignUpFormKey.EMAIL]: "Email Address",
  [SignUpFormKey.PASSWORD]: "Password",
  [SignUpFormKey.LAST_NAME]: "Last Name",
  [SignUpFormKey.FIRST_NAME]: "First Name",
  [SignUpFormKey.USER_NAME]: "Username",
};
