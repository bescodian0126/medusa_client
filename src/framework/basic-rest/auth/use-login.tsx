import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import backend_http from "@framework/utils/backend_http";
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export interface LoginInputType {
  email: string;
  password: string;
}
async function login(input: LoginInputType) {
  const data = await backend_http.post(API_ENDPOINTS.LOGIN, input);
  // console.log(data);
  const token = data.data.token;
  return {
    token: token
  };
}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
