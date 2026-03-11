import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { emailPattern, validationMessages } from '../constants/validation';

export type LoginFormState = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  email?: string;
  password?: string;
  global?: string;
};

export const useLoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginFormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof LoginFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined, global: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: LoginFormErrors = {};

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = validationMessages.email.invalid;
    }
    if (!form.password) {
      nextErrors.password = validationMessages.password.required;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return false;
    }
    try {
      setSubmitting(true);
      await login(form.email, form.password);
      return true;
    } catch (error) {
      let message: string = validationMessages.auth.generic;
      if (error instanceof Error) {
        if (error.message === 'INCORRECT_PASSWORD') {
          message = validationMessages.password.incorrect;
        } else if (error.message === 'USER_NOT_FOUND') {
          message = validationMessages.auth.userNotFound;
        }
      }
      setErrors(prev => ({ ...prev, global: message }));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
};
