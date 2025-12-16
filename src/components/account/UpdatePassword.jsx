import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../../store/slices/userSlice";
import { Button } from "flowbite-react";
import Loader from "../Loader";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const {loading, error, message} = useSelector((state) => state.user);
    // NEW FLAG
    const [submitted, setSubmitted] = useState(false);

    // Show toast notifications for success/error
    useEffect(() => {
        if (!submitted)  return;
        if (error) {
            toast.error(error);
        }
        if (message) {
            toast.success(message);
        }
        // Clear submitted after effect finishes
        // But do this in next render cycle
        setTimeout(() => setSubmitted(false), 0);
    }, [error, message]);

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmNewPassword) {
            toast.error("New password and confirm password do not match!");
            return;
        }

        // Dispatch Redux action with correct arguments
         setSubmitted(true);
        dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
    };
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Password</h2>

            <form className="w-full">
                <div className="mb-5">
                    <label
                        htmlFor="currentPassword"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="currentPassword"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="currentPassword"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
                        required
                    />
                </div>
                {loading ? (
                <Loader content={"Updating Password..."} />
                ) : (
                <Button
                    type="submit"
                    onClick={handleUpdatePassword}
                    className="w-full text-sm font-medium rounded-base py-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                    Update Password
                </Button>
                )}
            </form>
        </div>
    )
}

export default UpdatePassword;