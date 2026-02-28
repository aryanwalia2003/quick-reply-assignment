import { useMutation } from '@tanstack/react-query';
import { registerUserApi } from '../infrastructure/registerUserApi.request';

interface RegisterCredentials {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: RegisterCredentials) => registerUserApi(email, password),
  });
};
