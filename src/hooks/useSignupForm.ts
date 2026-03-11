import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  emailPattern,
  validationMessages,
  validationRules,
} from '../constants/validation';

export type SignupFormState = {
  name: string;
  email: string;
  password: string;
};

export type SignupFormErrors = {
  name?: string;
  email?: string;
  password?: string;
  global?: string;
};

export const useSignupForm = () => {
  const { signup } = useAuth();
  const [form, setForm] = useState<SignupFormState>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof SignupFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined, global: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: SignupFormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = validationMessages.name.required;
    }
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = validationMessages.email.invalid;
    }
    if (!form.password) {
      nextErrors.password = validationMessages.password.required;
    } else if (form.password.length < validationRules.password.minLength) {
      nextErrors.password = validationMessages.password.tooShort;
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
      await signup(form.name, form.email, form.password);
      return true;
    } catch (error) {
      const message =
        error instanceof Error && error.message === 'EMAIL_ALREADY_IN_USE'
          ? validationMessages.auth.emailInUse
          : validationMessages.auth.generic;
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
