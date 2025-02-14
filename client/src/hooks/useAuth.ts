import { loginUser, registerUser } from "@/services/api/users";
import { resetAuthState, setInput, setLoading, setLogin } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserAndToken } from "@/store/user";
import { IAxiosErrorResponseData } from "@/types/api";
import axios from "axios";
import { toast } from "sonner";

export default function useAuth() {
  const { email, password, name, isLogin, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const switchLogin = () => dispatch(setLogin(!isLogin));

  const handleUpdate = (field: "email" | "password" | "name", value: string) => {
    dispatch(
      setInput({
        field,
        value,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      if (isLogin) {
        const {
          data: { data },
        } = await loginUser({
          email,
          password,
        });

        dispatch(setUserAndToken(data));
        dispatch(resetAuthState());
        toast.success("Successfully logged in!", {
          description: "Welcome back to your account.",
        });
        return;
      }
      const {
        data: { data },
      } = await registerUser({
        email,
        password,
        name,
      });

      dispatch(setUserAndToken(data));
      dispatch(resetAuthState());
      toast.success("Account created successfully!", {
        description: "Welcome to our platform.",
      });
    } catch (error: unknown) {
      console.error(error);
      let errMessage = "Invalid credentials";
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as IAxiosErrorResponseData;
        errMessage = errorData.detail;
      }

      toast.error("Oops", {
        description: errMessage,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    loading,
    isLogin,
    email,
    password,
    name,
    handleSubmit,
    handleUpdate,
    switchLogin,
  };
}
