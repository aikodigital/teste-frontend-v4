export const validateCredentials = (
  email: string,
  password: string
): boolean => {
  const validEmail = "teste@email.com";
  const validPassword = "teste123";
  return email === validEmail && password === validPassword;
};
