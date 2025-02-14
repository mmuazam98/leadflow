import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUserAndToken } from "@/store/user";
import { toast } from "sonner";

export default function useUser() {
  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuthenticated = () => !!user;

  const logoutHandler = () => {
    dispatch(clearUserAndToken());
    toast.success("Logged out successfully!", {
      description: "You have been logged out of your account.",
    });
  };

  return {
    user,
    token,
    isAuthenticated,
    logoutHandler,
  };
}
