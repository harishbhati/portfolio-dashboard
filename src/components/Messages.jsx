// import { useState } from "react";
import { useEffect} from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllMessageErrors, deletemessage, getAllMessages, resetMessageSlice } from "../store/slices/messageSlice";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Messages = () => {
    const navigateTo = useNavigate();
    const handlereturnToDashboard = () => {
        navigateTo('/');
    }
    const dispatch = useDispatch();
    const { messages, error, message, loading} = useSelector((state) => state.messages);
    // const [messageId, setMessageId] = useState("");

    const handleMessageDelete = (id) => {
        dispatch(deletemessage(id));
    };

     // load on mount
    useEffect(() => {
        dispatch(getAllMessages());
    }, [dispatch]);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearAllMessageErrors());
        }
        if(message){
            toast.success(message);
            dispatch(resetMessageSlice())
        }
    },[dispatch, error, message])
    return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
            <button
                onClick={handlereturnToDashboard}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
                Return to Dashboard
            </button>
        </div>
        <div className="relative overflow-x-auto bg-white shadow-xs rounded-base border border-gray-200">
            <table className="text-sm text-body rounded-base w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-blue-50">
                        <th className="px-6 py-3 font-medium text-left">Sender Name</th>
                        <th className="px-6 py-3 font-medium text-left">Subject</th>
                        <th className="px-6 py-3 font-medium text-left">Message</th>
                        <th className="px-6 py-3 font-medium text-left w-[140px]">Created At</th>
                        <th className="px-6 py-3 font-medium text-left w-[140px]">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {messages && messages.length > 0 ? (
                        messages.map((msg) => (
                            <tr key={msg._id} className="border-b border-gray-200">
                                <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">{msg.senderName}</td>
                                <td className="px-6 py-4">{msg.subject}</td>
                                <td className="px-6 py-4">{msg.message}</td>
                                <td className="px-6 py-4 w-[140px]">{new Date(msg.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 w-[140px]">
                                    {loading ? (
                                        <Loader content={'Deleting...'} />
                                    ):
                                    (
                                    <Button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer" onClick={() => handleMessageDelete(msg._id)}>Delete</Button>
                                    )
                                }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No messages found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Messages;