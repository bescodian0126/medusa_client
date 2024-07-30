import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import backend_http from "@framework/utils/backend_http";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export interface SignUpInputType {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
async function signUp(input: SignUpInputType) {
  const data = await backend_http.post(API_ENDPOINTS.REGISTER, input);
  return {
    token: `${data.data.email}`.split("").reverse().join(""),
  };
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: SignUpInputType) => signUp(input),
    onSuccess: (data) => {
      Cookies.set("auth_token", data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
