export enum SignUpFormKey {
  EMAIL = "email",
  PASSWORD = "password",
  LAST_NAME = "lastName",
  FIRST_NAME = "firstName",
  USER_NAME = "username",
  DISPLAY_NAME = "displayName",
}

export const SignUpLabel = {
  [SignUpFormKey.EMAIL]: "Email Address",
  [SignUpFormKey.PASSWORD]: "Password",
  [SignUpFormKey.LAST_NAME]: "Last Name",
  [SignUpFormKey.FIRST_NAME]: "First Name",
  [SignUpFormKey.USER_NAME]: "Username",
  [SignUpFormKey.DISPLAY_NAME]: "Display Name",
};
