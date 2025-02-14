import { loginUser, registerUser } from "@/services/api/users";
import { useAppDispatch } from "@/store/hooks";
import { setUserAndToken } from "@/store/user";
import { IAxiosErrorResponseData } from "@/types/api";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const {
          data: { data },
        } = await loginUser({
          email,
          password,
        });

        dispatch(setUserAndToken(data));
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
    }
  };

  return {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleSubmit,
  };
}
