export type UserSummary = {
  userId: string;
  username: string;
};

export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type RegisterUserResponse = UserSummary;

export type UnregisterUserRequest = {
  passwordConfirmation: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type LoginUserResponse = UserSummary & {
  sessionId: string;
  expiresAt: string;
};

// Sign out (logout_user) has no request or response body.
// The session is identified by the Authorization header.

export type ErrorResponse = {
  error: string;
  field?: string;
};
