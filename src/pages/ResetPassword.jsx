import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearAllErrors, userResetPassword } from "../store/slices/forgotResetPasswordSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import Loader from "../components/Loader";
import { getUser } from "../store/slices/userSlice";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {loading, error, message} = useSelector((state) => state.forgotResetPassword);
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { token } = useParams();
    const handleResetPassword = (e) => {
        e.preventDefault();
        // Dispatch reset password action here
        dispatch(userResetPassword(token, password, confirmPassword));
    };

    useEffect(() => {
       if(error){
        toast.error(error);
        dispatch(clearAllErrors())
       }
       if(isAuthenticated){
        navigateTo('/');
       }
       if(message){
        toast.success(message);
        dispatch(getUser())
       }
    }, [error, message, navigateTo, dispatch]);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-secondary-medium">
      <form className="w-full max-w-sm bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-heading mb-8 text-center">
          Reset Password
        </h1>
        <div className="mb-5">
          <label
            htmlFor="email-alternative"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email-alternative"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            required
          />
        </div>
        {loading ? (
          <Loader content={"Resetting Password..."} />
        ) : (
          <Button
            type="submit"
            disabled={!password || !confirmPassword || loading}
            onClick={handleResetPassword}
            className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Reset Password
          </Button>
        )}
      </form>
    </div>
    )
}

export default ResetPassword;