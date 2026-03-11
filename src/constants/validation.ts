export const validationRules = {
  password: {
    minLength: 6,
  },
} as const;

export const validationMessages = {
  email: {
    invalid: 'Please enter a valid email address.',
  },
  password: {
    required: 'Password is required.',
    tooShort: `Password must be at least ${validationRules.password.minLength} characters.`,
    incorrect: 'Password is incorrect.',
  },
  name: {
    required: 'Name is required.',
  },
  auth: {
    emailInUse: 'An account with this email already exists.',
    generic: 'Something went wrong. Please try again.',
    userNotFound: 'Incorrect email or user with this email does not exist.',
  },
} as const;

export const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
