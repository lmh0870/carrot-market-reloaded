export interface CreateAccountFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormState {
  message: string | null;
  error: string | null;
}
