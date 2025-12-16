import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllForgotPasswordErrors,
  clearMessage,
  userForgotPassword,
} from "../store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Button } from "flowbite-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotResetPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(userForgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message && !loading) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, isAuthenticated, message]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-secondary-medium">
      <form className="w-full max-w-sm bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-heading mb-8 text-center">
          Forgot Password
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email-alternative"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            required
          />
        </div>
        {loading ? (
          <Loader content={"Sending Email..."} />
        ) : (
          <Button
            type="submit"
            onClick={handleForgotPassword}
            className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Send Email
          </Button>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
