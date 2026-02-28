import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUserApi } from '../infrastructure/logoutUserApi.request';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.clear(); // Wipe all cached data on logout
    },
  });
};
