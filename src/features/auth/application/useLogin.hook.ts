import { useMutation } from '@tanstack/react-query';
import { loginUserApi } from '../infrastructure/loginUserApi.request';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => loginUserApi(email, password),
  });
};
