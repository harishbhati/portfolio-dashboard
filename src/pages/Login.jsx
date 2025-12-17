import { Button } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, loginUser } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginAttempted, setLoginAttempted] = useState(false);
    const { isAuthenticated, error, message } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        // Dispatch login action here
        setLoginAttempted(true);
        dispatch(loginUser(email, password));
    }

    useEffect(() => {
      if (!loginAttempted) return; // prevents toast on first load

      if(error){
        toast.error(error);
        dispatch(clearAllUserErrors())
      }
      if (message) {
        toast.success(message);   // success toast is now shown correctly
      }

      if (isAuthenticated) {
          navigateTo('/');
      }
    }, [error, isAuthenticated, loginAttempted, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-secondary-medium">
      <form className="w-full max-w-sm bg-white shadow-xl rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-heading mb-8 text-center">
        Login
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
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password-alternative"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            required
          />
        </div>
        <Link to="/password/forgot" className="text-sm text-brand hover:underline mb-5 inline-block">
          Forgot Password?
        </Link>
        <Button
          type="submit"
          color="blue"
          onClick={handleLogin}
          className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
