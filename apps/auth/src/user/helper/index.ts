export const sendTokenAndData = (user: any) => {
  const data = {
    ...user,
    password: undefined,
    passwordChangedAt: undefined,
    passwordResetToken: undefined,
    passwordResetExpires: undefined,
  };

  return { status: 'success', token: 'token', data };
};
